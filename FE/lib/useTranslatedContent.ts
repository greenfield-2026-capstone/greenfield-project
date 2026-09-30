"use client";
import { useEffect, useState } from "react";
import { normalizeLocale } from "./locale";
const cache = new Map<string, unknown>();
const pending = new Map<string, Promise<unknown>>();
let running = 0;
const queue: (()=>void)[] = [];
async function request(kind:string,id:string,lang:string) {
  if(running >= 2) await new Promise<void>(resolve=>queue.push(resolve));
  running++;
  try {
    const response = await fetch('/api/translate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,id,lang}),signal:AbortSignal.timeout(55000)});
    if (!response.ok) throw new Error('Translation unavailable');
    const data = await response.json();
    return data.content;
  } finally {running--;queue.shift()?.();}
}
export function useTranslatedContent<T>(kind:"place"|"story"|"ui",id:string,source:T,requested:string) {
  const lang=normalizeLocale(requested), key=`${kind}:${id}:${lang}`;
  const [state,setState]=useState<{key:string;content?:T;failed:boolean}>({key,failed:false});
  useEffect(()=>{
    let active=true;
    if(lang==='ko') return;
    if(cache.has(key)) {setState({key,content:cache.get(key) as T,failed:false});return;}
    let promise=pending.get(key);
    if(!promise) {promise=request(kind,id,lang).then(content=>{cache.set(key,content);return content;}).finally(()=>pending.delete(key));pending.set(key,promise);}
    promise.then(content=>{if(active)setState({key,content:content as T,failed:false});}).catch(()=>{if(active)setState({key,failed:true});});
    return ()=>{active=false;};
  },[key,kind,id,lang]);
  const content=state.key===key ? state.content : undefined;
  return {content:lang==='ko' ? source : content ?? source, translated:lang==='ko'||!!content, failed:state.key===key&&state.failed};
}
