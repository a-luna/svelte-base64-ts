<script lang="ts">
	import GoToFirstStepButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/GoToFirstStepButton.svelte';
	import GoToLastStepButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/GoToLastStepButton.svelte';
	import GoToNextStepButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/GoToNextStepButton.svelte';
	import GoToPreviousStepButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/GoToPreviousStepButton.svelte';
	import ResetButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/ResetButton.svelte';
	import StartAutoPlayButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/StartAutoPlayButton.svelte';
	import StopAutoPlayButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/StopAutoPlayButton.svelte';
</script>

<div class="nav-buttons-help help-module">
	<div class="nav-buttons-wrapper">
		<div class="help-row reset"><ResetButton /><span>Reset form</span></div>
		<div class="help-row start"><StartAutoPlayButton /><span>Start auto-play</span></div>
		<div class="help-row stop"><StopAutoPlayButton /><span>Stop auto-play</span></div>
		<div class="help-row first"><GoToFirstStepButton /><span>Go to first step</span></div>
		<div class="help-row prev"><GoToPreviousStepButton /><span>Go to previous step</span></div>
		<div class="help-row next"><GoToNextStepButton /><span>Go to next step</span></div>
		<div class="help-row last"><GoToLastStepButton /><span>Go to last step</span></div>
	</div>
</div>

<style lang="postcss">
	.help-row {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.75rem;
		height: 33px;
		white-space: nowrap;
		align-items: center;
		width: 155px;
	}
	.nav-buttons-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		gap: 0.75rem;
	}
	@media screen and (min-width: 430px) {
		.help-row {
			width: auto;
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
