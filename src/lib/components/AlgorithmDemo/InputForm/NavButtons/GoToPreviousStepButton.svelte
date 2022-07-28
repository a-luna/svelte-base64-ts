<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButton.svelte';
	import PreviousStep from '$lib/components/Icons/PreviousStep.svelte';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';

	export let buttonNumber: number = 0;
	let defaultNavAction: EncodingEvent = { type: 'GO_TO_PREV_STEP' };
</script>

<NavButton
	{defaultNavAction}
	{buttonNumber}
	label={'Prev. Step'}
	tooltip={'Go To Previous Step'}
	iconWidth={'11px'}
	testId={'previous-step-button'}
>
	<PreviousStep />
</NavButton>
