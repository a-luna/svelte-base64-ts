<script lang="ts">
	import LastStep from '$lib/components/Icons/LastStep.svelte';
	import type { NavAction } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, StateSchema, TypegenDisabled } from 'xstate';

	export let state: Readable<
		State<EncodingContext, EncodingEvent, StateSchema<EncodingContext>, EncodingTypeState, TypegenDisabled>
	>;
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
	.algo-nav-buttons button .icon.last-icon {
		width: 13px;
	}
</style>
