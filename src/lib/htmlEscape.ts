const escapeHash = {
	_: function (input: string): string {
		let ret = escapeHash[input] as string;
		if (!ret) {
			if (input.length - 1) {
				ret = String.fromCharCode(parseInt(input.substring(input.length - 3 ? 2 : 1)));
			} else {
				const code = input.charCodeAt(0);
				ret =
					code < 256
						? '%' + ('0' + code.toString(16)).slice(-2).toUpperCase()
						: '%u' + ('000' + code.toString(16)).slice(-4).toUpperCase();
			}
			escapeHash[ret] = input;
			escapeHash[input] = ret;
		}
		return ret;
	},
};

export const escape = (str: string): string =>
	str.toString().replace(/[^\w @\\*\-\\+\\.\\/]/g, (aChar) => escapeHash._(aChar));

export const unescape = (str: string): string =>
	str.toString().replace(/%(u[\da-f]{4}|[\da-f]{2})/gi, (seq) => escapeHash._(seq));
