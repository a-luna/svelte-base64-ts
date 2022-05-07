<script lang="ts">
	import LinkedLabel from '$lib/components/AlgorithmDemo/Buttons/LinkedLabel.svelte';
	import type { B64EncodingMachineState } from '$lib/types';
	import { slide } from 'svelte/transition';

	export let state: B64EncodingMachineState;
</script>

{#if $state.matches('inactive') || $state.matches({ validateInputText: 'error' })}
	<div transition:slide class="open-help-docs">
		<LinkedLabel name={'help-docs-button-demo-text'} tooltip={'Open Help Docs'} on:click>
			<span>
				Click here to view the help docs if you are unfamiliar with Base64 encoding or other concepts like ASCII, hex vs
				binary values, etc.
			</span>
		</LinkedLabel>
	</div>
{/if}

<style lang="postcss">
	.open-help-docs {
		font-size: 0.75rem;
		line-height: 1.7;
		letter-spacing: 0.3px;
		border: 1px solid var(--nav-button-autoplay-bg-color);
		border-radius: 6px;
		padding: 0.5rem;
		background-color: var(--black2);
		margin: 1rem 0 0 0;

		grid-column: 1 / span 3;
		grid-row: 6 / span 1;
	}

	@media screen and (min-width: 730px) {
		.open-help-docs {
			font-size: 0.85rem;

			grid-column: 1 / span 3;
			grid-row: 5 / span 1;
		}
	}
</style>
