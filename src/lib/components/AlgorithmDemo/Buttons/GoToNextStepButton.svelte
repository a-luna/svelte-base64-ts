<script lang="ts">
	import NextStep from '$lib/components/Icons/NextStep.svelte';
	import { demoState } from '$lib/stores/demoState';
	import type { NavAction } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>> = null;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = state ? $state.context.autoplay : false;
	$: disabled = state ? !$state.can('GO_TO_NEXT_STEP') : false;
	$: exceptionalState = state
		? !$demoState.modalOpen && ($state.matches('inactive') || $state.matches('inputTextError'))
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
	.algo-nav-buttons button .icon.step-icon {
		width: 11px;
	}
</style>
