<script lang="ts">
	import GoToFirstStepButton from '$lib/components/AlgorithmDemo/NavButtons/GoToFirstStepButton.svelte';
	import GoToNextStepButton from '$lib/components/AlgorithmDemo/NavButtons/GoToNextStepButton.svelte';
	import GoToPreviousStepButton from '$lib/components/AlgorithmDemo/NavButtons/GoToPreviousStepButton.svelte';
	import ResetButton from '$lib/components/AlgorithmDemo/NavButtons/ResetButton.svelte';
	import StartAutoPlayButton from '$lib/components/AlgorithmDemo/NavButtons/StartAutoPlayButton.svelte';
	import StopAutoPlayButton from '$lib/components/AlgorithmDemo/NavButtons/StopAutoPlayButton.svelte';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';
	import GoToLastStepButton from './NavButtons/GoToLastStepButton.svelte';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;

	$: autoplay = $state.context.autoplay;
</script>

<div class="algo-nav-buttons" class:autoplay>
	<ResetButton {state} on:navButtonEvent on:reset />
	<StartAutoPlayButton {state} on:navButtonEvent />
	<StopAutoPlayButton {state} on:navButtonEvent />
	<GoToFirstStepButton {state} on:navButtonEvent />
	<GoToPreviousStepButton {state} on:navButtonEvent />
	<GoToNextStepButton {state} on:navButtonEvent />
	<GoToLastStepButton {state} on:navButtonEvent />
</div>

<style lang="postcss">
	.algo-nav-buttons {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		height: 33px;
		flex: 1;
	}
</style>
