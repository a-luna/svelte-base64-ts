<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButton.svelte';
	import LastStep from '$lib/components/Icons/LastStep.svelte';
	import { getAppContext } from '$lib/stores/context';
	import type { EncodingStateToEventMap } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';

	export let buttonNumber: number = 0;
	const { state } = getAppContext();
	let defaultNavAction: EncodingEvent = { type: 'GO_TO_LAST_STEP' };
	let encodingStateToEventMap: EncodingStateToEventMap = [
		{
			requiredState: { value: 'inactive', context: $state.context },
			navAction: () => ({
				type: 'SKIP_DEMO',
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
	label={'Last Step'}
	tooltip={'Go To Last Step'}
	iconWidth={'13px'}
	testId={'last-step-button'}
>
	<LastStep />
</NavButton>
