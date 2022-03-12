<script lang="ts">
	import Reset from '$lib/components/Icons/Reset.svelte';
	import type { NavAction } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();
	const dispatch = createEventDispatcher();

	$: autoplay = $state.context.autoplay;
</script>

<button
	type="button"
	title="Reset"
	disabled={!$state.can('RESET')}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'RESET' })}
	on:click={() => dispatch('reset')}
>
	<div class="icon reset-icon">
		<Reset />
	</div>
</button>

<style lang="postcss">
	.algo-nav-buttons button .icon.reset-icon {
		width: 12px;
	}
</style>
