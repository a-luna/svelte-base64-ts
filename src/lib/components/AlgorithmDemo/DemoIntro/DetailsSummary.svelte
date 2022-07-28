<script lang="ts">
	import DetailsButton from '$lib/components/AlgorithmDemo/DemoIntro/DetailsButton.svelte';

	export let sectionName: string;
	export let thisSection: 'none' | 'welcome' | 'settings' | 'navigation';
	export let openSection: 'none' | 'welcome' | 'settings' | 'navigation';
</script>

<summary>
	<DetailsButton expanded={openSection === thisSection} />
	{sectionName}
</summary>

<style lang="postcss">
	summary {
		display: flex;
		color: var(--pri-color);
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
		gap: 0.5rem;
		list-style-type: none;
	}

	:global(details[open]) > summary {
		margin: 0 0 0.5rem 0;
	}
	:global(details) > summary::-webkit-details-marker {
		display: none;
	}

	@media screen and (min-width: 762px) {
		summary {
			font-size: 1.1rem;
		}
	}
</style>
