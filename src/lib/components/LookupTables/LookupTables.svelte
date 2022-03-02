<script lang="ts">
	import AsciiLookupTable from '$lib/components/LookupTables/AsciiLookupTable.svelte';
	import { app } from '$lib/stores/app';
	import { state } from '$lib/stores/state';
	import Base64LookupTable from './Base64LookupTable.svelte';

	export let asciiTableChunkSize: number;
	export let base64TableChunkSize: number;
</script>

<div class="lookup-tables">
	{#if $app.isAscii}
		<AsciiLookupTable {asciiTableChunkSize} highlightHexByte={$state.highlightHexByte} />
	{/if}
	<Base64LookupTable {base64TableChunkSize} highlightBase64={$state.highlightBase64} />
</div>

<style lang="postcss">
	.lookup-tables {
		font-size: 0.8rem;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		gap: 1.5rem;
	}
</style>
