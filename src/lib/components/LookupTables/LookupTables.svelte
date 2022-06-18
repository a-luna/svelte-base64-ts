<script lang="ts">
	import AsciiLookupTable from '$lib/components/LookupTables/AsciiLookupTable.svelte';
	import Base64LookupTable from '$lib/components/LookupTables/Base64LookupTable.svelte';
	import { app } from '$lib/stores/app';
	import { state } from '$lib/stores/state';

	export let asciiTableChunkSize: number;
	export let base64TableChunkSize: number;
</script>

<div class="lookup-tables">
	{#if $app.isAscii}
		<AsciiLookupTable {asciiTableChunkSize} highlightHexByte={$state.highlightHexByte} fontSize={'0.8rem'} />
	{/if}
	<Base64LookupTable
		base64Encoding={$app.base64Encoding}
		{base64TableChunkSize}
		highlightBase64={$state.highlightBase64}
		fontSize={'0.8rem'}
	/>
</div>

<style lang="postcss">
	.lookup-tables {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		gap: 1.5rem;
		margin: 1.5rem 0 0 0;
	}
</style>
