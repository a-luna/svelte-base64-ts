<script lang="ts">
	import LastStep from '$lib/components/Icons/LastStep.svelte';
	import type { NavAction } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = $state.context.autoplay;
</script>

<button
	type="button"
	title="Go To Last Step"
	class:idle={autoplay}
	disabled={autoplay || !$state.can('GO_TO_LAST_STEP')}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'GO_TO_LAST_STEP' })}
>
	<div class="icon last-icon">
		<LastStep />
	</div>
</button>

<style lang="postcss">
	.algo-nav-buttons button .icon.last-icon {
		width: 13px;
	}
</style>
