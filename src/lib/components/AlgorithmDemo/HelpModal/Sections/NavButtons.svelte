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

<div class="nav-buttons-help help-module">
	<div class="nav-buttons-wrapper">
		<div class="nav-button-column">
			<div class="help-row"><ResetButton {state} /><span>Reset form</span></div>
			<div class="help-row"><StartAutoPlayButton {state} /><span>Start auto-play</span></div>
			<div class="help-row"><StopAutoPlayButton {state} /><span>Stop auto-play</span></div>
		</div>
		<div class="nav-button-column">
			<div class="help-row"><GoToFirstStepButton {state} /><span>Go to first step</span></div>
			<div class="help-row"><GoToPreviousStepButton {state} /><span>Go to previous step</span></div>
			<div class="help-row"><GoToNextStepButton {state} /><span>Go to next step</span></div>
			<div class="help-row"><GoToLastStepButton {state} /><span>Go to last step</span></div>
		</div>
	</div>
</div>

<style lang="postcss">
	.nav-button-column {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		pointer-events: none;
	}
	.help-row {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
		align-items: center;
		height: 33px;
		white-space: nowrap;
	}
	.nav-buttons-wrapper {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		gap: 1rem;
		padding: 0.5rem 0;
	}
</style>
