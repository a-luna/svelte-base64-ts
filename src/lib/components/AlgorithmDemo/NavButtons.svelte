<script lang="ts">
	import type { NavAction } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import FaFastBackward from 'svelte-icons/fa/FaFastBackward.svelte';
	import FaFastForward from 'svelte-icons/fa/FaFastForward.svelte';
	import FaPause from 'svelte-icons/fa/FaPause.svelte';
	import FaPlay from 'svelte-icons/fa/FaPlay.svelte';
	import FaStepBackward from 'svelte-icons/fa/FaStepBackward.svelte';
	import FaStepForward from 'svelte-icons/fa/FaStepForward.svelte';
	import FaUndoAlt from 'svelte-icons/fa/FaUndoAlt.svelte';

	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();
</script>

<div class="algo-nav-buttons">
	<!-- <PushableButton size={'xs'} {color} on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'reset' })}>
		<div class="icon"><FaUndoAlt /></div>
	</PushableButton>

	<PushableButton size={'xs'} {color} on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'first' })}>
		<div class="icon"><FaFastBackward /></div>
	</PushableButton>
	<PushableButton
		size={'xs'}
		{color}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'previous' })}
	>
		<div class="icon"><FaStepBackward /></div>
	</PushableButton>

	<PushableButton
		size={'xs'}
		{color}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'stop-autoplay' })}
	>
		<div class="icon"><FaPause /></div>
	</PushableButton>
	<PushableButton
		size={'xs'}
		{color}
		on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'start-autoplay' })}
	>
		<div class="icon"><FaPlay /></div>
	</PushableButton>

	<PushableButton size={'xs'} {color} on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'next' })}>
		<div class="icon"><FaStepForward /></div>
	</PushableButton>
	<PushableButton size={'xs'} {color} on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'last' })}>
		<div class="icon"><FaFastForward /></div>
	</PushableButton> -->

	<button type="button" on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'reset' })}
		><div class="icon"><FaUndoAlt /></div></button
	>
	<button type="button" on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'start-autoplay' })}
		><div class="icon"><FaPlay /></div></button
	>
	<button type="button" on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'stop-autoplay' })}
		><div class="icon"><FaPause /></div></button
	>
	<button type="button" on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'first' })}
		><div class="icon"><FaFastBackward /></div></button
	>
	<button type="button" on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'previous' })}
		><div class="icon"><FaStepBackward /></div></button
	>
	<button type="button" on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'next' })}
		><div class="icon"><FaStepForward /></div></button
	>
	<button type="button" on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'last' })}
		><div class="icon"><FaFastForward /></div></button
	>
</div>

<style lang="postcss">
	.algo-nav-buttons {
		display: grid;
		grid-template-columns: repeat(8, auto);
		grid-gap: 0.5rem;
	}
	button {
		width: 30px;
		padding: 5px 8px;
		color: var(--black4);
		background-color: var(--yellow3);
		border-radius: 6px;
	}
	.icon {
		width: 13px;
		margin: auto;
	}
</style>
