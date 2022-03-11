<script lang="ts">
	import type { ButtonColor } from '$lib/types';
	import { HslColor } from '$lib/types';

	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let color: ButtonColor = 'blue';
	export let tooltip: string = '';
	export let selected: boolean = false;
	export let isStateful: boolean = false;
	let bgHslColor = HslColor.fromString('hsl(0 0% 0%)');
	const bgColorCssPropName = `--bg-color-${color}`;
	const fgColorCssPropName = `--fg-color-on-${color}`;

	$: buttonSize = size === 'sm' ? 27 : size === 'md' ? 48 : 72;
	$: iconSize = size === 'sm' ? 13 : size === 'md' ? 24 : 36;
	$: padding = size === 'sm' ? 6 : size === 'md' ? 12 : 18;
	$: padAdjust = size === 'sm' ? 0 : size === 'md' ? 2 : 0;
	$: if (typeof window !== 'undefined')
		bgHslColor = HslColor.fromString(getCSSPropValue(document.body, bgColorCssPropName));
	$: bgHslaColor = `hsla(${bgHslColor.hue}deg ${bgHslColor.saturation}% ${bgHslColor.lightness}% / 0.15)`;

	const getCSSPropValue = (element: HTMLElement, propName: string): string =>
		getComputedStyle(element).getPropertyValue(propName);

	function handleClick() {
		if (isStateful) {
			selected = !selected;
		}
	}
</script>

<button
	on:mouseenter
	on:mouseleave
	on:click
	on:click={() => handleClick()}
	class:active={selected}
	class="btn-{color}"
	title={tooltip}
	style="--bg: var({bgColorCssPropName}); --bg-transparent: {bgHslaColor}; --fg: var({fgColorCssPropName}); width: {buttonSize}px; height: {buttonSize}px; padding: {padding -
		padAdjust}px {padding}px {padding - padAdjust}px; transition: background 0.2s"
>
	<div class="icon" style="width: {iconSize}px; height: {iconSize}px; margin: auto">
		<slot />
	</div>
</button>

<style lang="postcss">
	button {
		display: flex;
		color: var(--bg);
		background: var(--bg-transparent);
		border: 1px solid var(--bg);
		border-radius: 9999px;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		overflow: hidden;
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 500;
		letter-spacing: 0.025em;
		text-transform: uppercase;
		white-space: nowrap;
		align-items: center;
		max-width: max-content;
		cursor: pointer;
		margin: 0;
	}

	button:hover,
	button.active,
	button.active:hover {
		color: var(--fg);
		background: var(--bg);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	button:focus {
		outline: none;
	}

	.icon {
		font-weight: 700;
		letter-spacing: 0.05em;
		line-height: 1;
	}
</style>
