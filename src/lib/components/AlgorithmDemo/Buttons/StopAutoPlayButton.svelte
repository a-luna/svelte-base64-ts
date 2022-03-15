<script lang="ts">
	import StopAutoPlay from '$lib/components/Icons/StopAutoPlay.svelte';
	import type { NavAction } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>> = null;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: NavAction } }>();

	$: autoplay = state ? $state.context.autoplay : true;
</script>

<button
	type="button"
	title="Stop AutoPlay"
	disabled={!autoplay}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: 'STOP_AUTO_PLAY' })}
>
	<div class="icon">
		<StopAutoPlay />
	</div>
</button>
