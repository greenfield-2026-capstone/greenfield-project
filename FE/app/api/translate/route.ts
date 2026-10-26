import { NextRequest, NextResponse } from "next/server";
import { getAllRegions, getPlace } from "../../../lib/culture-data";
import { stories } from "../../../data/stories";
import { languageOptions } from "../../../lib/locale";
import { translateContent } from "../../../lib/contentTranslation";
import { detailCopy } from "../../../lib/detailCopy";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body;
  try {body=await req.json();} catch {return NextResponse.json({error:"Invalid request"},{status:400});}
  if(!body||!languageOptions.some(l=>l.code===body.lang)||typeof body.id!=="string") return NextResponse.json({error:"Invalid request"},{status:400});

  if(body.kind==="ui"&&body.id==="detail"){
    try{
      const keys=Object.keys(detailCopy) as (keyof typeof detailCopy)[];
      const translated=await translateContent({text:keys.map(key=>detailCopy[key])},body.lang);
      return NextResponse.json({content:Object.fromEntries(keys.map((key,index)=>[key,translated.text[index]]))});
    }catch{return NextResponse.json({error:"Translation unavailable"},{status:503});}
  }

  if(body.kind==="ui"&&body.id==="regions"){
    try{return NextResponse.json({content:await translateContent({text:["지역 기준",...getAllRegions()]},body.lang)});}
    catch{return NextResponse.json({error:"Translation unavailable"},{status:503});}
  }

  if(body.kind==="story"&&typeof body.turn==="number"&&Object.hasOwn(stories,body.id)){
    const story=stories[body.id as keyof typeof stories] as any;
    const scene=story.turns[body.turn];
    if(!scene)return NextResponse.json({error:"Turn not found"},{status:404});

    const displayContent={
      title:scene.title,
      transition:scene.transition?{title:scene.transition.title,text:scene.transition.text}:undefined,
      script:scene.script.map((line:any)=>({speaker:line.speaker,emotion:line.emotion,text:line.text}))
    };

    try{
      return NextResponse.json({content:await translateContent(displayContent,body.lang)});
    }catch(error){
      console.error(`STORY TURN TRANSLATION ERROR [${body.id}:${body.turn}:${body.lang}]:`,error);
      return NextResponse.json({error:"Translation unavailable"},{status:503});
    }
  }

  const source=body.kind==="place"?getPlace(body.id):body.kind==="story"&&Object.hasOwn(stories,body.id)?stories[body.id as keyof typeof stories]:undefined;
  if(!source)return NextResponse.json({error:"Content not found"},{status:404});

  try{return NextResponse.json({content:await translateContent(source,body.lang)});}
  catch{return NextResponse.json({error:"Translation unavailable"},{status:503});}
}