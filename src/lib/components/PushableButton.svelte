<script lang="ts">
	import { Hsl, parseHslColorFromString } from '$lib/hsl';
	import { app } from '$lib/stores/app';
	import type { ButtonColor, ButtonSize } from '$lib/types';
	import { getCSSPropValue } from '$lib/util';

	export let size: ButtonSize = 'sm';
	export let color: ButtonColor = 'blue';
	export let disabled = false;
	export let width = 'auto';
	export let testid: string = null;
	let bgColor: Hsl;
	let edgeGradient = '';

	$: fontSize = size === 'xs' ? '0.75rem' : size === 'sm' ? '0.85rem' : size === 'md' ? '1rem' : '1.2rem';
	$: priColor = $app.encoderMode ? 'teal' : 'green';
	$: secColor = $app.encoderMode ? 'pink' : 'indigo';
	$: colorName = color === 'pri' ? priColor : color === 'sec' ? secColor : color;
	$: fgColorCssPropName = disabled ? '--button-disabled-text-color' : `--fg-color-on-${colorName}`;
	$: bgColorCssPropName = disabled ? '--button-disabled-bg-color' : `--bg-color-${colorName}`;
	$: if (typeof window !== 'undefined')
		bgColor = parseHslColorFromString(getCSSPropValue(document.body, bgColorCssPropName));
	$: if (bgColor)
		edgeGradient = `linear-gradient(to left, hsl(${bgColor.hue}deg ${bgColor.saturation}% 16%) 0%, hsl(${bgColor.hue}deg ${bgColor.saturation}% 32%) 8%, hsl(${bgColor.hue}deg ${bgColor.saturation}% 32%) 92%, hsl(${bgColor.hue}deg ${bgColor.saturation}% 16%) 100%)`;
</script>

<button {disabled} class="pushable" style="font-size: {fontSize}; width: {width}" data-testid={testid} on:click>
	<span class="shadow" />
	<span class="edge" style="background: {edgeGradient}" />
	<span class="front" style="color: var({fgColorCssPropName}); background: var({bgColorCssPropName})">
		<slot />
	</span>
</button>

<style lang="postcss">
	.pushable {
		position: relative;
		border: none;
		background: transparent;
		padding: 0;
		cursor: pointer;
		outline-offset: 4px;
		transition: filter 600ms;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		margin: 0;
	}
	.shadow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 6px;
		background: hsl(0deg 0% 0% / 0.25);
		will-change: transform;
		transform: translateY(2px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
		filter: blur(4px);
	}
	.edge {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 6px;
	}
	.front {
		display: block;
		position: relative;
		padding: 0.6em 1.5em;
		border-radius: 6px;
		font-size: 1em;
		font-weight: 700;
		line-height: 1;
		letter-spacing: 0.8px;
		will-change: transform;
		transform: translateY(-4px);
		transition: transform 400ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}
	.pushable:hover {
		transition: filter 250ms;
		filter: brightness(110%);
	}
	.pushable:hover .front {
		transform: translateY(-6px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	.pushable:hover .shadow {
		transform: translateY(4px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	.pushable:active .front {
		transform: translateY(-2px);
		transition: transform 34ms;
	}
	.pushable:active .shadow {
		transform: translateY(1px);
		transition: transform 34ms;
	}
	.pushable:focus:not(:focus-visible) {
		outline: none;
	}
	.pushable:disabled {
		cursor: default;
		filter: none;
	}
	.pushable:disabled .front {
		transform: none;
	}
</style>
