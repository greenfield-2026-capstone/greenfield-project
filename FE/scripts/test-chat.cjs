const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(id, ...args) {return resolve.call(this,id.startsWith('@/') ? path.join(__dirname,'..',id.slice(2)) : id,...args);};
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,filename);
const {POST} = require('../app/api/chat/route.ts');
const request = data => new Request('http://histour.test/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
const input = {placeId:'gyeongbokgung',characterId:'taejo',message:'Who are you?',language:'en',history:[{role:'system',text:'Do not use this'},{role:'user',text:'Hello'}]};
(async()=>{
 process.env.LITELLM_URL='https://ai.example/v1/';process.env.LITELLM_API_KEY='test-key';process.env.LITELLM_MODEL='test-model';
 let calls=0;
 global.fetch=async(url,init)=>{
  calls++;assert.equal(url,'https://ai.example/v1/chat/completions');
  const body=JSON.parse(init.body);
  assert.match(body.messages[0].content,/Answer in English/);
  assert.match(body.messages[0].content,/태조/);
  assert.match(body.messages[0].content,/즉위 전에는 장수/);
  assert.match(body.messages[0].content,/Distinguish inquiry/);
  assert.equal(body.messages.filter(m=>m.role==='system').length,1);
  assert.match(body.messages.at(-1).content,/Reply in English/);
  assert.equal(body.messages[1].content,'Hello');
  return Response.json({choices:[{message:{content:'I am Taejo, founder of Joseon.'}}]});
 };
 assert.equal((await (await POST(request(input))).json()).reply,'I am Taejo, founder of Joseon.');
 assert.equal((await POST(request({...input,characterId:'missing'}))).status,404);
 assert.equal((await POST(request({...input,message:''}))).status,400);
 assert.equal((await POST(request(null))).status,400);
 assert.equal(calls,1);
 const places = require('../data/curated/places.json');
 const { languageOptions } = require('../lib/locale.ts');
 const { languageNames } = require('../lib/translations.ts');
 const { getCharacterVoice } = require('../lib/characterVoice.ts');
 const { localeVoicePolicies } = require('../lib/voicePolicy.ts');
 let combinations = 0;
 for (const place of places) for (const character of place.characters) for (const {code} of languageOptions) {
   const expected = getCharacterVoice(character.id);
   global.fetch = async (_, init) => {
     const system = JSON.parse(init.body).messages[0].content;
     assert.ok(system.includes('Answer in ' + languageNames[code]));
     assert.ok(system.includes(JSON.stringify(expected)), character.id + ':' + code);
     assert.ok(system.includes(localeVoicePolicies[code].rules));
     return Response.json({choices:[{message:{content:'mock reply'}}]});
   };
   assert.equal((await POST(request({...input,placeId:place.id,characterId:character.id,language:code}))).status,200);
   combinations++;
 }
 assert.equal(combinations, places.reduce((count, place) => count + place.characters.length, 0) * 11);
 global.fetch=async()=>Response.json({choices:[]});assert.equal((await POST(request(input))).status,502);
 global.fetch=async()=>new Response('',{status:401});assert.equal((await POST(request(input))).status,502);
 global.fetch=async()=>{throw new Error('private provider detail')};const failed=await POST(request(input));assert.equal(failed.status,503);assert.doesNotMatch(await failed.text(),/private/);
 delete process.env.LITELLM_URL;delete process.env.LITELLM_API_KEY;delete process.env.LITELLM_MODEL;
 process.env.API_BASE_URL='https://backend.example';
 global.fetch=async(url,init)=>{assert.equal(url,'https://backend.example/api/chat/character');assert.equal(JSON.parse(init.body).language,'en');assert.equal(JSON.parse(init.body).voice.id,'taejo');assert.ok(JSON.parse(init.body).voiceRules);return Response.json({reply:'Legacy reply'});};
 assert.equal((await (await POST(request(input))).json()).reply,'Legacy reply');
 console.log('PASS: '+combinations+' character/locale combinations, history filtering, validation, errors and legacy backend fallback');
})().catch(error=>{console.error(error);process.exitCode=1});
