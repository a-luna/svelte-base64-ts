<script lang="ts">
	import LinkedLabel from '$lib/components/AlgorithmDemo/Buttons/LinkedLabel.svelte';
	import type { EncodingMachineStateStore } from '$lib/types';
	import { getContext } from 'svelte';

	let state: EncodingMachineStateStore;
	({ state } = getContext('demo'));
</script>

{#if !$state.matches('inactive') && !$state.matches({ validateInputText: 'error' })}
	<div class="help-docs-button-wrapper">
		<LinkedLabel name="help-docs-button-input-form" tooltip="Open Help Docs" on:click>Help Docs</LinkedLabel>
	</div>
{/if}

<style lang="postcss">
	.help-docs-button-wrapper {
		font-size: 0.75rem;

		justify-self: center;
		grid-column: 3 / span 1;
		grid-row: 1 / span 1;
	}

	@media screen and (min-width: 762px) {
		.help-docs-button-wrapper {
			justify-self: flex-end;
		}
	}
</style>
