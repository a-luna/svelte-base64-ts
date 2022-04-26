<script lang="ts">
	import LastStep from '$lib/components/Icons/LastStep.svelte';
	import type { NavAction, XStateMachineState } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let state: XStateMachineState;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = state ? $state.context.autoplay : false;
	$: disabled = state
		? !($state.can('GO_TO_LAST_STEP') || $state.matches('inactive') || $state.matches('inputTextError'))
		: false;
</script>

<button
	type="button"
	title="Go To Last Step"
	disabled={autoplay || disabled}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_LAST_STEP' })}
>
	<div class="icon last-icon">
		<LastStep />
	</div>
</button>

<style lang="postcss">
	button {
		grid-column: 7 / span 1;
		grid-row: 2 / span 1;
	}
	.algo-nav-buttons button .icon.last-icon {
		width: 13px;
	}
</style>
