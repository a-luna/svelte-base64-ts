// These RegExps are directly copied from the implementation of the _stringToArray function in lodash
// (https://github.com/lodash/lodash/blob/4.13.1-npm/_stringToArray.js)

/** Used to compose unicode character classes. */
const rsAstralRange = '\\ud800-\\udfff',
	rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	rsComboSymbolsRange = '\\u20d0-\\u20f0',
	rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
const rsAstral = `[${rsAstralRange}]`,
	rsCombo = `[${rsComboMarksRange}${rsComboSymbolsRange}]`,
	rsFitz = '\\ud83c[\\udffb-\\udfff]',
	rsModifier = `(?:${rsCombo}|${rsFitz})`,
	rsNonAstral = `[^${rsAstralRange}]`,
	rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
const reOptMod = `${rsModifier}?`,
	rsOptVar = `[${rsVarRange}]?`,
	rsOptJoin = `(?:${rsZWJ}(?:${rsNonAstral}|${rsRegional}|${rsSurrPair})${rsOptVar}${reOptMod})*`,
	rsSeq = `${rsOptVar}${reOptMod}${rsOptJoin}`,
	rsSymbol = `(?:${rsNonAstral}${rsCombo}?|${rsCombo}|${rsRegional}|${rsSurrPair}|${rsAstral})`;

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
export const reComplexSymbol = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol}${rsSeq}`, 'g');
