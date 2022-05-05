<script lang="ts">
	import GoToFirstStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToFirstStepButton.svelte';
	import GoToLastStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToLastStepButton.svelte';
	import GoToNextStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToNextStepButton.svelte';
	import GoToPreviousStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToPreviousStepButton.svelte';
	import ResetButton from '$lib/components/AlgorithmDemo/Buttons/ResetButton.svelte';
	import StartAutoPlayButton from '$lib/components/AlgorithmDemo/Buttons/StartAutoPlayButton.svelte';
	import StopAutoPlayButton from '$lib/components/AlgorithmDemo/Buttons/StopAutoPlayButton.svelte';
	import type { XStateMachineState } from '$lib/types';

	export let state: XStateMachineState;
	let lastStepHovering = false;
	let pageWidth: number;

	$: showLabel = state
		? !$state.context.autoplay && ($state.matches('inactive') || $state.matches({ validateInputText: 'error' }))
		: false;
	$: startAutoPlayLabel = pageWidth < 730 ? 'Start Autoplay' : 'Start/Stop Autoplay';
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div class="algo-nav-buttons" class:autoplay={$state.context.autoplay}>
	{#if showLabel}
		<span class="form-label reset-button-label">Reset</span>
	{/if}
	<ResetButton {state} on:navButtonEvent on:reset />
	{#if showLabel}
		<span class="form-label start-autoplay-button-label">{startAutoPlayLabel}</span>
	{/if}
	<StartAutoPlayButton {state} on:navButtonEvent />
	{#if showLabel}
		<span class="form-label stop-autoplay-button-label">Stop Autoplay</span>
	{/if}
	<StopAutoPlayButton {state} on:navButtonEvent />
	{#if showLabel}
		<span class="form-label go-to-first-step-button-label">First Step</span>
	{/if}
	<GoToFirstStepButton {state} on:navButtonEvent />
	{#if showLabel}
		<span class="form-label go-to-prev-step-button-label">Prev. Step</span>
	{/if}
	<GoToPreviousStepButton {state} on:navButtonEvent />
	{#if showLabel}
		<span class="form-label go-to-next-step-button-label">Next Step</span>
	{/if}
	<GoToNextStepButton {state} on:navButtonEvent />
	<GoToLastStepButton {state} on:navButtonEvent />
</div>

<style lang="postcss">
	.algo-nav-buttons {
		display: grid;
		grid-template-columns: repeat(7, auto);
		grid-template-rows: auto 33px auto;
		align-items: center;
		flex: 1;
	}
	.reset-button-label {
		margin: 0 0 0.5rem 0;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.start-autoplay-button-label {
		margin: 0.5rem 0 0 0;

		align-self: end;

		grid-column: 1 / span 3;
		grid-row: 3 / span 1;
	}
	.stop-autoplay-button-label {
		margin: 0 0 0.5rem 0;

		grid-column: 2 / span 3;
		grid-row: 1 / span 1;
	}
	.go-to-first-step-button-label {
		margin: 0.5rem 0 0 0;

		align-self: end;

		grid-column: 3 / span 3;
		grid-row: 3 / span 1;
	}
	.go-to-prev-step-button-label {
		margin: 0 0 0.5rem 0;

		grid-column: 4 / span 3;
		grid-row: 1 / span 1;
	}
	.go-to-next-step-button-label {
		margin: 0.5rem 0 0 0;
		align-self: end;

		grid-column: 5 / span 3;
		grid-row: 3 / span 1;
	}
	.go-to-last-step-button-label {
		margin: 0 0 0.5rem 0;

		justify-self: flex-end;
		grid-column: 6 / span 2;
		grid-row: 1 / span 1;
	}
	@media screen and (min-width: 730px) {
		.algo-nav-buttons {
			grid-template-columns: repeat(7, minmax(67px, 1fr));
			grid-template-rows: auto 33px;
			align-items: center;
		}
		.reset-button-label,
		.start-autoplay-button-label,
		.go-to-first-step-button-label,
		.go-to-prev-step-button-label,
		.go-to-next-step-button-label,
		.go-to-last-step-button-label {
			margin: 0 0 0.5rem 0;
		}
		.start-autoplay-button-label {
			justify-self: center;
			grid-column: 2 / span 2;
			grid-row: 1 / span 1;
		}
		.stop-autoplay-button-label {
			display: none;
		}
		.go-to-first-step-button-label {
			grid-column: 4 / span 1;
			grid-row: 1 / span 1;
		}
		.go-to-prev-step-button-label {
			grid-column: 5 / span 1;
			grid-row: 1 / span 1;
		}
		.go-to-next-step-button-label {
			grid-column: 6 / span 1;
			grid-row: 1 / span 1;
		}
		.go-to-last-step-button-label {
			justify-self: center;
			grid-column: 7 / span 1;
			grid-row: 1 / span 1;
		}
	}
</style>
