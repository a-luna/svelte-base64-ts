export const whatIsBase64 = [
	`Some systems, such as SMTP, are only capable of understanding data that is comprised of 7-bit US-ASCII characters. Since these systems are still widely used today, in order to receive/store data in binary octets (e.g., attach a photo to an email message), the data must be encoded entirely to ASCII characters.`,
	`The name Base64 refers to the fact that each encoded character stores 6 bits of data (2<sup>6</sup> = 64). Thus, the base64 "alphabet" consists of 64 ASCII characters.`,
];

export const whatIsntBase64 = [
	`<strong>Base64 is not a method to encrypt or compress data</strong>. In fact, encoded data is exactly 1.333... times larger than the original data.`,
	`This sacrifice in bandwidth required to send and receive data is only necessary when communicating with legacy systems that only understand 7-bit ASCII data.`,
];

export const whatIsBase64Standard = [
	`While there are two popular base64 alphabets, they are nearly identical. Both alphabets begin with uppercase letters A-Z (26 characters), followed by lowercase letters a-z (26 characters), followed by numbers 0-9 (10 characters).`,
	`These 62 characters are the same in both alphabets. In standard base64 encoding (referred to as <code>base64</code>), letter 63 is the <code>+</code> (plus) character and letter 64 is the <code>/</code> character (forward-slash).`,
];

export const whatIsBase64Url = [
	`Base64 is widely used in HTTP requests/responses, where the <code>+</code> and <code>/</code> characters have conflicting meanings (e.g., URL parsing, file paths), an alternative base64 alphabet that is URL and filename-safe was created.`,
	`In this alphabet (usually referred to as <code>base64url</code>), letter 63 is the <code>-</code> (minus) character and letter 64 is the <code>_</code> character (underscore).`,
];

export const stringInputEncoding1 = [
	`To begin, you must specify the format of the data that you wish to encode. The value you provide will be validated to ensure it is a valid ASCII, hex or binary string.`,
	`If you are providing a ASCII (text) string, <strong>it can only contain characters in the printable range of the ASCII table (<code>0x20</code> - <code>0x7E</code>).</strong>`,
	`This range includes the space character, all letters and numbers as well as most punctuation characters.`,
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
