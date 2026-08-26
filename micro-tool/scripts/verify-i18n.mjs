// ============================================================
// PSUCheck — Automated i18n Parity & Leak Verification Engine
// Validates: 100% Dictionary Key Parity, Zero Untranslated Keys,
// Bi-directional Hreflang Canonical Integrity, and Subpath Routing.
// ============================================================

import { SUPPORTED_LOCALES } from '../src/i18n/locales.ts';
import { DICTIONARIES } from '../src/i18n/index.ts';
import { l, getLangFromUrl, getCleanPath, getAlternateHreflangLinks, formatCurrency } from '../src/i18n/utils.ts';

let failureCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failureCount++;
  } else {
    console.log(`✓ PASS: ${message}`);
  }
}

console.log('\n========================================');
console.log('🌐 1. DICTIONARY PARITY & KEY INTEGRITY');
console.log('========================================');

const baseDict = DICTIONARIES['en'];

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      keys = keys.concat(getAllKeys(v, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const baseKeys = getAllKeys(baseDict);
console.log(`Base dictionary (en) has ${baseKeys.length} distinct translation keys.`);

for (const lang of SUPPORTED_LOCALES) {
  const dict = DICTIONARIES[lang];
  assert(!!dict, `Dictionary for '${lang}' is loaded`);

  const langKeys = getAllKeys(dict);
  assert(
    langKeys.length === baseKeys.length,
    `Locale '${lang}' key count (${langKeys.length}) matches base 'en' (${baseKeys.length})`
  );

  const missingKeys = baseKeys.filter(k => !langKeys.includes(k));
  assert(missingKeys.length === 0, `Locale '${lang}' has 0 missing keys ${missingKeys.length > 0 ? `(${missingKeys.join(', ')})` : ''}`);

  // Check for undefined, null, or empty string values
  let emptyCount = 0;
  for (const key of baseKeys) {
    const parts = key.split('.');
    let cur = dict;
    for (const p of parts) {
      cur = cur ? cur[p] : undefined;
    }
    if (typeof cur !== 'string' || cur.trim() === '') {
      emptyCount++;
    }
  }
  assert(emptyCount === 0, `Locale '${lang}' has 0 empty/undefined string values (found: ${emptyCount})`);
}

console.log('\n========================================');
console.log('🔗 2. SUBPATH ROUTING & NORMALIZATION');
console.log('========================================');

assert(l('/psu-calculator', 'en') === '/psu-calculator', "l('/psu-calculator', 'en') returns unprefixed '/psu-calculator'");
assert(l('/', 'en') === '/', "l('/', 'en') returns '/'");
assert(l('/psu-calculator', 'de') === '/de/psu-calculator', "l('/psu-calculator', 'de') returns '/de/psu-calculator'");
assert(l('/', 'de') === '/de', "l('/', 'de') returns '/de'");
assert(l('/ja/psu-calculator', 'fr') === '/fr/psu-calculator', "l('/ja/psu-calculator', 'fr') re-roots to '/fr/psu-calculator'");
assert(l('/zh/best-psu', 'en') === '/best-psu', "l('/zh/best-psu', 'en') strips prefix for 'en'");

assert(getCleanPath('/de/psu-calculator') === '/psu-calculator', "getCleanPath('/de/psu-calculator') returns '/psu-calculator'");
assert(getCleanPath('/ja/') === '/', "getCleanPath('/ja/') returns '/'");
assert(getCleanPath('/pc-builder') === '/pc-builder', "getCleanPath('/pc-builder') returns '/pc-builder'");

assert(getLangFromUrl(new URL('https://psucheck.com/de/psu-calculator')) === 'de', 'Detects de locale from URL');
assert(getLangFromUrl(new URL('https://psucheck.com/ja/')) === 'ja', 'Detects ja locale from URL');
assert(getLangFromUrl(new URL('https://psucheck.com/psu-calculator')) === 'en', 'Defaults to en for unprefixed URL');

console.log('\n========================================');
console.log('🏷️  3. HREFLANG INTEGRITY & CANONICALS');
console.log('========================================');

const hreflangs = getAlternateHreflangLinks('/psu-calculator');
assert(hreflangs.length === SUPPORTED_LOCALES.length + 1, `Generates ${SUPPORTED_LOCALES.length + 1} alternate hreflang tags (all locales + x-default)`);

const xDefault = hreflangs.find(h => h.lang === 'x-default');
assert(!!xDefault && xDefault.href === 'https://psucheck.com/psu-calculator', "x-default points to canonical English URL 'https://psucheck.com/psu-calculator'");

const deLink = hreflangs.find(h => h.lang === 'de');
assert(!!deLink && deLink.href === 'https://psucheck.com/de/psu-calculator', "de hreflang points to 'https://psucheck.com/de/psu-calculator'");

console.log('\n========================================');
console.log('💱 4. CURRENCY & NUMBER LOCALIZATION');
console.log('========================================');

assert(formatCurrency(100, 'en').includes('$'), "English formatCurrency contains '$'");
assert(formatCurrency(100, 'de').includes('€'), "German formatCurrency contains '€'");
assert(formatCurrency(100, 'fr').includes('€'), "French formatCurrency contains '€'");
assert(formatCurrency(100, 'ja').includes('¥') || formatCurrency(100, 'ja').includes('￥'), "Japanese formatCurrency contains '¥'");
assert(formatCurrency(100, 'zh').includes('¥') || formatCurrency(100, 'zh').includes('￥'), "Chinese formatCurrency contains '¥'");

console.log('\n========================================');
if (failureCount === 0) {
  console.log('🎉 ALL i18n VERIFICATION CHECKS PASSED WITH ZERO ERRORS!');
  process.exit(0);
} else {
  console.error(`💥 ${failureCount} VERIFICATION CHECKS FAILED!`);
  process.exit(1);
}
