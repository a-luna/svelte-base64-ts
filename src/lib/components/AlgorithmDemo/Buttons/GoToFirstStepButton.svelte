<script lang="ts">
	import FirstStep from '$lib/components/Icons/FirstStep.svelte';
	import type { NavAction } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>> = null;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = state ? $state.context.autoplay : false;
	$: disabled = state ? !$state.can('GO_TO_FIRST_STEP') : false;
</script>

<button
	type="button"
	title="Go To First Step"
	disabled={autoplay || disabled}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_FIRST_STEP' })}
>
	<div class="icon first-icon">
		<FirstStep />
	</div>
</button>

<style lang="postcss">
	.algo-nav-buttons button .icon.first-icon {
		width: 13px;
	}
</style>
