<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButton.svelte';
	import StartAutoPlay from '$lib/components/Icons/StartAutoPlay.svelte';
	import type { EncodingMachineStateStore, EncodingStateToEventMap } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { getContext } from 'svelte';

	export let buttonNumber: number = 0;
	let state: EncodingMachineStateStore;
	({ state } = getContext('demo'));
	let defaultNavAction: EncodingEvent = { type: 'RESUME_AUTO_PLAY' };
	let encodingStateToEventMap: EncodingStateToEventMap = [
		{
			requiredState: { value: 'inactive', context: $state.context },
			navAction: () => ({
				type: 'START_AUTOPLAY',
				inputText: $state?.context.input.inputText,
				inputEncoding: $state?.context.input.inputEncoding,
				outputEncoding: $state?.context.input.outputEncoding,
			}),
		},
	];
</script>

<NavButton
	{defaultNavAction}
	{encodingStateToEventMap}
	{buttonNumber}
	label={'Start Autoplay'}
	tooltip={'Start Autoplay'}
	iconWidth={'10px'}
	testId={'start-autoplay-button'}
>
	<StartAutoPlay />
</NavButton>
