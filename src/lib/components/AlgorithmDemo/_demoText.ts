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
	`Since base64 is widely used in HTTP requests/responses and these two characters have different meanings when used in the context of URL parsing/file paths, an alternative base64 alphabet that is URL and filename-safe was created.`,
];

export const whatIsBase64Url = [
	`In the url and filename-safe base64 encoding (usually referred to as <code>base64url</code>), letter 63 is the <code>-</code> (minus) character and letter 64 is the <code>_</code> character (underscore).`,
	`You can choose either base64 or base64url encodings from the dropdown menu to the right of the navigational buttons.`,
];
