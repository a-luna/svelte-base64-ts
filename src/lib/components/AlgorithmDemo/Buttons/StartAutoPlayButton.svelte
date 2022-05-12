<script lang="ts">
	import StartAutoPlay from '$lib/components/Icons/StartAutoPlay.svelte';
	import type { EncodingMachineStateStore } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';

	export let state: EncodingMachineStateStore;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: EncodingEvent } }>();
	const defaultAction: EncodingEvent = { type: 'RESUME_AUTO_PLAY' };

	const validActions: EncodingEvent[] = [
		{
			type: 'START_AUTOPLAY',
			inputText: 'test',
			inputEncoding: 'bin',
			outputEncoding: 'base64url',
		},
		{ type: 'RESUME_AUTO_PLAY' },
	];

	$: enabled = validActions.some((action) => $state?.can(action) ?? false);

	function getCorrectAction(): EncodingEvent {
		return $state.matches('inactive')
			? {
					type: 'START_AUTOPLAY',
					inputText: $state?.context.input.inputText,
					inputEncoding: $state?.context.input.inputEncoding,
					outputEncoding: $state?.context.input.outputEncoding,
			  }
			: { type: 'RESUME_AUTO_PLAY' };
	}
</script>

<button
	type="button"
	title="Start Autoplay"
	disabled={!enabled}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: getCorrectAction() })}
>
	<div class="icon play-icon">
		<StartAutoPlay />
	</div>
</button>

<style lang="postcss">
	button {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}
	.algo-nav-buttons button .icon.play-icon {
		width: 10px;
	}
</style>
