<script lang="ts">
	import PreviousStep from '$lib/components/Icons/PreviousStep.svelte';
	import type { NavAction } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = $state.context.autoplay;
</script>

<button
	type="button"
	title="Go To Previous Step"
	class:idle={autoplay}
	disabled={autoplay || !$state.can('GO_TO_PREV_STEP')}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_PREV_STEP' })}
>
	<div class="icon step-icon">
		<PreviousStep />
	</div>
</button>

<style lang="postcss">
	.algo-nav-buttons button .icon.step-icon {
		width: 11px;
	}
</style>
