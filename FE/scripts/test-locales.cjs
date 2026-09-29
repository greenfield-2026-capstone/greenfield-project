const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText, filename);
const {languageOptions,normalizeLocale} = require('../lib/locale.ts');
const {getAccountCopy} = require('../lib/accountTranslations.ts');
const {getCopy,languageNames} = require('../lib/translations.ts');
assert.equal(languageOptions.length,11);
const keys = Object.keys(getCopy('ko'));
for (const {code} of languageOptions) {
  assert.equal(normalizeLocale(code),code);
  const copy = getCopy(code);
  for (const key of keys) assert.ok(typeof copy[key] === 'string' && copy[key].trim(),`${code}.${key} is missing`);
  assert.ok(languageNames[code]);
  for(const [key,value] of Object.entries(getAccountCopy(code))) assert.ok(typeof value === "string" && value.trim(), `${code}.account.${key}`);
  if(code!=='ko') assert.notEqual(copy.apply,getCopy('ko').apply);
}
assert.equal(normalizeLocale('invalid'),'ko');
assert.equal(normalizeLocale(null),'ko');
assert.equal(getCopy('ja').language,'言語');
assert.equal(getCopy('zh-Hant').language,'語言');
console.log(`PASS: ${languageOptions.length} locales, ${keys.length} labels per locale, locale validation`);
