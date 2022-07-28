<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButton.svelte';
	import FirstStep from '$lib/components/Icons/FirstStep.svelte';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';

	export let buttonNumber: number = 0;
	let defaultNavAction: EncodingEvent = { type: 'GO_TO_FIRST_STEP' };
</script>

<NavButton
	{defaultNavAction}
	{buttonNumber}
	label={'First Step'}
	tooltip={'Go To First Step'}
	iconWidth={'13px'}
	testId={'first-step-button'}
>
	<FirstStep />
</NavButton>
