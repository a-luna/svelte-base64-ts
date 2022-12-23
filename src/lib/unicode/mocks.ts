import type { UnicodeCharInfo } from '$lib/types';

export const apiMocks: { [k: string]: UnicodeCharInfo[] } = {
	'%F0%9F%A6%A6': [
		{
			character: '🦦',
			name: 'OTTER',
			codepoint: 'U+1F9A6',
			block: 'Supplemental Symbols and Pictographs',
			plane: 'SMP',
			category: 'Other Symbol (So)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#129446;', '&#x1F9A6;'],
			uriEncoded: '%F0%9F%A6%A6',
			utf8: '0xF0 0x9F 0xA6 0xA6',
			utf16: '0xD83E 0xDDA6',
			utf32: '0x0001F9A6',
			utf8HexBytes: ['F0', '9F', 'A6', 'A6'],
			utf8DecBytes: [240, 159, 166, 166],
		},
	],
	'%F0%9F%91%A8%E2%80%8D%F0%9F%8C%BE': [
		{
			character: '👨',
			name: 'MAN',
			codepoint: 'U+1F468',
			block: 'Miscellaneous Symbols and Pictographs',
			plane: 'SMP',
			category: 'Other Symbol (So)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#128104;', '&#x1F468;'],
			uriEncoded: '%F0%9F%91%A8',
			utf8: '0xF0 0x9F 0x91 0xA8',
			utf16: '0xD83D 0xDC68',
			utf32: '0x0001F468',
			utf8HexBytes: ['F0', '9F', '91', 'A8'],
			utf8DecBytes: [240, 159, 145, 168],
		},
		{
			character: '‍',
			name: 'ZERO WIDTH JOINER',
			codepoint: 'U+200D',
			block: 'General Punctuation',
			plane: 'BMP',
			category: 'Format (Cf)',
			bidirectionalClass: 'Boundary Neutral (BN)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#8205;', '&#x200D;', '&zwj;'],
			uriEncoded: '%E2%80%8D',
			utf8: '0xE2 0x80 0x8D',
			utf16: '0x200D',
			utf32: '0x0000200D',
			utf8HexBytes: ['E2', '80', '8D'],
			utf8DecBytes: [226, 128, 141],
		},
		{
			character: '🌾',
			name: 'EAR OF RICE',
			codepoint: 'U+1F33E',
			block: 'Miscellaneous Symbols and Pictographs',
			plane: 'SMP',
			category: 'Other Symbol (So)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#127806;', '&#x1F33E;'],
			uriEncoded: '%F0%9F%8C%BE',
			utf8: '0xF0 0x9F 0x8C 0xBE',
			utf16: '0xD83C 0xDF3E',
			utf32: '0x0001F33E',
			utf8HexBytes: ['F0', '9F', '8C', 'BE'],
			utf8DecBytes: [240, 159, 140, 190],
		},
	],
	'%F0%9F%AB%A5': [
		{
			character: '🫥',
			name: 'DOTTED LINE FACE',
			codepoint: 'U+1FAE5',
			block: 'Symbols and Pictographs Extended-A',
			plane: 'SMP',
			category: 'Unassigned (Cn)',
			bidirectionalClass: '',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#129765;', '&#x1FAE5;'],
			uriEncoded: '%F0%9F%AB%A5',
			utf8: '0xF0 0x9F 0xAB 0xA5',
			utf16: '0xD83E 0xDEE5',
			utf32: '0x0001FAE5',
			utf8HexBytes: ['F0', '9F', 'AB', 'A5'],
			utf8DecBytes: [240, 159, 171, 165],
		},
	],
	'%F0%9F%8F%83%F0%9F%8F%BF%E2%80%8D%E2%99%80%EF%B8%8F': [
		{
			character: '🏃',
			name: 'RUNNER',
			codepoint: 'U+1F3C3',
			block: 'Miscellaneous Symbols and Pictographs',
			plane: 'SMP',
			category: 'Other Symbol (So)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#127939;', '&#x1F3C3;'],
			uriEncoded: '%F0%9F%8F%83',
			utf8: '0xF0 0x9F 0x8F 0x83',
			utf16: '0xD83C 0xDFC3',
			utf32: '0x0001F3C3',
			utf8HexBytes: ['F0', '9F', '8F', '83'],
			utf8DecBytes: [240, 159, 143, 131],
		},
		{
			character: '🏿',
			name: 'EMOJI MODIFIER FITZPATRICK TYPE-6',
			codepoint: 'U+1F3FF',
			block: 'Miscellaneous Symbols and Pictographs',
			plane: 'SMP',
			category: 'Modifier Symbol (Sk)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#127999;', '&#x1F3FF;'],
			uriEncoded: '%F0%9F%8F%BF',
			utf8: '0xF0 0x9F 0x8F 0xBF',
			utf16: '0xD83C 0xDFFF',
			utf32: '0x0001F3FF',
			utf8HexBytes: ['F0', '9F', '8F', 'BF'],
			utf8DecBytes: [240, 159, 143, 191],
		},
		{
			character: '‍',
			name: 'ZERO WIDTH JOINER',
			codepoint: 'U+200D',
			block: 'General Punctuation',
			plane: 'BMP',
			category: 'Format (Cf)',
			bidirectionalClass: 'Boundary Neutral (BN)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#8205;', '&#x200D;', '&zwj;'],
			uriEncoded: '%E2%80%8D',
			utf8: '0xE2 0x80 0x8D',
			utf16: '0x200D',
			utf32: '0x0000200D',
			utf8HexBytes: ['E2', '80', '8D'],
			utf8DecBytes: [226, 128, 141],
		},
		{
			character: '♀',
			name: 'FEMALE SIGN',
			codepoint: 'U+2640',
			block: 'Miscellaneous Symbols',
			plane: 'BMP',
			category: 'Other Symbol (So)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#9792;', '&#x2640;', '&female;'],
			uriEncoded: '%E2%99%80',
			utf8: '0xE2 0x99 0x80',
			utf16: '0x2640',
			utf32: '0x00002640',
			utf8HexBytes: ['E2', '99', '80'],
			utf8DecBytes: [226, 153, 128],
		},
		{
			character: '️',
			name: 'VARIATION SELECTOR-16',
			codepoint: 'U+FE0F',
			block: 'Variation Selectors',
			plane: 'BMP',
			category: 'Nonspacing Mark (Mn)',
			bidirectionalClass: 'Nonspacing Mark (NSM)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#65039;', '&#xFE0F;'],
			uriEncoded: '%EF%B8%8F',
			utf8: '0xEF 0xB8 0x8F',
			utf16: '0xFE0F',
			utf32: '0x0000FE0F',
			utf8HexBytes: ['EF', 'B8', '8F'],
			utf8DecBytes: [239, 184, 143],
		},
	],
	'%E2%98%9D%F0%9F%8F%BE': [
		{
			character: '☝',
			name: 'WHITE UP POINTING INDEX',
			codepoint: 'U+261D',
			block: 'Miscellaneous Symbols',
			plane: 'BMP',
			category: 'Other Symbol (So)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#9757;', '&#x261D;'],
			uriEncoded: '%E2%98%9D',
			utf8: '0xE2 0x98 0x9D',
			utf16: '0x261D',
			utf32: '0x0000261D',
			utf8HexBytes: ['E2', '98', '9D'],
			utf8DecBytes: [226, 152, 157],
		},
		{
			character: '🏾',
			name: 'EMOJI MODIFIER FITZPATRICK TYPE-5',
			codepoint: 'U+1F3FE',
			block: 'Miscellaneous Symbols and Pictographs',
			plane: 'SMP',
			category: 'Modifier Symbol (Sk)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#127998;', '&#x1F3FE;'],
			uriEncoded: '%F0%9F%8F%BE',
			utf8: '0xF0 0x9F 0x8F 0xBE',
			utf16: '0xD83C 0xDFFE',
			utf32: '0x0001F3FE',
			utf8HexBytes: ['F0', '9F', '8F', 'BE'],
			utf8DecBytes: [240, 159, 143, 190],
		},
	],
	'%E2%9C%93': [
		{
			character: '✓',
			name: 'CHECK MARK',
			codepoint: 'U+2713',
			block: 'Dingbats',
			plane: 'BMP',
			category: 'Other Symbol (So)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#10003;', '&#x2713;', '&checkmark;'],
			uriEncoded: '%E2%9C%93',
			utf8: '0xE2 0x9C 0x93',
			utf16: '0x2713',
			utf32: '0x00002713',
			utf8HexBytes: ['E2', '9C', '93'],
			utf8DecBytes: [226, 156, 147],
		},
	],
	'%20': [
		{
			character: ' ',
			name: 'SPACE',
			codepoint: 'U+0020',
			block: 'Basic Latin',
			plane: 'BMP',
			category: 'Space Separator (Zs)',
			bidirectionalClass: 'White Space (WS)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#32;', '&#x20;'],
			uriEncoded: '%20',
			utf8: '0x20',
			utf16: '0x0020',
			utf32: '0x00000020',
			utf8HexBytes: ['20'],
			utf8DecBytes: [32],
		},
	],
	'%C3%A0': [
		{
			character: 'à',
			name: 'LATIN SMALL LETTER A WITH GRAVE',
			codepoint: 'U+00E0',
			block: 'Latin-1 Supplement',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#224;', '&#xE0;', '&agrave;'],
			uriEncoded: '%C3%A0',
			utf8: '0xC3 0xA0',
			utf16: '0x00E0',
			utf32: '0x000000E0',
			utf8HexBytes: ['C3', 'A0'],
			utf8DecBytes: [195, 160],
		},
	],
	l: [
		{
			character: 'l',
			name: 'LATIN SMALL LETTER L',
			codepoint: 'U+006C',
			block: 'Basic Latin',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#108;', '&#x6C;'],
			uriEncoded: '%6C',
			utf8: '0x6C',
			utf16: '0x006C',
			utf32: '0x0000006C',
			utf8HexBytes: ['6C'],
			utf8DecBytes: [108],
		},
	],
	a: [
		{
			character: 'a',
			name: 'LATIN SMALL LETTER A',
			codepoint: 'U+0061',
			block: 'Basic Latin',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#97;', '&#x61;'],
			uriEncoded: '%61',
			utf8: '0x61',
			utf16: '0x0061',
			utf32: '0x00000061',
			utf8HexBytes: ['61'],
			utf8DecBytes: [97],
		},
	],
	m: [
		{
			character: 'm',
			name: 'LATIN SMALL LETTER M',
			codepoint: 'U+006D',
			block: 'Basic Latin',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#109;', '&#x6D;'],
			uriEncoded: '%6D',
			utf8: '0x6D',
			utf16: '0x006D',
			utf32: '0x0000006D',
			utf8HexBytes: ['6D'],
			utf8DecBytes: [109],
		},
	],
	o: [
		{
			character: 'o',
			name: 'LATIN SMALL LETTER O',
			codepoint: 'U+006F',
			block: 'Basic Latin',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#111;', '&#x6F;'],
			uriEncoded: '%6F',
			utf8: '0x6F',
			utf16: '0x006F',
			utf32: '0x0000006F',
			utf8HexBytes: ['6F'],
			utf8DecBytes: [111],
		},
	],
	d: [
		{
			character: 'd',
			name: 'LATIN SMALL LETTER D',
			codepoint: 'U+0064',
			block: 'Basic Latin',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#100;', '&#x64;'],
			uriEncoded: '%64',
			utf8: '0x64',
			utf16: '0x0064',
			utf32: '0x00000064',
			utf8HexBytes: ['64'],
			utf8DecBytes: [100],
		},
	],
	e: [
		{
			character: 'e',
			name: 'LATIN SMALL LETTER E',
			codepoint: 'U+0065',
			block: 'Basic Latin',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#101;', '&#x65;'],
			uriEncoded: '%65',
			utf8: '0x65',
			utf16: '0x0065',
			utf32: '0x00000065',
			utf8HexBytes: ['65'],
			utf8DecBytes: [101],
		},
	],
	'%E2%88%91': [
		{
			character: '∑',
			name: 'N-ARY SUMMATION',
			codepoint: 'U+2211',
			block: 'Mathematical Operators',
			plane: 'BMP',
			category: 'Math Symbol (Sm)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: true,
			htmlEntities: ['&#8721;', '&#x2211;', '&sum;'],
			uriEncoded: '%E2%88%91',
			utf8: '0xE2 0x88 0x91',
			utf16: '0x2211',
			utf32: '0x00002211',
			utf8HexBytes: ['E2', '88', '91'],
			utf8DecBytes: [226, 136, 145],
		},
	],
	'%C3%9F': [
		{
			character: 'ß',
			name: 'LATIN SMALL LETTER SHARP S',
			codepoint: 'U+00DF',
			block: 'Latin-1 Supplement',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#223;', '&#xDF;', '&szlig;'],
			uriEncoded: '%C3%9F',
			utf8: '0xC3 0x9F',
			utf16: '0x00DF',
			utf32: '0x000000DF',
			utf8HexBytes: ['C3', '9F'],
			utf8DecBytes: [195, 159],
		},
	],
	'%C3%A5': [
		{
			character: 'å',
			name: 'LATIN SMALL LETTER A WITH RING ABOVE',
			codepoint: 'U+00E5',
			block: 'Latin-1 Supplement',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#229;', '&#xE5;', '&aring;'],
			uriEncoded: '%C3%A5',
			utf8: '0xC3 0xA5',
			utf16: '0x00E5',
			utf32: '0x000000E5',
			utf8HexBytes: ['C3', 'A5'],
			utf8DecBytes: [195, 165],
		},
	],
	'%C5%93': [
		{
			character: 'œ',
			name: 'LATIN SMALL LIGATURE OE',
			codepoint: 'U+0153',
			block: 'Latin Extended-A',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#339;', '&#x153;', '&oelig;'],
			uriEncoded: '%C5%93',
			utf8: '0xC5 0x93',
			utf16: '0x0153',
			utf32: '0x00000153',
			utf8HexBytes: ['C5', '93'],
			utf8DecBytes: [197, 147],
		},
	],
	'%E2%89%88': [
		{
			character: '≈',
			name: 'ALMOST EQUAL TO',
			codepoint: 'U+2248',
			block: 'Mathematical Operators',
			plane: 'BMP',
			category: 'Math Symbol (Sm)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: true,
			htmlEntities: ['&#8776;', '&#x2248;', '&TildeTilde;'],
			uriEncoded: '%E2%89%88',
			utf8: '0xE2 0x89 0x88',
			utf16: '0x2248',
			utf32: '0x00002248',
			utf8HexBytes: ['E2', '89', '88'],
			utf8DecBytes: [226, 137, 136],
		},
	],
	'%E2%88%86': [
		{
			character: '∆',
			name: 'INCREMENT',
			codepoint: 'U+2206',
			block: 'Mathematical Operators',
			plane: 'BMP',
			category: 'Math Symbol (Sm)',
			bidirectionalClass: 'Other Neutral (ON)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#8710;', '&#x2206;'],
			uriEncoded: '%E2%88%86',
			utf8: '0xE2 0x88 0x86',
			utf16: '0x2206',
			utf32: '0x00002206',
			utf8HexBytes: ['E2', '88', '86'],
			utf8DecBytes: [226, 136, 134],
		},
	],
	c: [
		{
			character: 'c',
			name: 'LATIN SMALL LETTER C',
			codepoint: 'U+0063',
			block: 'Basic Latin',
			plane: 'BMP',
			category: 'Lowercase Letter (Ll)',
			bidirectionalClass: 'Left To Right (L)',
			combiningClass: 'Not Reordered (0)',
			isMirrored: false,
			htmlEntities: ['&#99;', '&#x63;'],
			uriEncoded: '%63',
			utf8: '0x63',
			utf16: '0x0063',
			utf32: '0x00000063',
			utf8HexBytes: ['63'],
			utf8DecBytes: [99],
		},
	],
};
