<script lang="ts">
	import AlgorithmDemo from '$lib/components/AlgorithmDemo/AlgorithmDemo.svelte';
	import { createDemoStateStore, demoUIState } from '$lib/stores/demoState';
	import { encodingMachine } from '$lib/xstate/b64Encode';
	import { createEventLogStore } from '$lib/xstate/b64Encode.test/eventLog';
	import { useMachine } from '@xstate/svelte';
	import { setContext } from 'svelte';

	const { state, send } = useMachine(encodingMachine, { devTools: false });
	const demoState = createDemoStateStore(state);
	const eventLog = createEventLogStore(state);
	setContext('demo', { state, demoState, demoUIState, eventLog, send });

	$: gridStyles =
		$demoState.isMobileDisplay || ['finished', 'inactive', { validateInputText: 'error' }].some($state.matches)
			? 'auto auto auto 1fr'
			: 'auto auto minmax(250px, 1fr) 276px';
</script>

<div class="base64-algo-demo" data-testid="demo-form" style="grid-template-rows: {gridStyles};">
	<AlgorithmDemo />
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
