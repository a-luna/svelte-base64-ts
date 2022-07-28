<script lang="ts">
	import GoToFirstStepButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/GoToFirstStepButton.svelte';
	import GoToLastStepButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/GoToLastStepButton.svelte';
	import GoToNextStepButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/GoToNextStepButton.svelte';
	import GoToPreviousStepButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/GoToPreviousStepButton.svelte';
	import ResetButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/ResetButton.svelte';
	import StartAutoPlayButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/StartAutoPlayButton.svelte';
	import StopAutoPlayButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/StopAutoPlayButton.svelte';
	import type { EncodingMachineStateStore } from '$lib/types';
	import { getContext } from 'svelte';

	let state: EncodingMachineStateStore;
	({ state } = getContext('demo'));

	$: autoplay = $state.context.autoplay && !$state.matches({ validateInputText: 'error' });
</script>

<div class="algo-nav-buttons" class:autoplay>
	<ResetButton buttonNumber={1} />
	<StartAutoPlayButton buttonNumber={2} />
	<StopAutoPlayButton buttonNumber={3} />
	<GoToFirstStepButton buttonNumber={4} />
	<GoToPreviousStepButton buttonNumber={5} />
	<GoToNextStepButton buttonNumber={6} />
	<GoToLastStepButton buttonNumber={7} />
</div>

<style lang="postcss">
	.algo-nav-buttons {
		display: grid;
		grid-template-columns: repeat(7, auto);
		grid-template-rows: auto 33px auto;
		align-items: center;
		flex: 1;
	}
	@media screen and (min-width: 762px) {
		.algo-nav-buttons {
			grid-template-columns: repeat(7, minmax(67px, 1fr));
			grid-template-rows: auto 33px;
			align-items: center;
		}
	}
</style>
