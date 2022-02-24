<script lang="ts">
	import FirstStep from '$lib/components/Icons/FirstStep.svelte';
	import LastStep from '$lib/components/Icons/LastStep.svelte';
	import NextStep from '$lib/components/Icons/NextStep.svelte';
	import PreviousStep from '$lib/components/Icons/PreviousStep.svelte';
	import Reset from '$lib/components/Icons/Reset.svelte';
	import StartAutoPlay from '$lib/components/Icons/StartAutoPlay.svelte';
	import StopAutoPlay from '$lib/components/Icons/StopAutoPlay.svelte';
	import type { NavAction } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = $state.context.autoplay;
	$: disableNextStep =
		autoplay || (!$state.matches('inactive') && !$state.matches('inputTextError') && !$state.can('GO_TO_NEXT_STEP'));
</script>

<div class="algo-nav-buttons">
	<button
		type="button"
		title="Reset"
		class:idle={autoplay}
		disabled={!$state.can('RESET')}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'RESET' })}
		><div class="icon reset-icon"><Reset /></div></button
	>
	<button
		type="button"
		title="Start AutoPlay"
		class:autoplay
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'START_AUTO_PLAY' })}
		><div class="icon play-icon"><StartAutoPlay /></div></button
	>
	<button
		type="button"
		title="Stop AutoPlay"
		class:stop-autoplay={autoplay}
		disabled={!$state.can('STOP_AUTO_PLAY')}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'STOP_AUTO_PLAY' })}
		><div class="icon"><StopAutoPlay /></div></button
	>
	<button
		type="button"
		title="Go To First Step"
		class:idle={autoplay}
		disabled={autoplay || !$state.can('GO_TO_FIRST_STEP')}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_FIRST_STEP' })}
		><div class="icon first-icon"><FirstStep /></div></button
	>
	<button
		type="button"
		title="Go To Previous Step"
		class:idle={autoplay}
		disabled={autoplay || !$state.can('GO_TO_PREV_STEP')}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_PREV_STEP' })}
		><div class="icon step-icon"><PreviousStep /></div></button
	>
	<button
		type="button"
		title="Go To Next Step"
		class:idle={autoplay}
		disabled={autoplay || disableNextStep}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_NEXT_STEP' })}
		><div class="icon step-icon"><NextStep /></div></button
	>
	<button
		type="button"
		title="Go To Last Step"
		class:idle={autoplay}
		disabled={autoplay || !$state.can('GO_TO_LAST_STEP')}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_LAST_STEP' })}
		><div class="icon last-icon"><LastStep /></div></button
	>
</div>

<style lang="postcss">
	.algo-nav-buttons {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		margin: 0 auto;
	}
	button {
		padding: 8px 13px;
		color: var(--nav-button-text-color);
		background-color: var(--nav-button-bg-color);
		border-right: none;
		border-left: 0.5px solid var(--nav-button-border-color);
		border-top: 2px solid var(--nav-button-border-color);
		border-bottom: 2px solid var(--nav-button-border-color);
		border-radius: 0;
	}
	button:hover {
		color: var(--nav-button-hover-text-color);
		background-color: var(--nav-button-hover-bg-color);
	}
	button:focus,
	button:active,
	button:active:focus {
		color: var(--nav-button-active-text-color);
		background-color: var(--nav-button-active-bg-color);
		border-right: none;
		border-left: 0.5px solid var(--nav-button-active-border-color);
		border-top: 2px solid var(--nav-button-active-border-color);
		border-bottom: 2px solid var(--nav-button-active-border-color);
	}
	button:first-child {
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
		border-right: none;
		border-left: 2px solid var(--nav-button-border-color);
		border-top: 2px solid var(--nav-button-border-color);
		border-bottom: 2px solid var(--nav-button-border-color);
	}
	button:focus:first-child,
	button:active:first-child,
	button:active:focus:first-child {
		border-right: none;
		border-left: 2px solid var(--nav-button-active-border-color);
		border-top: 2px solid var(--nav-button-active-border-color);
		border-bottom: 2px solid var(--nav-button-active-border-color);
	}
	button:last-child {
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
		border-right: 2px solid var(--nav-button-border-color);
		border-left: 0.5px solid var(--nav-button-border-color);
		border-top: 2px solid var(--nav-button-border-color);
		border-bottom: 2px solid var(--nav-button-border-color);
	}
	button:focus:last-child,
	button:active:last-child,
	button:active:focus:last-child {
		border-right: 2px solid var(--nav-button-active-border-color);
		border-left: 0.5px solid var(--nav-button-active-border-color);
		border-top: 2px solid var(--nav-button-active-border-color);
		border-bottom: 2px solid var(--nav-button-active-border-color);
	}
	button:disabled,
	button:disabled:hover,
	button:disabled:focus,
	button:disabled:active,
	button:disabled:active:focus {
		cursor: default;
		color: var(--button-disabled-text-color);
		background-color: var(--button-disabled-bg-color);
		border-right: none;
		border-left: 0.5px solid var(--button-disabled-border-color);
		border-top: 2px solid var(--button-disabled-border-color);
		border-bottom: 2px solid var(--button-disabled-border-color);
	}
	button:disabled:first-child,
	button:disabled:focus:first-child,
	button:disabled:active:first-child,
	button:disabled:active:focus:first-child {
		border-right: none;
		border-left: 2px solid var(--button-disabled-border-color);
		border-top: 2px solid var(--button-disabled-border-color);
		border-bottom: 2px solid var(--button-disabled-border-color);
	}
	button:disabled:last-child,
	button:disabled:focus:last-child,
	button:disabled:active:last-child,
	button:disabled:active:focus:last-child {
		border-right: 2px solid var(--button-disabled-border-color);
		border-left: 0.5px solid var(--button-disabled-border-color);
		border-top: 2px solid var(--button-disabled-border-color);
		border-bottom: 2px solid var(--button-disabled-border-color);
	}
	.autoplay,
	.autoplay:hover,
	.autoplay:focus,
	.autoplay:active,
	.autoplay:active:focus,
	.stop-autoplay:hover,
	.stop-autoplay:focus,
	.stop-autoplay:active,
	.stop-autoplay:active:focus {
		color: var(--nav-button-autoplay-text-color);
		background-color: var(--nav-button-autoplay-bg-color);
		border-right: none;
		border-left: 0.5px solid var(--nav-button-autoplay-border-color);
		border-top: 2px solid var(--nav-button-autoplay-border-color);
		border-bottom: 2px solid var(--nav-button-autoplay-border-color);
	}
	button.idle,
	button.idle:hover,
	button.idle:focus,
	button.idle:active,
	button.idle:active:focus,
	button.idle:disabled,
	button.idle:disabled:hover,
	button.idle:disabled:focus,
	button.idle:disabled:active,
	button.idle:disabled:active:focus {
		color: var(--nav-button-autoplay-idle-text-color);
		background-color: var(--nav-button-autoplay-idle-bg-color);
		border-right: none;
		border-left: 0.5px solid var(--nav-button-autoplay-idle-border-color);
		border-top: 2px solid var(--nav-button-autoplay-idle-border-color);
		border-bottom: 2px solid var(--nav-button-autoplay-idle-border-color);
	}
	button.idle:last-child,
	button.idle:hover:last-child,
	button.idle:focus:last-child,
	button.idle:active:last-child,
	button.idle:active:focus:last-child,
	button.idle:disabled:last-child,
	button.idle:disabled:hover:last-child,
	button.idle:disabled:focus:last-child,
	button.idle:disabled:active:last-child,
	button.idle:disabled:active:focus:last-child {
		border-right: 2px solid var(--nav-button-autoplay-idle-border-color);
		border-left: 0.5px solid var(--nav-button-autoplay-idle-border-color);
		border-top: 2px solid var(--nav-button-autoplay-idle-border-color);
		border-bottom: 2px solid var(--nav-button-autoplay-idle-border-color);
	}
	.stop-autoplay {
		color: var(--nav-button-stop-autoplay-text-color);
		background-color: var(--nav-button-stop-autoplay-bg-color);
		border-right: none;
		border-left: 0.5px solid var(--nav-button-stop-autoplay-border-color);
		border-top: 2px solid var(--nav-button-stop-autoplay-border-color);
		border-bottom: 2px solid var(--nav-button-stop-autoplay-border-color);
	}
	.icon {
		width: 11px;
		margin: auto;
	}
	.play-icon {
		width: 9px;
	}
	.step-icon {
		width: 11px;
	}
	.reset-icon,
	.first-icon,
	.last-icon {
		width: 13px;
	}
</style>
