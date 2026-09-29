"use client";
import { detailCopy } from "@/lib/detailCopy";
import { useTranslatedContent } from "@/lib/useTranslatedContent";
export function PlacePeopleHeading({lang}:{lang:string}) {
  const {content} = useTranslatedContent("ui", "detail", detailCopy, lang);
  return <div className="section-heading compact-top"><div><h2>{content.characters}</h2></div></div>;
}
