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
	const dispatch = createEventDispatcher();

	$: autoplay = $state.context.autoplay;
	$: disableNextStep =
		autoplay || (!$state.matches('inactive') && !$state.matches('inputTextError') && !$state.can('GO_TO_NEXT_STEP'));
</script>

<div class="algo-nav-buttons" class:autoplay>
	<button
		type="button"
		title="Reset"
		class:idle={autoplay}
		disabled={!$state.can('RESET')}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'RESET' })}
		on:click={() => dispatch('reset')}><div class="icon reset-icon"><Reset /></div></button
	>
	<button
		type="button"
		title="Start AutoPlay"
		disabled={autoplay}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'START_AUTO_PLAY' })}
		><div class="icon play-icon"><StartAutoPlay /></div></button
	>
	<button
		type="button"
		title="Stop AutoPlay"
		disabled={!autoplay}
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
		margin: 0;
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
	.autoplay button,
	.autoplay button:hover,
	.autoplay button:focus,
	.autoplay button:active,
	.autoplay button:active:focus {
		color: var(--nav-button-autoplay-text-color);
		background-color: var(--nav-button-autoplay-bg-color);
		border-right: none;
		border-left: 0.5px solid var(--nav-button-autoplay-border-color);
		border-top: 2px solid var(--nav-button-autoplay-border-color);
		border-bottom: 2px solid var(--nav-button-autoplay-border-color);
	}
	.autoplay button.idle,
	.autoplay button.idle:hover,
	.autoplay button.idle:focus,
	.autoplay button.idle:active,
	.autoplay button.idle:active:focus,
	.autoplay button:disabled,
	.autoplay button:disabled:hover,
	.autoplay button:disabled:focus,
	.autoplay button:disabled:active,
	.autoplay button:disabled:active:focus {
		color: var(--nav-button-autoplay-idle-text-color);
		background-color: var(--nav-button-autoplay-idle-bg-color);
		border-right: none;
		border-left: 0.5px solid var(--nav-button-autoplay-idle-border-color);
		border-top: 2px solid var(--nav-button-autoplay-idle-border-color);
		border-bottom: 2px solid var(--nav-button-autoplay-idle-border-color);
	}
	.autoplay button.idle:last-child,
	.autoplay button.idle:hover:last-child,
	.autoplay button.idle:focus:last-child,
	.autoplay button.idle:active:last-child,
	.autoplay button.idle:active:focus:last-child,
	.autoplay button:disabled:last-child,
	.autoplay button:disabled:hover:last-child,
	.autoplay button:disabled:focus:last-child,
	.autoplay button:disabled:active:last-child,
	.autoplay button:disabled:active:focus:last-child {
		border-right: 2px solid var(--nav-button-autoplay-idle-border-color);
		border-left: 0.5px solid var(--nav-button-autoplay-idle-border-color);
		border-top: 2px solid var(--nav-button-autoplay-idle-border-color);
		border-bottom: 2px solid var(--nav-button-autoplay-idle-border-color);
	}
	.autoplay button.idle:first-child,
	.autoplay button.idle:hover:first-child,
	.autoplay button.idle:focus:first-child,
	.autoplay button.idle:active:first-child,
	.autoplay button.idle:active:focus:first-child,
	.autoplay button:disabled:first-child,
	.autoplay button:disabled:hover:first-child,
	.autoplay button:disabled:focus:first-child,
	.autoplay button:disabled:active:first-child,
	.autoplay button:disabled:active:focus:first-child {
		border-right: none;
		border-left: 2px solid var(--nav-button-autoplay-idle-border-color);
		border-top: 2px solid var(--nav-button-autoplay-idle-border-color);
		border-bottom: 2px solid var(--nav-button-autoplay-idle-border-color);
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
