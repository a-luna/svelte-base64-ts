<script lang="ts">
	import Base64EncodeDemo from '$lib/components/AlgorithmDemo/Base64EncodeDemo/Base64EncodeDemo.svelte';
	import { createDemoStateStore, demoUIState } from '$lib/stores/demoState';
	import { createEventLogStore } from '$lib/stores/eventLog';
	import type { EncodingContext, EncodingEvent, EncodingTypeStates } from '$lib/xstate/b64Encode';
	import { encodingMachineConfig, encodingMachineOptions } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';
	import { setContext } from 'svelte';
	import { createMachine } from 'xstate';

	const encodingMachine = createMachine<EncodingContext, EncodingEvent, EncodingTypeStates>(
		encodingMachineConfig,
		encodingMachineOptions,
	);
	const { state, send, service } = useMachine<EncodingContext, EncodingEvent, EncodingTypeStates>(encodingMachine);
	const demoState = createDemoStateStore(state);
	const eventLog = createEventLogStore(service);
	setContext('demo', { state, demoState, demoUIState, eventLog, send });
	let pageWidth: number;

	$: height = pageWidth < 730 ? 'auto' : '100vh';
	$: gridStyles =
		pageWidth < 730
			? 'auto auto auto 1fr'
			: $state.matches('inactive') || $state.matches('finished') || $state.matches({ validateInputText: 'error' })
			? 'auto auto 1fr auto'
			: 'auto auto 1fr 265px';
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div class="base64-algo-demo" style="height: {height}; grid-template-rows: {gridStyles};">
	{#if $demoUIState.mode === 'encode'}
		<Base64EncodeDemo />
		<!-- {:else if $demoState === 'decode'} -->
	{/if}
</div>

<style lang="postcss">
	.base64-algo-demo {
		display: grid;
		grid-template-columns: auto;
		position: relative;
		background-color: var(--page-bg-color);
		padding: 1rem;
		margin: 0 auto;
		width: 343px;
		min-height: 100vh;
	}
	@media screen and (min-width: 730px) {
		.base64-algo-demo {
			box-sizing: border-box;
			grid-template-columns: auto;
			width: 764px;
			padding: 1rem 2rem;
			column-gap: 1rem;
		}
	}
</style>
