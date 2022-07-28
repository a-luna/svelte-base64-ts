<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButton.svelte';
	import NextStep from '$lib/components/Icons/NextStep.svelte';
	import type { EncodingMachineStateStore, EncodingStateToEventMap } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { getContext } from 'svelte';

	export let buttonNumber: number = 0;
	let state: EncodingMachineStateStore;
	({ state } = getContext('demo'));
	let defaultNavAction: EncodingEvent = { type: 'GO_TO_NEXT_STEP' };
	let encodingStateToEventMap: EncodingStateToEventMap = [
		{
			requiredState: { value: 'inactive', context: $state.context },
			navAction: () => ({
				type: 'VALIDATE_TEXT',
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
	label={'Next Step'}
	tooltip={'Go To Next Step'}
	iconWidth={'11px'}
	testId={'next-step-button'}
>
	<NextStep />
</NavButton>
