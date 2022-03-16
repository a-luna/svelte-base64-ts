export const whyBase64 = [
	'Many application-level protocols, such as those used for email and web access, are character-based.',
	'Although these protocols exchange bytes, those bytes are assumed to be restricted to a limited set of characters that are printable or contain print instructions. Such characters use only the low-order 7 bits in each 8-bit byte.',
	'This is fine when the applications are exchanging simple, printable text. But it does not allow the protocols to exchange binary files such as images, audio clips, or executables.',
];

export const whatIsBase64 = [
	'These files use all 8 bits of each byte, and any attempt to treat them as printable text would result in corruption as the top bit of each byte was discarded.',
	'Base64 is a way to encode binary data into an ASCII character set in order to transmit the data without loss or modification.',
	'The name refers to the fact that each encoded character stores 6 bits of data (2<sup>6</sup> = 64). Thus, the base64 "alphabet" consists of 64 ASCII characters.',
];

export const whatIsntBase64 = [
	'<strong>base64 is not a method to encrypt or compress data</strong>. In fact, encoded data is exactly 1.333... times larger than the original data.',
	'Since transmittting/receiving non-ASCII data with these protocols requires encoding to base64, this increased bandwidth is a necessary price to pay.',
];

export const whatIsBase64Standard = [
	'The standard base64 alphabet consists of all uppercase letters A-Z (26 characters), all lowercase letters a-z (26 characters), and all numbers 0-9 (10 characters).',
	'These three groups provide 62 of the necessary 64 characters. In standard base64 encoding, letter 63 is the <code>+</code> (plus) character and letter 64 is the <code>/</code> character (forward-slash).',
];

export const whatIsBase64Url = [
	'Base64 is often used with HTTP requests and responses. Using the <code>+</code> and <code>/</code> characters can wreak havoc in this context (e.g., URL parsing, file paths).',
	'In these contexts, you should use the URL and filename-safe version of the base64 alphabet (usually referred to as <code>base64url</code>), where letter 63 is the <code>-</code> (minus) character and letter 64 is the <code>_</code> character (underscore).',
];

export const stringInputEncoding1 = [
	'This demo allows you to encode ASCII (text), hex or binary data to base64 and illustrates every step of the process.',
	'If you are providing a ASCII (text) string, <strong>it can only contain characters in the printable range of the ASCII table (<code>0x20</code> - <code>0x7E</code>)</strong>. Which includes most punctuation characters, the space character and all alphanumeric characters.',
];

export const stringInputEncoding2a = [
	'If you are providing a hex string, it can be provided in any of the formats below:',
];

export const hexStringFormats = [
	['14590ACF', 'numbers 0-9 and letters A-F'],
	['23678bde', 'numbers 0-9 and letters a-f'],
	['0x1490AF', 'prefixed with "0x"'],
	['12 78 AB EF', 'bytes separated by spaces'],
];

export const stringInputEncoding2b = [
	'Additionally, your hex string must contain an even number of digits in order to be encoded, otherwise you would be missing the last 4 bits of the last byte.',
];

export const stringInputEncoding3 = [
	'If you are providing a binary string, it must meet both of the requirements below:',
];

export const binStringFormats = [
	'Must consist of only zero (<code>0</code>) and one (<code>1</code>) characters.',
	'The length of the string must be divisible by 8',
];

export const base64OutputEncoding = [
	'The dropdown menu to the left of the navigational buttons controls the flavor of base64 that is produced.',
	'By default, standard base64 encoding is used. Selecting <span class="b64">base64url</span> will use the URL/filename-safe alphabet.',
];
