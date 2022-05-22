<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/NavButtons/NavButton.svelte';
	import LastStep from '$lib/components/Icons/LastStep.svelte';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';

	export let buttonNumber: number = 0;
	let defaultNavAction: EncodingEvent = { type: 'GO_TO_LAST_STEP' };
</script>

<NavButton
	{defaultNavAction}
	{buttonNumber}
	label={'Last Step'}
	tooltip={'Go To Last Step'}
	iconWidth={'13px'}
	testId={'last-step-button'}
>
	<LastStep />
</NavButton>
