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
	'The standard Base64 alphabet consists of uppercase letters A-Z (26 characters), lowercase letters a-z (26 characters), and numbers 0-9 (10 characters).',
	'These three groups provide 62 of the necessary 64 characters. In standard Base64 encoding, letter 63 is the <code>+</code> (plus) character and letter 64 is the <code>/</code> (forward-slash) character.',
];

export const whatIsBase64Url = [
	'Base64 is often used with HTTP requests and responses. Using the <code>+</code> and <code>/</code> characters can wreak havoc in this context (e.g., URL parsing, file paths).',
	'In these contexts, you should use the URL and filename-safe version of the Base64 alphabet (usually referred to as <code>base64url</code>), where letter 63 is the <code>-</code> (minus) character and letter 64 is the <code>_</code> (underscore) character.',
];

export const stringInputEncoding1 = [
	'This demo allows you to encode ASCII (text), hex or binary data to Base64 and illustrates every step of the process.',
	'Please select either <strong>ASCII</strong>, <strong>hex</strong> or <strong>bin</strong> from the dropdown menu labeled <strong>Text Encoding</strong> to specify the format of the string you have provided.',
];

export const stringInputEncoding2 = [
	'If you are providing a ASCII (text) string, <strong>it can only contain characters in the printable range of the ASCII table (<code>0x20</code> - <code>0x7E</code>)</strong>. Which includes most punctuation characters, the space character and all alphanumeric characters.',
];

export const stringInputEncoding3a = [
	'If you are providing a hex string, it can be provided in any of the formats below:',
];

export const hexStringFormats = [
	['14590ACF', 'numbers 0-9 and letters A-F'],
	['23678bde', 'numbers 0-9 and letters a-f'],
	['0x1490AF', 'prefixed with "0x"'],
	['12 78 AB EF', 'bytes separated by spaces'],
];

export const stringInputEncoding3b = [
	'Additionally, your hex string must contain an even number of digits in order to be encoded, otherwise you would be missing the last 4 bits of the last byte.',
];

export const stringInputEncoding4 = [
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
		]
	},
	{
		title: 'Base64 (wikipedia.com)',
		url: 'https://en.wikipedia.org/wiki/Base64',
		description: [
			'The wikipedia article for Base64 covers a much larger number of subjects than RFC 4648, including the use of Base64 encoding with UTF-7, OpenPGP, MIME, and several other examples of practical uses for Base64 encoding.',
		]
	}
]