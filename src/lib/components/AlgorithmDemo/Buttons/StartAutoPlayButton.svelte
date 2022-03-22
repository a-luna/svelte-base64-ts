<script lang="ts">
	import StartAutoPlay from '$lib/components/Icons/StartAutoPlay.svelte';
	import type { NavAction } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, StateSchema, TypegenDisabled } from 'xstate';

	export let state: Readable<
		State<EncodingContext, EncodingEvent, StateSchema<EncodingContext>, EncodingTypeState, TypegenDisabled>
	>;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = state ? $state.context.autoplay : false;
</script>

<button
	type="button"
	title="Start AutoPlay"
	disabled={autoplay}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'START_AUTO_PLAY' })}
>
	<div class="icon play-icon">
		<StartAutoPlay />
	</div>
</button>

<style lang="postcss">
	.algo-nav-buttons button .icon.play-icon {
		width: 10px;
	}
</style>
