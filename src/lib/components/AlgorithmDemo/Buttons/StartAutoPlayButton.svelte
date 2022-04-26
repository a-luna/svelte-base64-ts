<script lang="ts">
	import StartAutoPlay from '$lib/components/Icons/StartAutoPlay.svelte';
	import type { NavAction, XStateMachineState } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let state: XStateMachineState;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = state ? $state.context.autoplay : false;
</script>

<button
	type="button"
	title="Start Autoplay"
	disabled={autoplay}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'START_AUTO_PLAY' })}
>
	<div class="icon play-icon">
		<StartAutoPlay />
	</div>
</button>

<style lang="postcss">
	button {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}
	.algo-nav-buttons button .icon.play-icon {
		width: 10px;
	}
</style>
