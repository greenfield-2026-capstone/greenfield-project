"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { languageOptions, normalizeLocale } from '@/lib/locale';
import { getCopy } from '@/lib/translations';
import { getAccountCopy } from '@/lib/accountTranslations';

export function AccountAccessForm(){
  const router=useRouter(),params=useSearchParams();
  const [language,setLanguage]=useState(normalizeLocale(params.get('lang')));
  const [mode,setMode]=useState<'login'|'signup'>('login');
  const [email,setEmail]=useState(''),[name,setName]=useState(''),[password,setPassword]=useState(''),[confirm,setConfirm]=useState('');
  const [busy,setBusy]=useState(false),[error,setError]=useState('');
  const t=getAccountCopy(language),common=getCopy(language);
  useEffect(()=>{setLanguage(normalizeLocale(params.get('lang')));},[params]);
  const valid=!!email.trim()&&!!password&&(mode==='login'||(!!name.trim()&&password===confirm));
  async function submit(event:React.FormEvent){
    event.preventDefault();if(!valid||busy)return;
    setBusy(true);setError('');
    try {
      const base=process.env.NEXT_PUBLIC_API_BASE_URL??'http://localhost:8080';
      const response=await fetch(`${base}/auth/${mode}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password,...(mode==='signup'?{name:name.trim()}:{})})});
      if(!response.ok)throw new Error('Account request failed');
      const data=await response.json();
      localStorage.setItem('histour-language',language);
      localStorage.setItem('histour-account',JSON.stringify(data.user??{name:name.trim(),email}));
      window.dispatchEvent(new Event('histour-account-changed'));
      router.push(`/?lang=${language}`);
    }catch{setError(t.failure);}finally{setBusy(false);}
  }
  return <section className="account-page" style={{maxWidth:560,margin:'0 auto'}}>
    <div className="account-page-top"><h1>{t.title}</h1></div>
    <div className="card account-form-card">
      <div className="account-tabs">{(['login','signup'] as const).map(tab=><button key={tab} type="button" className={`account-tab ${mode===tab?'is-active':''}`} onClick={()=>{setMode(tab);setError('');}}>{tab==='login'?common.login:t.signup}</button>)}</div>
      <form className="account-form" onSubmit={submit}>
        {mode==='signup'&&<label className="locale-field"><span>{t.name}</span><input autoComplete="name" value={name} onChange={e=>setName(e.target.value)} required /></label>}
        <label className="locale-field"><span>{t.email}</span><input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
        <label className="locale-field"><span>{t.password}</span><input type="password" autoComplete={mode==='login'?'current-password':'new-password'} value={password} onChange={e=>setPassword(e.target.value)} required /></label>
        {mode==='signup'&&<label className="locale-field"><span>{t.confirm}</span><input type="password" autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />{confirm&&confirm!==password&&<p role="alert">{t.mismatch}</p>}</label>}
        <label className="locale-field"><span>{common.language}</span><select value={language} onChange={e=>{const value=normalizeLocale(e.target.value);setLanguage(value);localStorage.setItem('histour-language',value);router.replace(`/account?lang=${value}`);}}>{languageOptions.map(option=><option key={option.code} value={option.code}>{option.label}</option>)}</select></label>
        {error&&<p role="alert">{error}</p>}
        <button className={`locale-apply ${valid?'is-ready':''}`} disabled={!valid||busy} type="submit">{busy?t.working:mode==='login'?common.login:t.signup}</button>
      </form>
    </div>
  </section>;
}
