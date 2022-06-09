<script lang="ts">
	import InputByte from '$lib/components/AlgorithmDemo/Base64EncodeDemo/InputByte.svelte';
	import InputChunk from '$lib/components/AlgorithmDemo/Base64EncodeDemo/InputChunk.svelte';
	import OutputByte from '$lib/components/AlgorithmDemo/Base64EncodeDemo/OutputByte.svelte';
	import OutputBytePlaceholder from '$lib/components/AlgorithmDemo/Base64EncodeDemo/OutputBytePlaceholder.svelte';
	import OutputChunk from '$lib/components/AlgorithmDemo/Base64EncodeDemo/OutputChunk.svelte';
	import type { EncodingMachineStateStore } from '$lib/types';
	import type { DemoStore } from '$lib/types/DemoStore';
	import { getChunkIndexFromBase64CharIndex, getChunkIndexFromByteIndex } from '$lib/util';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let highlightHexByte: number = null;
	export let highlightBase64: string = null;
	let state: EncodingMachineStateStore;
	let demoState: Readable<DemoStore>;
	({ state, demoState } = getContext('demo'));
</script>

{#if $demoState.showInputBytes}
	<h3 class="input-heading">Input</h3>
	<div id="input-hex" class="encoded-bytes">
		<div class="binary-chunks">
			{#each $state.context.updatedByteMaps as byte, byteIndex}
				<div
					transition:fade={{ duration: 200 }}
					class="encoded-byte"
					data-chunk-id={getChunkIndexFromByteIndex(byteIndex) + 1}
					data-byte-number={byteIndex + 1}
					data-bin="{byte.bin_word1}{byte.bin_word2}"
					data-hex="{byte.hex_word1}{byte.hex_word2}"
					data-ascii={byte.ascii}
					on:mouseenter={() => (highlightHexByte = byte.byte)}
					on:mouseleave={() => (highlightHexByte = null)}
				>
					<InputByte {byteIndex} {byte} />
				</div>
			{/each}
		</div>
	</div>
{/if}
{#if $demoState.showInputChunks}
	<div id="hex-b64-mapping" class="binary-chunks data-mapping">
		{#each $state.context.updatedInputChunks as chunk, i}
			<InputChunk {chunk} chunkIndex={i} />
		{/each}
	</div>
{/if}
{#if $demoState.showOutputChunks}
	<div id="hex-b64-mapping" class="binary-chunks data-mapping">
		{#each $state.context.updatedOutputChunks as chunk, i}
			<InputChunk chunk={$state.context.updatedInputChunks[i]} chunkIndex={i} />
			<OutputChunk {chunk} chunkIndex={i} />
		{/each}
	</div>
{/if}
{#if $demoState.showOutputBytePlaceholders}
	<h3 class="output-heading">Output</h3>
	<div id="output-b64" class="encoded-bytes">
		<div class="binary-chunks">
			{#each $state.context.base64Maps as _, charIndex}
				<div
					transition:fade={{ duration: 200 }}
					class="encoded-base64"
					data-chunk-id={getChunkIndexFromBase64CharIndex(charIndex) + 1}
					data-b64char-number={charIndex + 1}
				>
					<OutputBytePlaceholder {charIndex} />
				</div>
			{/each}
		</div>
	</div>
{/if}
{#if $demoState.showOutputBytes}
	<h3 class="output-heading">Output</h3>
	<div id="output-b64" class="encoded-bytes">
		<div class="binary-chunks">
			{#each $state.context.updatedBase64Maps as b64, charIndex}
				<div
					transition:fade={{ duration: 200 }}
					class="encoded-base64"
					data-chunk-id={getChunkIndexFromBase64CharIndex(charIndex) + 1}
					data-b64char-number={charIndex + 1}
					data-b64={b64.b64}
					data-bin={b64.bin}
					data-dec={b64.dec}
					on:mouseenter={() => (highlightBase64 = b64.b64)}
					on:mouseleave={() => (highlightBase64 = null)}
				>
					<OutputByte {charIndex} {b64} />
				</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	h3 {
		font-size: 0.9rem;
		margin: 0;
		text-decoration: underline;
		text-align: center;
		margin: 0.5rem 0;
	}
	h3.input-heading {
		color: var(--pri-color);

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
	}
	#input-hex {
		justify-self: center;

		grid-column: 1 / span 1;
		grid-row: 5 / span 1;
	}
	#hex-b64-mapping {
		margin: 0 0 0.5rem 0;

		grid-column: 1 / span 2;
		grid-row: 3 / span 1;
	}
	h3.output-heading {
		color: var(--sec-color);

		grid-column: 2 / span 1;
		grid-row: 4 / span 1;
	}
	#output-b64 {
		justify-self: center;

		grid-column: 2 / span 1;
		grid-row: 5 / span 1;
	}
	.binary-chunks {
		display: flex;
		flex-flow: column nowrap;
		flex: 0 1 auto;
	}
	.encoded-bytes {
		display: flex;
		flex-flow: column nowrap;
		flex: 0 1 auto;
		justify-self: flex-start;
		gap: 1.5rem;
	}
	@media screen and (min-width: 762px) {
		h3 {
			font-size: 1rem;
		}
		h3.input-heading {
			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
		}
		#input-hex {
			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
		#hex-b64-mapping {
			grid-column: 3 / span 1;
			grid-row: 4 / span 1;
		}
		h3.output-heading {
			grid-column: 5 / span 1;
			grid-row: 3 / span 1;
		}
		#output-b64 {
			grid-column: 5 / span 1;
			grid-row: 4 / span 1;
		}
	}
</style>
