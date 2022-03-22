<script lang="ts">
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { State, StateSchema, TypegenDisabled } from 'xstate';

	export let state: Readable<
		State<EncodingContext, EncodingEvent, StateSchema<EncodingContext>, EncodingTypeState, TypegenDisabled>
	>;
	const openHelpModalEventDispatcher = createEventDispatcher<{ openHelpModal: {} }>();

	function openHelpDocsModal() {
		if (!$state.context.autoplay) {
			openHelpModalEventDispatcher('openHelpModal');
		}
	}
</script>

<div class="help-button-wrapper" on:click={() => openHelpDocsModal()}>
	<span class="help-docs-label">Help Docs</span>
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
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.5px;
	}
</style>
