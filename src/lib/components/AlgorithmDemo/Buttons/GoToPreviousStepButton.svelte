<script lang="ts">
	import PreviousStep from '$lib/components/Icons/PreviousStep.svelte';
	import type { EncodingMachineStateStore } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';

	export let state: EncodingMachineStateStore;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: EncodingEvent } }>();

	$: autoplay = state ? $state.context.autoplay : false;
	$: disabled = state ? !$state.can('GO_TO_PREV_STEP') : false;
</script>

<button
	type="button"
	title="Go To Previous Step"
	disabled={autoplay || disabled}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: { type: 'GO_TO_PREV_STEP' } })}
>
	<div class="icon step-icon">
		<PreviousStep />
	</div>
</button>

<style lang="postcss">
	button {
		grid-column: 5 / span 1;
		grid-row: 2 / span 1;
	}
	.algo-nav-buttons button .icon.step-icon {
		width: 11px;
	}
</style>
