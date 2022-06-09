<script lang="ts">
	import CollapseDetailsButton from '$lib/components/AlgorithmDemo/Buttons/CollapseDetailsButton.svelte';
	import ExpandDetailsButton from '$lib/components/AlgorithmDemo/Buttons/ExpandDetailsButton.svelte';

	export let sectionName: string;
	export let thisSection: 'none' | 'welcome' | 'settings' | 'navigation';
	export let openSection: 'none' | 'welcome' | 'settings' | 'navigation';
</script>

<summary>
	{#if openSection === thisSection}
		<CollapseDetailsButton />
	{:else}
		<ExpandDetailsButton />
	{/if}
	{sectionName}
</summary>

<style lang="postcss">
	summary {
		display: flex;
		gap: 0.5rem;
	}
</style>
