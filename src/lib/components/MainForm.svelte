<script lang="ts">
	import InputForm from '$lib/components/InputForm/InputForm.svelte';
	import LookupTables from '$lib/components/LookupTables/LookupTables.svelte';
	import InputResults from '$lib/components/Results/InputResults.svelte';
	import OutputResults from '$lib/components/Results/OutputResults.svelte';
	import Visualization from '$lib/components/Visualization/Visualization.svelte';
</script>

<div class="base64-wrapper">
	<InputForm />
	<InputResults />
	<OutputResults />
	<Visualization />
	<LookupTables asciiTableChunkSize={32} base64TableChunkSize={26} />
</div>

<style lang="postcss">
	.base64-wrapper {
		display: grid;
		grid-template-columns: 87px auto auto 87px;
		grid-template-rows: 31px auto 31px auto auto 1fr;
		grid-gap: 1rem 0.5rem;

		background-color: var(--page-bg-color);
		max-width: 510px;
		margin: 0 auto;
		padding: 1rem;
	}
</style>
