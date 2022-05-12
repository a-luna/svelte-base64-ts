import type { HslColor } from './types';

const HSL_REGEX =
	/^hsl\((((?<hueDeg>(([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(?<hueTurn>0|0?\.\d+)turn|(?<hueRad>(([0-6](\.\d+)?)|(\.\d+)))rad)((,\s?(?<satPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(,\s?(?<lightPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)|(\s(?<satPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(\s(?<lightPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;

const HSLA_REGEX =
	/^hsla\((((?<hueDeg>(([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(?<hueTurn>0|0?\.\d+)turn|(?<hueRad>(([0-6](\.\d+)?)|(\.\d+)))rad)(((,\s?(?<satPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(,\s?(?<lightPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%),\s?)|((\s(?<satPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(\s(?<lightPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\s\/\s))((?<alphaFloatA>0?\.\d+)|(?<alphaFloatB>[01])|(?<alphaPerc>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;

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
}

function parseHsl(match: RegExpExecArray, hasAlpha: boolean): Hsl {
	console.log({ match });

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
