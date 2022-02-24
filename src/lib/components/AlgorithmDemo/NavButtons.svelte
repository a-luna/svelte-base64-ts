<script lang="ts">
	import FirstStep from '$lib/components/Icons/FirstStep.svelte';
	import LastStep from '$lib/components/Icons/LastStep.svelte';
	import NextStep from '$lib/components/Icons/NextStep.svelte';
	import PreviousStep from '$lib/components/Icons/PreviousStep.svelte';
	import Reset from '$lib/components/Icons/Reset.svelte';
	import StartAutoPlay from '$lib/components/Icons/StartAutoPlay.svelte';
	import StopAutoPlay from '$lib/components/Icons/StopAutoPlay.svelte';
	import type { NavAction } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();
</script>

<div class="algo-nav-buttons">
	<button type="button" title="Reset" on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'RESET' })}
		><div class="icon reset-icon"><Reset /></div></button
	>
	<button
		type="button"
		title="Start AutoPlay"
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'START_AUTO_PLAY' })}
		><div class="icon play-icon"><StartAutoPlay /></div></button
	>
	<button
		type="button"
		title="Stop AutoPlay"
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'STOP_AUTO_PLAY' })}
		><div class="icon"><StopAutoPlay /></div></button
	>
	<button
		type="button"
		title="Go To First Step"
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_FIRST_STEP' })}
		><div class="icon first-icon"><FirstStep /></div></button
	>
	<button
		type="button"
		title="Go To Previous Step"
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_PREV_STEP' })}
		><div class="icon step-icon"><PreviousStep /></div></button
	>
	<button
		type="button"
		title="Go To Next Step"
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_NEXT_STEP' })}
		><div class="icon step-icon"><NextStep /></div></button
	>
	<button
		type="button"
		title="Go To Last Step"
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
		padding: 6px 11px;
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
