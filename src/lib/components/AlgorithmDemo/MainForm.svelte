<script lang="ts">
	import Base64EncodeDemo from '$lib/components/AlgorithmDemo/Base64EncodeDemo/Base64EncodeDemo.svelte';
	import { createDemoStateStore, demoUIState } from '$lib/stores/demoState';
	import type { EncodingContext, EncodingEvent, EncodingTypeStates } from '$lib/xstate/b64Encode';
	import { encodingMachineConfig, encodingMachineOptions } from '$lib/xstate/b64Encode';
	import { createEventLogStore } from '$lib/xstate/b64Encode.test/eventLog';
	import { useMachine } from '@xstate/svelte';
	import { setContext } from 'svelte';
	import { createMachine } from 'xstate';

	const encodingMachine = createMachine<EncodingContext, EncodingEvent, EncodingTypeStates>(
		encodingMachineConfig,
		encodingMachineOptions,
	);
	const { state, send } = useMachine<EncodingContext, EncodingEvent, EncodingTypeStates>(encodingMachine);
	const demoState = createDemoStateStore(state);
	const eventLog = createEventLogStore(state);
	setContext('demo', { state, demoState, demoUIState, eventLog, send });

	$: gridStyles =
		$demoState.isMobileDisplay || $state.matches('finished')
			? 'auto auto auto 1fr'
			: $state.matches('inactive') || $state.matches({ validateInputText: 'error' })
			? 'auto auto auto 1fr'
			: 'auto auto minmax(250px, 1fr) 276px';
</script>

<div class="base64-algo-demo" data-testid="demo-form" style="grid-template-rows: {gridStyles};">
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
	@media screen and (min-width: 762px) {
		.base64-algo-demo {
			box-sizing: border-box;
			grid-template-columns: auto;
			width: 764px;
			padding: 1rem 2rem;
			column-gap: 1rem;
		}
	}
</style>
