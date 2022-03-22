<script lang="ts">
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;
	const openHelpModalEventDispatcher = createEventDispatcher<{ openHelpModal: {} }>();

	function openHelpDocsModal() {
		if (!$state.context.autoplay) {
			openHelpModalEventDispatcher('openHelpModal');
		}
	}
</script>

<div class="help-button-wrapper" on:click={() => openHelpDocsModal()}>
	<span class="help-docs-label">View Help Docs</span>
</div>

<style lang="postcss">
	.help-button-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-self: flex-end;
		gap: 1rem;

		cursor: pointer;
		line-height: 1;
		color: var(--nav-button-autoplay-bg-color);

		grid-column: 3 / span 1;
		grid-row: 1 / span 1;
	}
	.help-button-wrapper:hover {
		color: var(--sec-color);
	}
	.help-docs-label {
		font-size: 0.8rem;
		font-style: italic;
		letter-spacing: 0.4px;
	}
</style>
