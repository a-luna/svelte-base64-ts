<script lang="ts">
	import type { XStateMachineState } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let action: EncodingEvent;
	export let label: string = '';
	export let tooltip: string = '';
	export let buttonNumber: number;
	export let iconWidth: string = '11px';
	export let disabled = false;
	export let buttonGridStyle = '';
	export let labelGridStyle = '';
	export let state: XStateMachineState;
	let hovering = false;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: EncodingEvent } }>();

	$: showLabel = state
		? !$state.context.autoplay && ($state.matches('inactive') || $state.matches({ validateInputText: 'error' }))
		: false;
	$: butttonStyle = buttonGridStyle || `grid-column: ${buttonNumber} / span 1; grid-row: 2 / span 1;`;
	$: labelStyle = labelGridStyle || `grid-column: ${buttonNumber} / span 1; grid-row: 1 / span 1;`;
</script>

{#if showLabel || hovering}
	<span transition:fade class="form-label" style={labelStyle}>{label}</span>
{/if}
<button
	type="button"
	title={tooltip}
	style={butttonStyle}
	{disabled}
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action })}
>
	<div class="icon" style="width: {iconWidth}">
		<slot />
	</div>
</button>

<style lang="postcss">
	.form-label {
		margin: 0 0 0.5rem 0;
	}
</style>
