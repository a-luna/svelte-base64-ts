<script lang="ts">
	import InputForm from '$lib/components/InputForm/InputForm.svelte';
	import InputResults from '$lib/components/Results/InputResults.svelte';
	import LookupTables from '$lib/components/Results/LookupTables/LookupTables.svelte';
	import OutputResults from '$lib/components/Results/OutputResults.svelte';
	import Visualization from '$lib/components/Visualization/Visualization.svelte';
</script>

<div class="base64-wrapper">
	<div class="base64">
		<InputForm />
		<InputResults />
		<OutputResults />
		<Visualization />
	</div>
	<LookupTables asciiTableChunkSize={32} base64TableChunkSize={26} />
</div>

<style lang="postcss">
	.base64-wrapper {
		background-color: var(--page-bg-color);
		max-width: 510px;
		margin: 0 auto;
		padding: 1.5rem 1rem 1rem 1rem;
	}
	.base64 {
		display: grid;
		grid-template-columns: 87px 1fr 1fr 87px;
		grid-template-rows: 78px auto 31px auto auto 1fr;
		grid-gap: 1rem 0.5rem;
	}
	@media screen and (min-width: 525px) {
		.base64 {
			grid-template-rows: 31px auto 31px auto auto 1fr;
		}
	}
</style>
