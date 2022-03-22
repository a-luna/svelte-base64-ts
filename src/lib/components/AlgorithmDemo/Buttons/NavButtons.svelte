<script lang="ts">
	import GoToFirstStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToFirstStepButton.svelte';
	import GoToLastStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToLastStepButton.svelte';
	import GoToNextStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToNextStepButton.svelte';
	import GoToPreviousStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToPreviousStepButton.svelte';
	import ResetButton from '$lib/components/AlgorithmDemo/Buttons/ResetButton.svelte';
	import StartAutoPlayButton from '$lib/components/AlgorithmDemo/Buttons/StartAutoPlayButton.svelte';
	import StopAutoPlayButton from '$lib/components/AlgorithmDemo/Buttons/StopAutoPlayButton.svelte';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, StateSchema, TypegenDisabled } from 'xstate';

	export let state: Readable<
		State<EncodingContext, EncodingEvent, StateSchema<EncodingContext>, EncodingTypeState, TypegenDisabled>
	>;
</script>

<div class="algo-nav-buttons" class:autoplay={$state.context.autoplay}>
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
