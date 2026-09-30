const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,filename);
const {getCharacterGameId}=require('../lib/characterGame.ts');
const {getStoryBackground,getCharacterImage}=require('../lib/characterImages.ts');
const {stories}=require('../data/stories/index.ts');
const {characters}=require('../data/characters/index.ts');
assert.equal(getCharacterGameId('sejong-gwanghwamun'),'sejong');
assert.equal(getCharacterGameId('jeongjo-changdeokgung'),'jeongjo');
assert.equal(getCharacterGameId('jeongjo'),'jeongjo');
assert.equal(getCharacterGameId('taejong'),undefined);
assert.equal(getCharacterGameId('toString'),undefined);
for(const scene of Object.values(stories.jeongjo.turns)) {
 const background=getStoryBackground('jeongjo',scene.background);
 assert.ok(background && fs.existsSync(path.join(__dirname,'../public',background)),background);
 for(const id of scene.characters) assert.ok(characters[id],`Missing character ${id}`);
 for(const line of scene.script) {
  if(line.speaker==='narration') continue;
  assert.ok(characters[line.speaker],line.speaker);
  const asset=getCharacterImage(line.speaker,line.emotion);
  if(asset) assert.ok(fs.existsSync(path.join(__dirname,'../public',asset)),asset);
 }
}
console.log('PASS: game aliases, unavailable games, all Jeongjo scene backgrounds and character registration/assets');
