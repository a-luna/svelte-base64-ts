<script lang="ts">
	import FirstStep from '$lib/components/Icons/FirstStep.svelte';
	import type { NavAction, XStateMachineState } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let state: XStateMachineState;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = state ? $state.context.autoplay : false;
	$: disabled = state ? !$state.can('GO_TO_FIRST_STEP') : false;
</script>

<button
	type="button"
	title="Go To First Step"
	disabled={autoplay || disabled}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_FIRST_STEP' })}
>
	<div class="icon first-icon">
		<FirstStep />
	</div>
</button>

<style lang="postcss">
	button {
		grid-column: 4 / span 1;
		grid-row: 2 / span 1;
	}
	.algo-nav-buttons button .icon.first-icon {
		width: 13px;
	}
</style>
