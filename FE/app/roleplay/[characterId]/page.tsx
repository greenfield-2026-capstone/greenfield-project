"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getCharacterImage, getStoryBackground } from "@/lib/characterImages";
import { stories } from "../../../data/stories";
import { getCopy } from "@/lib/translations";
import { normalizeLocale } from "@/lib/locale";
import styles from "./roleplay.module.css";

type Line={speaker:string;emotion:string|null;text:string;};
type Option={id:number;type:"supportive"|"playful"|"curious"|"challenging";text:string;affinity_score:number;};
type ApiResponse={dialogue?:Line[];options?:Option[];error?:string;};
type TranslatedTurn={title:string;transition?:{title:string;text:string};script:Line[];};

const names={
  ko:{sejong:"세종대왕",young_sejong:"어린 세종",taejong:"태종",kimmun:"신하 김문",jeongjo:"정조",young_jeongjo:"어린 정조",jeongyakyong:"정약용",narration:""},
  en:{sejong:"King Sejong",young_sejong:"Young Sejong",taejong:"King Taejong",kimmun:"Official Kim Mun",jeongjo:"King Jeongjo",young_jeongjo:"Young Jeongjo",jeongyakyong:"Jeong Yak-yong",narration:""},
  ja:{sejong:"世宗大王",young_sejong:"幼い世宗",taejong:"太宗",kimmun:"臣下 金汶",jeongjo:"正祖",young_jeongjo:"幼い正祖",jeongyakyong:"丁若鏞",narration:""},
  "zh-Hans":{sejong:"世宗大王",young_sejong:"少年世宗",taejong:"太宗",kimmun:"臣子金汶",jeongjo:"正祖",young_jeongjo:"少年正祖",jeongyakyong:"丁若镛",narration:""},
  "zh-Hant":{sejong:"世宗大王",young_sejong:"少年世宗",taejong:"太宗",kimmun:"臣子金汶",jeongjo:"正祖",young_jeongjo:"少年正祖",jeongyakyong:"丁若鏞",narration:""},
  th:{sejong:"พระเจ้าเซจง",young_sejong:"เซจงในวัยเยาว์",taejong:"พระเจ้าแทจง",kimmun:"ขุนนางคิมมุน",jeongjo:"พระเจ้าจองโจ",young_jeongjo:"จองโจในวัยเยาว์",jeongyakyong:"ชอง ยักยง",narration:""},
  vi:{sejong:"Vua Sejong",young_sejong:"Sejong thời trẻ",taejong:"Vua Taejong",kimmun:"Quan Kim Mun",jeongjo:"Vua Jeongjo",young_jeongjo:"Jeongjo thời trẻ",jeongyakyong:"Jeong Yak-yong",narration:""},
  ru:{sejong:"Король Седжон",young_sejong:"Юный Седжон",taejong:"Король Тхэджон",kimmun:"Чиновник Ким Мун",jeongjo:"Король Чонджо",young_jeongjo:"Юный Чонджо",jeongyakyong:"Чон Як Ён",narration:""},
  fr:{sejong:"Roi Sejong",young_sejong:"Jeune Sejong",taejong:"Roi Taejong",kimmun:"Officiel Kim Mun",jeongjo:"Roi Jeongjo",young_jeongjo:"Jeune Jeongjo",jeongyakyong:"Jeong Yak-yong",narration:""},
  de:{sejong:"König Sejong",young_sejong:"Junger Sejong",taejong:"König Taejong",kimmun:"Beamter Kim Mun",jeongjo:"König Jeongjo",young_jeongjo:"Junger Jeongjo",jeongyakyong:"Jeong Yak-yong",narration:""},
  es:{sejong:"Rey Sejong",young_sejong:"Joven Sejong",taejong:"Rey Taejong",kimmun:"Funcionario Kim Mun",jeongjo:"Rey Jeongjo",young_jeongjo:"Joven Jeongjo",jeongyakyong:"Jeong Yak-yong",narration:""},
} as const;

const turnCache=new Map<string,TranslatedTurn>();
const turnPending=new Map<string,Promise<TranslatedTurn>>();

async function requestTurn(characterId:string,turn:number,lang:string){
  const key=`${characterId}:${turn}:${lang}`;
  if(turnCache.has(key)) return turnCache.get(key)!;
  if(turnPending.has(key)) return turnPending.get(key)!;

  const promise=fetch("/api/translate",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({kind:"story",id:characterId,lang,turn})
  }).then(async res=>{
    if(!res.ok) throw new Error("Translation unavailable");
    const data=await res.json();
    turnCache.set(key,data.content);
    return data.content as TranslatedTurn;
  }).finally(()=>turnPending.delete(key));

  turnPending.set(key,promise);
  return promise;
}

export default function RoleplayPage(){
  const {characterId}=useParams<{characterId:string}>();
  const lang=useSearchParams().get("lang")??"ko";
  const locale=normalizeLocale(lang);
  const copy=getCopy(lang);
  const story=stories[characterId as keyof typeof stories];

  const [turn,setTurn]=useState(1);
  const [scriptIndex,setScriptIndex]=useState(0);
  const [phase,setPhase]=useState<"script"|"choices"|"reaction"|"transition">("script");
  const [affinity,setAffinity]=useState(0);
  const [options,setOptions]=useState<Option[]>([]);
  const [reaction,setReaction]=useState<Line|null>(null);
  const [history,setHistory]=useState<any[]>([]);
  const [typedText,setTypedText]=useState("");
  const [isTyping,setIsTyping]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [translatedTurns,setTranslatedTurns]=useState<Record<number,TranslatedTurn>>({});

  const originalScene=story?.turns[turn as keyof typeof story.turns] as any;
  const translatedScene=translatedTurns[turn];
  const scene=locale==="ko"?originalScene:translatedScene??originalScene;
  const script:Line[]=scene?.script??[];
  const currentLine=script[scriptIndex];
  const activeLine=phase==="reaction"?reaction:phase==="script"?currentLine:null;
  const fullText=activeLine?.text??"";
  const speakerNames=names[locale];
  const speakerName=activeLine?speakerNames[activeLine.speaker as keyof typeof speakerNames]??activeLine.speaker:"";
  const characterImage=activeLine?getCharacterImage(activeLine.speaker,activeLine.emotion):null;
  const backgroundImage=originalScene?getStoryBackground(characterId,originalScene.background):"";
  const totalTurns=story?Object.keys(story.turns).length:0;

  useEffect(()=>{
    setTurn(1);setScriptIndex(0);setPhase("script");setAffinity(0);setOptions([]);setReaction(null);setHistory([]);setError("");setTranslatedTurns({});
  },[characterId,lang]);

  useEffect(()=>{
    if(!story||locale==="ko") return;
    let active=true;

    requestTurn(characterId,turn,lang).then(content=>{
      if(!active)return;
      setTranslatedTurns(prev=>({...prev,[turn]:content}));

      const next=turn+1;
      if(next<=totalTurns){
        requestTurn(characterId,next,lang).then(nextContent=>{
          if(active)setTranslatedTurns(prev=>({...prev,[next]:nextContent}));
        }).catch(()=>{});
      }
    }).catch(err=>{
      console.error("Turn translation failed:",err);
      if(active)setError("Translation unavailable");
    });

    return()=>{active=false;};
  },[characterId,turn,lang,locale,story,totalTurns]);

  useEffect(()=>{
    if(!fullText)return;
    setTypedText("");setIsTyping(true);
    let index=0;
    const timer=window.setInterval(()=>{
      index++;setTypedText(fullText.slice(0,index));
      if(index>=fullText.length){clearInterval(timer);setIsTyping(false);}
    },28);
    return()=>clearInterval(timer);
  },[fullText]);

  async function loadChoices(){
    if(loading)return;
    try{
      setLoading(true);setError("");
      const res=await fetch("/api/dialogue",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storyId:characterId,language:lang,turn,mode:"choices",history,affinity})});
      const data:ApiResponse=await res.json();
      if(!res.ok)throw new Error(data.error||"선택지를 생성하지 못했습니다.");
      if(!data.options?.length)throw new Error("AI가 선택지를 반환하지 않았습니다.");
      setOptions(data.options);setPhase("choices");
    }catch(err){setError(err instanceof Error?err.message:"오류가 발생했습니다.");}
    finally{setLoading(false);}
  }

  function nextDialogue(){
    if(loading)return;
    if(isTyping){setTypedText(fullText);setIsTyping(false);return;}
    if(phase!=="script")return;
    if(scriptIndex<script.length-1){setScriptIndex(i=>i+1);return;}
    loadChoices();
  }

  async function selectOption(option:Option){
    if(loading)return;
    const nextAffinity=affinity+option.affinity_score;
    const newHistory=[...history,{role:"player",text:option.text,type:option.type,affinity_score:option.affinity_score}];
    setLoading(true);setError("");

    try{
      const res=await fetch("/api/dialogue",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storyId:characterId,language:lang,turn,mode:"reaction",selectedOption:option,history:newHistory,affinity:nextAffinity})});
      const data:ApiResponse=await res.json();
      if(!res.ok)throw new Error(data.error||"반응을 생성하지 못했습니다.");
      const npcReaction=data.dialogue?.[0];
      if(!npcReaction)throw new Error("AI가 반응을 반환하지 않았습니다.");

      setAffinity(nextAffinity);setOptions([]);setReaction(npcReaction);
      setHistory([...newHistory,{role:"character",speaker:npcReaction.speaker,text:npcReaction.text}]);
      setPhase("reaction");
    }catch(err){setError(err instanceof Error?err.message:"오류가 발생했습니다.");}
    finally{setLoading(false);}
  }

  function nextTurn(){
    const next=turn+1;
    const nextOriginalScene=story.turns[next as keyof typeof story.turns] as any;
    if(!nextOriginalScene){setTurn(next);return;}

    setPhase("transition");setReaction(null);
    setTimeout(()=>{
      setTurn(next);setScriptIndex(0);setOptions([]);setPhase("script");setError("");
    },2200);
  }

  if(!story)return <main className={styles.messageScreen}>스토리를 찾을 수 없습니다.</main>;
  if(!originalScene)return <main className={styles.messageScreen}>이야기가 종료되었습니다.</main>;

  const nextTurnNumber=turn+1;
  const nextOriginalScene=story.turns[nextTurnNumber as keyof typeof story.turns] as any;
  const nextScene=locale==="ko"?nextOriginalScene:translatedTurns[nextTurnNumber]??nextOriginalScene;

  return(
    <main className={styles.game} style={{backgroundImage:`url("${backgroundImage}")`}}>
      <div className={styles.overlay}/>

      <header className={styles.header}>
        <div>
          <div className={styles.logo}>HISTOUR</div>
          <div className={styles.storyTitle}>{story.title}</div>
        </div>
        <div className={styles.turn}>{turn} / {totalTurns}</div>
      </header>

      {phase!=="choices"&&characterImage&&(
        <img key={`${activeLine?.speaker}-${activeLine?.emotion}-${scriptIndex}`} src={characterImage} alt={speakerName} className={styles.character}/>
      )}

      {phase==="choices"&&!loading&&(
        <section className={styles.choices}>
          <div className={styles.choiceTitle}>{copy.gameChoiceTitle}</div>
          {options.map((option,index)=>(
            <button key={option.id} className={styles.choice} style={{animationDelay:`${index*90}ms`}} onClick={()=>selectOption(option)}>
              <span className={styles.choiceNumber}>{index+1}</span>{option.text}
            </button>
          ))}
        </section>
      )}

      {phase!=="choices"&&activeLine&&(
        <section className={styles.dialogueBox} onClick={nextDialogue}>
          {speakerName&&<div className={styles.nameTag}>{speakerName}</div>}
          <div className={styles.dialogueText}>{typedText}{isTyping&&<span className={styles.cursor}/>}</div>
          {phase==="script"&&!isTyping&&<div className={styles.nextIndicator}>▼</div>}
          {phase==="reaction"&&!isTyping&&(
            <button className={styles.nextTurn} onClick={e=>{e.stopPropagation();nextTurn();}}>{copy.nextStory}</button>
          )}
        </section>
      )}

      {loading&&<div className={styles.loading}><span className={styles.loadingDot}>·</span><span className={styles.loadingDot}>·</span><span className={styles.loadingDot}>·</span></div>}
      {error&&<div className={styles.error}>{error}</div>}

      {phase==="transition"&&(
        <div className={styles.chapterTransition}>
          <div className={styles.transitionContent}>
            <div className={styles.transitionTitle}>{nextScene?.transition?.title??copy.timePasses}</div>
            {nextScene?.transition?.text&&<div className={styles.transitionText}>{nextScene.transition.text}</div>}
          </div>
        </div>
      )}
    </main>
  );
}