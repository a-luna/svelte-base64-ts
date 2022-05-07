<script lang="ts">
	import type { B64EncodingMachineState } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let label: string = '';
	export let labelPosition: 'above' | 'below' = 'above';
	export let tooltip: string = '';
	export let buttonNumber: number;
	export let iconWidth: string = '11px';
	export let disabled = false;
	export let buttonGridStyle = '';
	export let labelGridStyle = '';
	export let state: B64EncodingMachineState;
	let hovering = false;

	$: showLabel = state
		? !$state.context.autoplay && ($state.matches('inactive') || $state.matches({ validateInputText: 'error' }))
		: false;
	$: labelStyle = labelGridStyle || `grid-column: ${buttonNumber} / span 1; grid-row: 1 / span 1;`;
	$: butttonStyle = buttonGridStyle || `grid-column: ${buttonNumber} / span 1; grid-row: 2 / span 1;`;
</script>

{#if labelPosition === 'above' && (showLabel || hovering)}
	<span transition:fade class="form-label" style={labelStyle}>{label}</span>
{/if}
<button
	type="button"
	title={tooltip}
	style={butttonStyle}
	{disabled}
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	on:click
>
	<div class="icon" style="width: {iconWidth}">
		<slot />
	</div>
</button>
{#if labelPosition === 'below' && (showLabel || hovering)}
	<span transition:fade class="form-label" style={labelStyle}>{label}</span>
{/if}

<style lang="postcss">
	.form-label {
		margin: 0 0 0.5rem 0;
	}
</style>
