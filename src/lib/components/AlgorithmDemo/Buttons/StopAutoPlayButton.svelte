<script lang="ts">
	import StopAutoPlay from '$lib/components/Icons/StopAutoPlay.svelte';
	import type { NavAction, XStateMachineState } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let state: XStateMachineState;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = state ? $state.context.autoplay : true;
</script>

<button
	type="button"
	title="Stop Autoplay"
	disabled={!autoplay}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'STOP_AUTO_PLAY' })}
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
