// Exercise the real route handler with a mocked upstream AI service.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022}}).outputText, filename);
const { POST } = require('../app/api/dialogue/route.ts');
const request = (data) => new Request('https://histour.vercel.app/api/dialogue', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
const input = {storyId:'sejong',turn:1,mode:'choices'};
const options = ['supportive','playful','curious','challenging'].map((type,i)=>({id:i+1,type,text:`선택 ${i+1}`,affinity_score:0}));
let calls = 0;
global.fetch = async (url, init) => {
  calls++;
  assert.equal(String(url),'https://ai.example/v1/chat/completions');
  assert.equal(init.headers.Authorization,'Bearer test-only');
  assert.equal(JSON.parse(init.body).model,'test-model');
  return Response.json({choices:[{message:{content:'```json\n'+JSON.stringify({options})+'\n```'}}]});
};
(async()=>{
  delete process.env.LITELLM_URL;
  delete process.env.LITELLM_API_KEY;
  delete process.env.LITELLM_MODEL;
  assert.equal((await POST(request(input))).status,503);
  assert.equal(calls,0);
  process.env.LITELLM_URL='https://ai.example';
  process.env.LITELLM_API_KEY='test-only';
  process.env.LITELLM_MODEL='test-model';
  assert.deepEqual((await (await POST(request(input))).json()).options,options);
  process.env.LITELLM_URL='https://ai.example/v1/';
  assert.equal((await POST(request(input))).status,200);
  assert.equal((await POST(request({...input,storyId:'unknown'}))).status,404);
  assert.equal((await POST(request({...input,turn:99}))).status,404);
  assert.equal((await POST(request({...input,mode:'reaction'}))).status,400);
  const reaction={speaker:'kimmun',emotion:'neutral',text:'전하, 잠시 쉬시지요.'};
  global.fetch=async (url,init)=>{
    assert.match(JSON.parse(init.body).messages[0].content,/\[kimmun\]/);
    return Response.json({choices:[{message:{content:JSON.stringify({dialogue:[reaction]})}}]});
  };
  assert.deepEqual((await (await POST(request({...input,turn:2,mode:'reaction',selectedOption:options[0]}))).json()).dialogue,[reaction]);
  global.fetch=async()=>Response.json({choices:[{message:{content:'{"options":[]}'}}]});
  assert.equal((await POST(request(input))).status,502);
  global.fetch=async()=>new Response('unauthorized',{status:401});
  assert.equal((await POST(request(input))).status,502);
  global.fetch=async()=>{throw new DOMException('timeout','TimeoutError')};
  assert.equal((await POST(request(input))).status,504);
  process.env.LITELLM_URL='https://histour.vercel.app';
  assert.equal((await POST(request(input))).status,503);
  console.log('PASS: choices, reaction, URL normalization, missing config, invalid input, invalid output, upstream error, timeout, self-call prevention');
})().catch(error=>{console.error(error);process.exitCode=1});
