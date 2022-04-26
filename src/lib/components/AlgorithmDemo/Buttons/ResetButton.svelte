<script lang="ts">
	import Reset from '$lib/components/Icons/Reset.svelte';
	import type { NavAction, XStateMachineState } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let state: XStateMachineState;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();
	const dispatch = createEventDispatcher();

	$: disabled = state ? !$state.can('RESET') : false;
</script>

<button
	type="button"
	title="Reset"
	{disabled}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'RESET' })}
	on:click={() => dispatch('reset')}
>
	<div class="icon reset-icon">
		<Reset />
	</div>
</button>

<style lang="postcss">
	button {
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
	.algo-nav-buttons button .icon.reset-icon {
		width: 12px;
	}
</style>
