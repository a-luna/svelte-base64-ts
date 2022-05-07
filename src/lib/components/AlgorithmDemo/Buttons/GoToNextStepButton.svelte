<script lang="ts">
	import NextStep from '$lib/components/Icons/NextStep.svelte';
	import { demoState } from '$lib/stores/demoState';
	import type { B64EncodingMachineState } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';

	export let state: B64EncodingMachineState;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: EncodingEvent } }>();

	const validActions: EncodingEvent[] = [
		{
			type: 'VALIDATE_TEXT',
			inputText: 'test',
			inputEncoding: 'bin',
			outputEncoding: 'base64url',
		},
		{ type: 'GO_TO_NEXT_STEP' },
	];

	$: enabled = !$demoState.modalOpen && validActions.some((action) => $state?.can(action));
	$: exceptionalState = (!$demoState.modalOpen && $state?.matches('inactive')) ?? false;

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
