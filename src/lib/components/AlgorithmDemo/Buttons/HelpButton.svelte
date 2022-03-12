<script lang="ts">
	import Help from '$lib/components/Icons/Help.svelte';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;

	$: autoplay = $state.context.autoplay;
</script>

<button id="help" disabled={autoplay} on:click title="Click to view instructions/keyboard shortcuts">
	<Help />
</button>

<style lang="postcss">
	#help {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--nav-button-border-color);
		border-radius: 9999px;
		padding: 6px 5px;
	}

	#help:focus,
	#help:active,
	#help:active:focus {
		border: 1px solid var(--nav-button-active-border-color);
		outline: 0;
	}

	#help:disabled,
	#help:disabled:hover,
	#help:disabled:focus,
	#help:disabled:active,
	#help:disabled:active:focus {
		border: 1px solid var(--button-disabled-border-color);
	}
</style>
