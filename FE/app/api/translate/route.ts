import { NextRequest, NextResponse } from "next/server";
import { getPlace } from "../../../lib/culture-data";
import { stories } from "../../../data/stories";
import { languageOptions } from "../../../lib/locale";
import { translateContent } from "../../../lib/contentTranslation";
import { detailCopy } from "../../../lib/detailCopy";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(req: NextRequest) {
  let body;
  try {body = await req.json();} catch {return NextResponse.json({error:"Invalid request"},{status:400});}
  if (!body || !languageOptions.some(l=>l.code===body.lang) || typeof body.id !== 'string') return NextResponse.json({error:"Invalid request"},{status:400});
  if (body.kind === "ui" && body.id === "detail") {
    try {
      const keys = Object.keys(detailCopy) as (keyof typeof detailCopy)[];
      const translated = await translateContent({text:keys.map(key=>detailCopy[key])}, body.lang);
      return NextResponse.json({content:Object.fromEntries(keys.map((key,index)=>[key,translated.text[index]]))});
    } catch {return NextResponse.json({error:"Translation unavailable"},{status:503});}
  }
  // Accept only registered content, never arbitrary text from a public caller.
  const source = body.kind === "place" ? getPlace(body.id) : body.kind === "story" && Object.hasOwn(stories,body.id) ? stories[body.id as keyof typeof stories] : undefined;
  if (!source) return NextResponse.json({error:"Content not found"},{status:404});
  try {return NextResponse.json({content:await translateContent(source,body.lang)});}
  catch {return NextResponse.json({error:"Translation unavailable"},{status:503});}
}
