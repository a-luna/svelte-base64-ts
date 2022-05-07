<script lang="ts">
	import StopAutoPlay from '$lib/components/Icons/StopAutoPlay.svelte';
	import type { B64EncodingMachineState } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';

	export let state: B64EncodingMachineState;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: EncodingEvent } }>();

	$: autoplay = state ? $state.context.autoplay : true;
</script>

<button
	type="button"
	title="Stop Autoplay"
	disabled={!autoplay}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: { type: 'STOP_AUTO_PLAY' } })}
>
	<div class="icon">
		<StopAutoPlay />
	</div>
</button>

<style lang="postcss">
	button {
		grid-column: 3 / span 1;
		grid-row: 2 / span 1;
	}
</style>
