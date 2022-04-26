<script lang="ts">
	import NextStep from '$lib/components/Icons/NextStep.svelte';
	import { demoState } from '$lib/stores/demoState';
	import type { NavAction, XStateMachineState } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let state: XStateMachineState;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = state ? $state.context.autoplay : false;
	$: disabled = state ? !$state.can('GO_TO_NEXT_STEP') : false;
	$: exceptionalState = state
		? (!$demoState.modalOpen && ($state.matches('inactive') || $state.matches('inputTextError'))) ||
		  $state.matches('inputTextValidated')
		: false;
</script>

<button
	type="button"
	title="Go To Next Step"
	disabled={autoplay || (disabled && !exceptionalState)}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_NEXT_STEP' })}
>
	<div class="icon step-icon">
		<NextStep />
	</div>
</button>

<style lang="postcss">
	button {
		grid-column: 6 / span 1;
		grid-row: 2 / span 1;
	}
	.algo-nav-buttons button .icon.step-icon {
		width: 11px;
	}
</style>
