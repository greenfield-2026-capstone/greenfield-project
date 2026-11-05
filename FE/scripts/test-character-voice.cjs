const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');
const original = Module._load;
Module._load = function(id, ...args) {
  if (id === 'next/cache') return { unstable_cache: fn => fn };
  return original.call(this, id, ...args);
};
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022}}).outputText, filename);
const { getCharacterVoice, buildVoiceRules } = require('../lib/characterVoice.ts');
const { languageOptions } = require('../lib/locale.ts');
const { translateContent } = require('../lib/contentTranslation.ts');
const places = require('../data/curated/places.json');
for (const place of places) for (const person of place.characters) assert.ok(getCharacterVoice(person.id), person.id);
assert.equal(getCharacterVoice('chusa').id, 'kim_jeonghee');
assert.equal(getCharacterVoice('gimandeok').id, 'mandeok');
assert.equal(getCharacterVoice('missing'), null);
assert.ok(getCharacterVoice('young_sejong').speechRules.some(rule => rule.includes('아직 왕이 아니므로')));
assert.ok(getCharacterVoice('heungseon').speechRules.some(rule => rule.includes('과인·짐')));
for (const {code} of languageOptions) {
  const rules = buildVoiceRules(code);
  assert.ok(rules.length > 400);
  assert.match(rules, /Player choices remain the modern visitor/);
}
assert.equal(new Set(languageOptions.map(({code}) => buildVoiceRules(code))).size, 11);
process.env.LITELLM_URL = 'https://translation.example';
process.env.LITELLM_API_KEY = 'test';
process.env.LITELLM_MODEL = 'test';
const source = {title:'즉위 전', historicalFacts:['아직 왕이 아니다'], script:[
  {speaker:'taejo',emotion:'neutral',text:'알겠다'},
  {speaker:'kimmun',emotion:'neutral',text:'알겠다'},
  {speaker:'narration',emotion:null,text:'알겠다'}
]};
global.fetch = async (_, init) => {
  const request = JSON.parse(init.body);
  const {texts, contexts} = JSON.parse(request.messages[1].content);
  const lines = contexts.filter(context => context.field === 'text');
  assert.deepEqual(lines.map(line => line.speaker), ['taejo','kimmun','narration']);
  assert.equal(lines[0].voice.id, 'taejo');
  assert.deepEqual(lines[0].historicalFacts, source.historicalFacts);
  assert.deepEqual(lines[0].sceneDialogue, source.script);
  assert.equal(lines[2].kind, 'narration');
  assert.match(request.messages[0].content, /朕・ぞよ/);
  return Response.json({choices:[{message:{content:JSON.stringify({translations:texts.map((text,index) => '訳'+index+text)})}}]});
};
(async () => {
  const result = await translateContent(source, 'ja');
  assert.notEqual(result.script[0].text, result.script[1].text);
  assert.notEqual(result.script[1].text, result.script[2].text);
  assert.equal(result.script[0].speaker, 'taejo');
  assert.equal(source.script[0].text, '알겠다');
  assert.deepEqual(result.historicalFacts, source.historicalFacts);
  console.log('PASS: all chat identities, 11 distinct locale policies, rank exclusions, aligned speaker/scene context, duplicate dialogue and immutable source');
})().catch(error => { console.error(error); process.exitCode = 1; });
