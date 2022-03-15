<script lang="ts">
	import GoToFirstStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToFirstStepButton.svelte';
	import GoToLastStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToLastStepButton.svelte';
	import GoToNextStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToNextStepButton.svelte';
	import GoToPreviousStepButton from '$lib/components/AlgorithmDemo/Buttons/GoToPreviousStepButton.svelte';
	import ResetButton from '$lib/components/AlgorithmDemo/Buttons/ResetButton.svelte';
	import StartAutoPlayButton from '$lib/components/AlgorithmDemo/Buttons/StartAutoPlayButton.svelte';
	import StopAutoPlayButton from '$lib/components/AlgorithmDemo/Buttons/StopAutoPlayButton.svelte';
</script>

<div class="nav-buttons-help help-module">
	<h2><span>Navigational Buttons</span></h2>
	<div class="nav-buttons">
		<div class="nav-button-column">
			<div class="help-row"><ResetButton /><span>Reset form</span></div>
			<div class="help-row"><StartAutoPlayButton /><span>Start auto-play</span></div>
			<div class="help-row"><StopAutoPlayButton /><span>Stop auto-play</span></div>
		</div>
		<div class="nav-button-column">
			<div class="help-row"><GoToFirstStepButton /><span>Go to first step</span></div>
			<div class="help-row"><GoToPreviousStepButton /><span>Go to previous step</span></div>
			<div class="help-row"><GoToNextStepButton /><span>Go to next step</span></div>
			<div class="help-row"><GoToLastStepButton /><span>Go to last step</span></div>
		</div>
	</div>
</div>

<style lang="postcss">
	.nav-button-column,
	.nav-buttons-help {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.help-row {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	.nav-buttons-help .help-row {
		align-items: center;
		height: 33px;
	}

	.nav-buttons {
		display: flex;
		flex-flow: row nowrap;
		gap: 1.5rem;
		height: 188px;
	}
</style>
