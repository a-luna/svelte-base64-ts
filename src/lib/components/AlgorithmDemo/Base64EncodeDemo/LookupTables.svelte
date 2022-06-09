<script lang="ts">
	import AsciiLookupTable from '$lib/components/LookupTables/AsciiLookupTable.svelte';
	import Base64LookupTable from '$lib/components/LookupTables/Base64LookupTable.svelte';
	import type { Base64Encoding,EncodingMachineStateStore } from '$lib/types';
	import type { DemoStore } from '$lib/types/DemoStore';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	
	export let outputBase64Encoding: Base64Encoding;
	export let highlightHexByte: number;
	export let highlightBase64: string;
	let pageWidth: number;

	let state: EncodingMachineStateStore;
	let demoState: Readable<DemoStore>;
	({ state, demoState } = getContext('demo'));

	$: tableChunkSize = pageWidth < 730 ? 32 : 16;
</script>

<svelte:window bind:innerWidth={pageWidth} />

{#if $demoState.showAsciiTable}
	<div transition:fade class="ascii-table">
		<AsciiLookupTable asciiTableChunkSize={tableChunkSize} {highlightHexByte} fontSize={'0.65rem'} />
	</div>
{:else if $demoState.showBase64Table}
	<div transition:fade class="base64-table">
		<Base64LookupTable
			base64Encoding={outputBase64Encoding}
			base64TableChunkSize={tableChunkSize}
			{highlightBase64}
			fontSize={'0.65rem'}
		/>
	</div>
<!-- {:else if !$state.matches('finished')}
	<div class="placeholder" style="width: 292px" /> -->
{/if}

<style lang="postcss">
	.ascii-table,
	.base64-table {
		flex: 0 1 auto;
		margin: 0 auto;
		width: min-content;
	}
</style>
