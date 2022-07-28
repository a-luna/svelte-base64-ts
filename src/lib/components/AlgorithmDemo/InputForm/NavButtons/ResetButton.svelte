<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButton.svelte';
	import Reset from '$lib/components/Icons/Reset.svelte';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';

	export let buttonNumber: number = 0;
	let defaultNavAction: EncodingEvent = { type: 'RESET' };
</script>

<NavButton
	{defaultNavAction}
	{buttonNumber}
	label={'Reset'}
	tooltip={'Reset'}
	iconWidth={'12px'}
	testId={'reset-button'}
>
	<Reset />
</NavButton>
