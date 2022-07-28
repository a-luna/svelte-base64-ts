export const whyBase641 = [
	'Many application-level protocols, such as those used for email and web access, are character-based.',
	'Although these protocols exchange bytes, those bytes are assumed to be restricted to a limited set of characters that are printable or contain print instructions. Such characters use only the low-order 7 bits in each 8-bit byte.',
];

export const whyBase642 = [
	'This is fine when the applications are exchanging simple, printable text. But it does not allow the protocols to exchange binary files such as images, audio clips, or executables.',
	'These files use all 8 bits of each byte, and any attempt to treat them as printable text would result in corruption as the top bit of each byte was discarded.',
];

export const whatIsBase64 = [
	'Base64 is a way to encode binary data into an ASCII character set in order to transmit the data without loss or modification.',
	'The name refers to the fact that each encoded character stores 6 bits of data (2<sup>6</sup> = 64). Thus, the Base64 "alphabet" consists of 64 ASCII characters.',
];

export const whatIsntBase64 = [
	'<strong>Base64 is not a method to encrypt or compress data</strong>. In fact, encoded data is at least 1.<span style="text-decoration: overline;">3</span> times larger than the original data.',
	'This bloated message size is a necessary tradeoff in order to exchange binary files with systems that only understand character-based data.',
];

export const whatIsBase64Standard = [
	'The standard Base64 alphabet consists of uppercase letters <code>A-Z</code> (26 characters), lowercase letters <code>a-z</code> (26 characters), and numbers <code>0-9</code> (10 characters).',
	'These three groups provide 62 of the necessary 64 characters. In standard Base64 encoding, letter 63 is the <code>+</code> (plus) character and letter 64 is the <code>/</code> (forward-slash) character.',
];

export const whatIsBase64Url = [
	'Base64 is often used with HTTP requests and responses. Using the <code>+</code> and <code>/</code> characters can wreak havoc in this context (e.g., URL parsing, file paths).',
	'In these contexts, you should use the URL and filename-safe version of the Base64 alphabet (usually referred to as <code>base64url</code>), where letter 63 is the <code>-</code> (minus) character and letter 64 is the <code>_</code> (underscore) character.',
];

export const stringInputEncoding1 = [
	`Having a firm grasp of the structure and purpose of your data is vital to ensuring that a recipient is able to decode the data back to its original form.`,
	'Generally speaking, Base64 is used to encode either textual data (e.g., data typed into a form on a webpage) or binary data (e.g., a file attached to an email).',
];

export const stringInputEncoding2 = [
	'If you are encoding text, please select either <span class="b64">ASCII</span> or <span class="b64">UTF-8</span> from the <strong>Text Encoding</strong> menu.',
	'If you are encoding binary data, please select either <span class="b64">hex</span> or <span class="b64">bin</span>.',
];

export const stringInputEncodingAscii = [
	'If you are providing a ASCII (text) string, <strong>it can only contain characters in the printable range of the ASCII table (<code>0x20</code> - <code>0x7E</code>)</strong>. Which includes most punctuation characters, the space character and all alphanumeric characters.',
];

export const stringInputEncodingUTF81 = [
	'If you are encoding text that contains characters outside of the ASCII range (e.g., non-english names/words, mathemetical symbols, emojis, etc) please select <span class="b64">UTF-8</span> as the <strong>Text Encoding</strong> value.',
	'Examples of valid UTF-8 strings:',
];

export const stringInputEncodingUTF82 = ['✓ à la mode', '∑ßåœ ≈ ∆c', '日本語文字列', '🌭🌧😩🧺'];

export const stringInputEncodingHex1 = [
	'If you are providing a hex string, it can be provided in any of the formats below:',
];

export const hexStringFormats = [
	['14590ACF', 'numbers 0-9 and letters A-F'],
	['23678bde', 'numbers 0-9 and letters a-f'],
	['0x1490AF', 'prefixed with "0x"'],
	['12 78 AB EF', 'bytes separated by spaces'],
];

export const stringInputEncodingHex2 = [
	'Additionally, your hex string must contain an even number of digits in order to be encoded, otherwise you would be missing the last 4 bits of the last byte.',
];

export const stringInputEncodingBinary = [
	'If you are providing a binary string, it must meet both of the requirements below:',
];

export const binStringFormats = [
	'Must consist of only zero (<code>0</code>) and one (<code>1</code>) characters.',
	'The length of the string must be divisible by 8',
];

export const base64OutputEncoding = [
	'The <strong>Output Encoding</strong> dropdown menu allows you to choose which Base64 alphabet to use for creating the final, encoded string.',
	'By default, the Standard Base64 alphabet is used (<span class="b64">base64</span> in the dropdown menu). Selecting <span class="b64">base64url</span> will use the Base64 URL/filename-safe alphabet.',
];

export const references = [
	{
		title: 'RFC 4648: The Base16, Base32, and Base64 Data Encodings',
		url: 'https://datatracker.ietf.org/doc/html/rfc4648',
		description: [
			'<span class="emphasis">RFC 4648</span> is the specification for Base64 encoding (also Base32 and Base16 encodings, but these are rarely used). This document defines the standard and URL-safe alphabets used in this demonstration, as well as the algorithm for encoding 8-bit bytes to 6-bit ASCII characters.',
		],
	},
	{
		title: 'Base64 (wikipedia.com)',
		url: 'https://en.wikipedia.org/wiki/Base64',
		description: [
			'The wikipedia article for Base64 covers a much larger number of subjects than RFC 4648, including the use of Base64 encoding with UTF-7, OpenPGP, MIME, and several other examples of practical uses for Base64 encoding.',
		],
	},
];
