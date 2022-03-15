export const whatIsBase64 = [
	`<span class="b64">base64</span> is a way to encode binary data into an ASCII character set in order to transmit the data without loss or modification.`,
	`The name <span class="b64">base64</span> refers to the fact that each encoded character stores 6 bits of data (2<sup>6</sup> = 64). Thus, the <span class="b64">base64</span> "alphabet" consists of 64 ASCII characters.`,
];

export const whyBase64 = [
	`When email systems were created, all data was completely text-based. Eventually, the need to attach images or other file types to email messages arose.`,
	`The most obvious problem with binary data is that it can contain NULL bytes, which a text-based system will interpret as a command to stop reading the data.`,
	`This prevents the file from being fully read and results in corrupt data.`,
];

export const whatIsntBase64 = [
	`<strong>base64 is not a method to encrypt or compress data</strong>. In fact, encoded data is exactly 1.333... times larger than the original data.`,
	`This sacrifice in bandwidth is necessary when communicating with systems that only understand 7-bit ASCII data.`,
];

export const whatIsBase64Standard = [
	`The standard <span class="b64">base64</span> alphabet consists of all uppercase letters A-Z (26 characters), all lowercase letters a-z (26 characters), and all numbers 0-9 (10 characters).`,
	`These three groups provide 62 of the necessary 64 characters. In standard <span class="b64">base64</span> encoding, letter 63 is the <code>+</code> (plus) character and letter 64 is the <code>/</code> character (forward-slash).`,
];

export const whatIsBase64Url = [
	`<span class="b64">base64</span> is often used with HTTP requests and responses. Using the <code>+</code> and <code>/</code> characters can wreak havoc in this context (e.g., URL parsing, file paths).`,
	`In these contexts, you should use the URL and filename-safe version of the <span class="b64">base64</span> alphabet (usually referred to as <code>base64url</code>), where letter 63 is the <code>-</code> (minus) character and letter 64 is the <code>_</code> character (underscore).`,
];

export const stringInputEncoding1 = [
	`This demo allows you to encode ASCII (text), hex or binary data to <span class="b64">base64</span> and illustrates every step of the process.`,
	`If you are providing a ASCII (text) string, <strong>it can only contain characters in the printable range of the ASCII table (<code>0x20</code> - <code>0x7E</code>)</strong>. Which includes most punctuation characters, the space character and all alphanumeric characters.`,
];

export const stringInputEncoding2a = [
	`If you are providing a hex string, it can be provided in any of the formats below:`,
];

export const hexStringFormats = [
	[`14590ACF`, 'numbers 0-9 and letters A-F'],
	[`23678bde`, 'numbers 0-9 and letters a-f'],
	[`0x1490AF`, 'prefixed with "0x"'],
	[`12 78 AB EF`, 'bytes separated by spaces'],
];

export const stringInputEncoding2b = [
	`Additionally, your hex string must contain an even number of bytes in order to be encoded.`,
];

export const stringInputEncoding3 = [
	`If you are providing a binary string, it must meet both of the requirements below:`,
];

export const binStringFormats = [
	'Must consist of only zero (<code>0</code>) and one (<code>1</code>) characters.',
	'The length of the string must be divisible by 8',
];

export const base64OutputEncoding = [
	`The dropdown menu to the left of the navigational buttons controls the flavor of <span class="b64">base64</span> that is produced.`,
	`By default, standard <span class="b64">base64</span> encoding is used. Selecting <span class="b64">base64url</span> will use the URL/filename-safe alphabet.`,
];
