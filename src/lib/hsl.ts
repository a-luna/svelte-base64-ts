import type { HslColor, Result } from '$lib/types';

interface RgbColor {
	r: number;
	g: number;
	b: number;
	a: number;
}
const decimalToOpacityValue = (decimal: number): number => parseFloat((decimal / 255).toFixed(2));

const HSL_REGEX =
	/^hsl\((((?<hueDeg>(([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(?<hueTurn>0|0?\.\d+)turn|(?<hueRad>(([0-6](\.\d+)?)|(\.\d+)))rad)((,\s?(?<satPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(,\s?(?<lightPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)|(\s(?<satPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(\s(?<lightPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;

const HSLA_REGEX =
	/^hsla\((((?<hueDeg>(([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(?<hueTurn>0|0?\.\d+)turn|(?<hueRad>(([0-6](\.\d+)?)|(\.\d+)))rad)(((,\s?(?<satPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(,\s?(?<lightPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%),\s?)|((\s(?<satPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(\s(?<lightPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\s\/\s))((?<alphaFloatA>0?\.\d+)|(?<alphaFloatB>[01])|(?<alphaPerc>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;

const HEX_REGEX =
	/^#((?<redHexA>[\da-f])(?<greenHexA>[\da-f])(?<blueHexA>[\da-f]))$|^#((?<redHexB>[\da-f])(?<redHexC>[\da-f])(?<greenHexB>[\da-f])(?<greenHexC>[\da-f])(?<blueHexB>[\da-f])(?<blueHexC>[\da-f]))$/i;

const HEXA_REGEX =
	/^#((?<redHexA>[\da-f])(?<greenHexA>[\da-f])(?<blueHexA>[\da-f])(?<alphaHexA>[\da-f]))$|^#((?<redHexB>[\da-f])(?<redHexC>[\da-f])(?<greenHexB>[\da-f])(?<greenHexC>[\da-f])(?<blueHexB>[\da-f])(?<blueHexC>[\da-f])(?<alphaHexB>[\da-f])(?<alphaHexC>[\da-f]))$/i;

export class Hsl implements HslColor {
	constructor(public hue: number, public saturation: number, public lightness: number, public alpha: number) {}
	public toString = (): string =>
		`hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha.toPrecision(2)})`;
	public changeHue = (hue: number): Hsl => new Hsl(hue, this.saturation, this.lightness, this.alpha);
	public changeSaturation = (dim: number): Hsl =>
		new Hsl(this.hue, Math.floor(this.saturation * dim), this.lightness, this.alpha);
	public changeLightness = (dim: number): Hsl =>
		new Hsl(this.hue, this.saturation, Math.floor(this.lightness * dim), this.alpha);
	public changeAlpha = (alpha: number): Hsl => new Hsl(this.hue, this.saturation, this.lightness, alpha);
}

export function parseHslColorFromString(s: string): Hsl {
	let match = HSL_REGEX.exec(s.trim());
	if (match) {
		return parseHsl(match, false);
	}
	match = HSLA_REGEX.exec(s.trim());
	if (match) {
		return parseHsl(match, true);
	}
	match = HEX_REGEX.exec(s.trim());
	if (match) {
		return parseHslFromHex(match, false);
	}
	match = HEXA_REGEX.exec(s.trim());
	if (match) {
		return parseHslFromHex(match, true);
	}
}

function parseHsl(match: RegExpExecArray, hasAlpha: boolean): Hsl {
	const hue = parseHue(match);
	const { s: saturation, l: lightness } = parseSaturationAndLightness(match);

	let alpha = 1;
	if (hasAlpha) {
		alpha = parseAlpha(match);
	}
	return new Hsl(hue, saturation, lightness, alpha);
}

function parseHue(match: RegExpExecArray): number {
	const hueDeg = match.groups.hueDeg;
	const hueRad = match.groups.hueRad;
	const hueTurn = match.groups.hueTurn;
	let hue: string;
	if (hueDeg) {
		hue = hueDeg;
	} else if (hueRad) {
		hue = (parseFloat(hueRad) * (180 / Math.PI)).toFixed(2);
	} else if (hueTurn) {
		hue = (parseFloat(hueTurn) * 360).toFixed(2);
	}
	return parseInt(hue);
}

function parseSaturationAndLightness(match: RegExpExecArray): { s: number; l: number } {
	const satPerc = match.groups.satPercA ?? match.groups.satPercB;
	const lightPerc = match.groups.lightPercA ?? match.groups.lightPercB;
	return { s: parseInt(satPerc), l: parseInt(lightPerc) };
}

function parseAlpha(match: RegExpExecArray): number {
	let alpha = match.groups.alphaFloatA ?? match.groups.alphaFloatB;
	if (!alpha) {
		alpha = (parseInt(match.groups.alphaPerc) / 100).toFixed(2);
	}
	return parseFloat(alpha);
}

function parseHslFromHex(match: RegExpExecArray, hasAlpha: boolean): Hsl {
	let result = parseHexCondensedFormat(match, hasAlpha);
	if (result.success) {
		return result.value;
	}
	result = parseHexFullFormat(match, hasAlpha);
	if (result.success) {
		return result.value;
	}
}

function parseHexCondensedFormat(match: RegExpExecArray, hasAlpha: boolean): Result<Hsl> {
	const redHex = match.groups.redHexA;
	const greenHex = match.groups.greenHexA;
	const blueHex = match.groups.blueHexA;
	if (!redHex || !greenHex || !blueHex) {
		return { success: false, error: Error('Hex color is not in the condensed format (#RGB or #RGBA)') };
	}
	let hsl: { h: number; s: number; l: number; a: number };
	const rgb = {
		r: parseInt(`${redHex}${redHex}`, 16),
		g: parseInt(`${greenHex}${greenHex}`, 16),
		b: parseInt(`${blueHex}${blueHex}`, 16),
		a: 255,
	};
	if (hasAlpha) {
		const alphaHex = match.groups.alphaHexA;
		rgb.a = parseInt(`${alphaHex}${alphaHex}`, 16);
		hsl = rgbaToHsla(rgb);
	} else {
		hsl = rgbToHsl(rgb);
	}
	return { success: true, value: new Hsl(hsl.h, hsl.s, hsl.l, hsl.a) };
}

function parseHexFullFormat(match: RegExpExecArray, hasAlpha: boolean): Result<Hsl> {
	const redHex1 = match.groups.redHexB;
	const redHex2 = match.groups.redHexC;
	const greenHex1 = match.groups.greenHexB;
	const greenHex2 = match.groups.greenHexC;
	const blueHex1 = match.groups.blueHexB;
	const blueHex2 = match.groups.blueHexC;
	if (!redHex1 || !redHex2 || !greenHex1 || !greenHex2 || !blueHex1 || !blueHex2) {
		return { success: false, error: Error('Hex color is not in the full format (#RRGGBB or #RRGGBBAA)') };
	}
	let hsl: { h: number; s: number; l: number; a: number };
	const rgb = {
		r: parseInt(`${redHex1}${redHex2}`, 16),
		g: parseInt(`${greenHex1}${greenHex2}`, 16),
		b: parseInt(`${blueHex1}${blueHex2}`, 16),
		a: 255,
	};
	if (hasAlpha) {
		const alphaHex1 = match.groups.alphaHexB;
		const alphaHex2 = match.groups.alphaHexC;
		rgb.a = parseInt(`${alphaHex1}${alphaHex2}`, 16);
		hsl = rgbaToHsla(rgb);
	} else {
		hsl = rgbToHsl(rgb);
	}
	return { success: true, value: new Hsl(hsl.h, hsl.s, hsl.l, hsl.a) };
}

export function rgbaToHsla(rgb: RgbColor): { h: number; s: number; l: number; a: number } {
	const hsl = rgbToHsl(rgb);
	return { ...hsl, a: decimalToOpacityValue(rgb.a) };
}

export function rgbToHsl(rgb: RgbColor): { h: number; s: number; l: number; a: number } {
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;
	const cmax = Math.max(r, g, b);
	const cmin = Math.min(r, g, b);
	const delta = cmax - cmin;

	const h = calculateHue(r, g, b, cmax, delta);
	const l = (cmax + cmin) / 2;
	const s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	return { h, s: parseInt((s * 100).toFixed(1)), l: parseInt((l * 100).toFixed(1)), a: 1 };
}

function calculateHue(r: number, g: number, b: number, cmax: number, delta: number): number {
	let h: number;
	if (delta === 0) {
		h = 0;
	} else if (cmax === r) {
		h = ((g - b) / delta) % 6;
	} else if (cmax === g) {
		h = (b - r) / delta + 2;
	} else if (cmax === b) {
		h = (r - g) / delta + 4;
	}
	h = Math.round(h * 60);
	return h >= 0 ? h : h + 360;
}
