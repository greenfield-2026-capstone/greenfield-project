export function TranslationStatus({lang, translated, failed}:{lang:string;translated:boolean;failed:boolean}) {
  if(translated) return null;
  return <p role="status" style={{fontSize:12,lineHeight:1.6,color:'#687467',padding:'8px 0'}}>{failed ? (lang==='ko'?'번역을 불러오지 못해 원문을 표시합니다.':'Translation unavailable. Showing the original text.') : (lang==='ko'?'번역 중…':'Translating…')}</p>;
}
