export interface HslColor {
	toString: () => string;
	changeHue: (hue: number) => HslColor;
	changeSaturation: (dim: number) => HslColor;
	changeLightness: (dim: number) => HslColor;
	changeAlpha: (alpha: number) => HslColor;
}
