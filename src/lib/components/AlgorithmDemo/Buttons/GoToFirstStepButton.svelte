<script lang="ts">
	import FirstStep from '$lib/components/Icons/FirstStep.svelte';
	import type { EncodingMachineStateStore } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';

	export let state: EncodingMachineStateStore;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: EncodingEvent } }>();

	$: autoplay = $state?.context.autoplay ?? false;
	$: disabled = !$state?.can('GO_TO_FIRST_STEP') ?? false;
</script>

<button
	type="button"
	title="Go To First Step"
	disabled={autoplay || disabled}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: { type: 'GO_TO_FIRST_STEP' } })}
>
	<div class="icon first-icon">
		<FirstStep />
	</div>
</button>

<style lang="postcss">
	button {
		grid-column: 4 / span 1;
		grid-row: 2 / span 1;
	}
	.algo-nav-buttons button .icon.first-icon {
		width: 13px;
	}
</style>
