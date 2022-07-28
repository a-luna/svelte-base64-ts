<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButton.svelte';
	import StopAutoPlay from '$lib/components/Icons/StopAutoPlay.svelte';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';

	export let buttonNumber: number = 0;
	let defaultNavAction: EncodingEvent = { type: 'STOP_AUTO_PLAY' };
</script>

<NavButton
	{defaultNavAction}
	{buttonNumber}
	label={'Stop Autoplay'}
	tooltip={'Stop Autoplay'}
	testId={'stop-autoplay-button'}
>
	<StopAutoPlay />
</NavButton>
