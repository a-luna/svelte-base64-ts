<script lang="ts">
	import LinkedLabel from '$lib/components/AlgorithmDemo/Buttons/LinkedLabel.svelte';
	import type { XStateMachineState } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let state: XStateMachineState;
	const openHelpModalEventDispatcher = createEventDispatcher<{ openHelpModal: Record<string, never> }>();

	function openHelpDocsModal() {
		if (!$state.context.autoplay) {
			openHelpModalEventDispatcher('openHelpModal');
		}
	}
</script>

<div class="help-docs-button-wrapper">
	<LinkedLabel name="help-docs-button-input-form" tooltip="Open Help Docs" on:click={() => openHelpDocsModal()}>
		Help Docs
	</LinkedLabel>
</div>

<style lang="postcss">
	.help-docs-button-wrapper {
		justify-self: flex-end;
		grid-column: 3 / span 1;
		grid-row: 1 / span 1;
	}
</style>
