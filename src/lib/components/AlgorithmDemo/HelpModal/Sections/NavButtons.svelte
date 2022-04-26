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
</script>

<div class="nav-buttons-help help-module">
	<div class="nav-buttons-wrapper">
		<div class="help-row reset"><ResetButton {state} /><span>Reset form</span></div>
		<div class="help-row start"><StartAutoPlayButton {state} /><span>Start auto-play</span></div>
		<div class="help-row stop"><StopAutoPlayButton {state} /><span>Stop auto-play</span></div>
		<div class="help-row first"><GoToFirstStepButton {state} /><span>Go to first step</span></div>
		<div class="help-row prev"><GoToPreviousStepButton {state} /><span>Go to previous step</span></div>
		<div class="help-row next"><GoToNextStepButton {state} /><span>Go to next step</span></div>
		<div class="help-row last"><GoToLastStepButton {state} /><span>Go to last step</span></div>
	</div>
</div>

<style lang="postcss">
	.help-row {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
		align-items: center;
		height: 33px;
		white-space: nowrap;
	}
	.nav-buttons-wrapper {
		display: grid;
		grid-template-columns: 1fr auto auto 1fr;
		grid-template-rows: repeat(4, auto);
		gap: 1rem;
		padding: 0.5rem 0;
	}
	.reset {
		grid-column: 2 / span 1;
		grid-row: 1 / span 1;
	}
	.start {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}
	.stop {
		grid-column: 2 / span 1;
		grid-row: 3 / span 1;
	}
	.first {
		grid-column: 2 / span 1;
		grid-row: 4 / span 1;
	}
	.prev {
		grid-column: 2 / span 1;
		grid-row: 5 / span 1;
	}
	.next {
		grid-column: 2 / span 1;
		grid-row: 6 / span 1;
	}
	.last {
		grid-column: 2 / span 1;
		grid-row: 7 / span 1;
	}
	@media screen and (min-width: 730px) {
		.reset {
			grid-column: 2 / span 1;
			grid-row: 1 / span 1;
		}
		.start {
			grid-column: 2 / span 1;
			grid-row: 2 / span 1;
		}
		.stop {
			grid-column: 2 / span 1;
			grid-row: 3 / span 1;
		}
		.first {
			grid-column: 3 / span 1;
			grid-row: 1 / span 1;
		}
		.prev {
			grid-column: 3 / span 1;
			grid-row: 2 / span 1;
		}
		.next {
			grid-column: 3 / span 1;
			grid-row: 3 / span 1;
		}
		.last {
			grid-column: 3 / span 1;
			grid-row: 4 / span 1;
		}
	}
</style>
