<script lang="ts">
	import NextStep from '$lib/components/Icons/NextStep.svelte';
	import type { DemoState, EncodingMachineStateStore, NavButtonEventDispatcher } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let state: EncodingMachineStateStore;
	let demoUIState: Writable<DemoState>;
	let navButtonEventDispatcher: NavButtonEventDispatcher;
	({ state, demoUIState, navButtonEventDispatcher } = getContext('demo'));

	const validActions: EncodingEvent[] = [
		{
			type: 'VALIDATE_TEXT',
			inputText: 'test',
			inputEncoding: 'bin',
			outputEncoding: 'base64url',
		},
		{ type: 'GO_TO_NEXT_STEP' },
	];

	$: enabled = !$demoUIState.modalOpen && validActions.some((action) => $state?.can(action));
	$: exceptionalState = (!$demoUIState.modalOpen && $state?.matches('inactive')) ?? false;

	function getCorrectAction(): EncodingEvent {
		return $state.matches('inactive')
			? {
					type: 'VALIDATE_TEXT',
					inputText: $state?.context.input.inputText,
					inputEncoding: $state?.context.input.inputEncoding,
					outputEncoding: $state?.context.input.outputEncoding,
			  }
			: { type: 'GO_TO_NEXT_STEP' };
	}
</script>

<button
	type="button"
	title="Go To Next Step"
	disabled={!enabled && !exceptionalState}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: getCorrectAction() })}
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
