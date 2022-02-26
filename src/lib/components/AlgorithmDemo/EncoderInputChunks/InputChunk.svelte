<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { EncoderInputChunk } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let chunk: EncoderInputChunk;
	export let chunkNumber: number;
	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;

	$: chunkIndex = chunkNumber - 1;
	$: chunkColor = rotatingColors[chunkIndex % rotatingColors.length];
	$: currentChunk = $state.context.chunkIndex;
	$: stateName = $state.toStrings().join(' ');
	$: chunkMappingInProgress =
		!stateName.includes('idle') && stateName.includes('mapChunkBytesToBase64') && currentChunk === chunkIndex;
	$: currentChunkColor = chunkMappingInProgress ? chunkColor : '--white1';
</script>

<div
	class="input-chunk"
	data-chunk-id={chunkNumber}
	data-bin={chunk.binary}
	data-hex={chunk.hex}
	data-ascii={chunk.ascii}
>
	<div class="chunk-id" data-chunk-id={chunkNumber}>
		<span class="letter-H" style="color: var({chunkColor});">H</span>
		<span class="chunk-number" style="color: var({chunkColor});">{chunkNumber}</span>
	</div>
	{#each chunk.inputMap as map, byteNumber}
		<div
			class="chunk-byte"
			data-chunk-id={chunkNumber}
			data-ascii={map.ascii}
			data-byte-id="chunk-{chunkNumber}-byte-{byteNumber + 1}"
			data-hex="{map.hex_word1}{map.hex_word2}"
			data-bin="{map.bin_word1}{map.bin_word1}"
			class:mapping={chunkMappingInProgress}
			style="color: var({currentChunkColor});"
		>
			<div
				class="chunk-byte-word-1"
				data-chunk-id={chunkNumber}
				data-byte-id="chunk-{chunkNumber}-byte-{byteNumber + 1}"
				data-hex={map.hex_word1}
				data-bin={map.bin_word1}
			>
				{#each map.bin_word1 as bit}
					<code class="bit"><span>{bit}</span></code>
				{/each}
			</div>
			<div
				class="chunk-byte-word-2"
				data-chunk-id={chunkNumber}
				data-byte-id="chunk-{chunkNumber}-byte-{byteNumber + 1}"
				data-hex={map.hex_word2}
				data-bin={map.bin_word2}
				style="color: var({currentChunkColor});"
			>
				{#each map.bin_word2 as bit}
					<code class="bit"><span>{bit}</span></code>
				{/each}
			</div>
		</div>
	{/each}
	{#if chunk.isPadded}
		{#each Array.from({ length: chunk.padLength }, () => 0) as padBit}
			<code class="bit pad-bit"><span>{padBit}</span></code>
		{/each}
	{/if}
</div>

<style lang="postcss">
	.input-chunk,
	.chunk-byte,
	.chunk-byte-word-1,
	.chunk-byte-word-2 {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 11px;
	}
	.chunk-id {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		width: 18px;
	}
	.letter-H,
	.chunk-number {
		font-size: 10px;
		font-style: italic;
	}
	.letter-H {
		margin: 0 1px 0 0;
		align-self: center;
	}
	.chunk-number {
		margin: 0 2px 0 0;
		align-self: end;
	}
	.bit {
		background-color: var(--dark-gray3);
		line-height: 1;
		text-align: center;
		padding: 2px 0;
		border: 0.5px solid var(--black2);
		width: 14px;
	}
	.mapping .bit {
		font-weight: 500;
		background-color: var(--black1);
		transition-property: color, background-color;
		transition-timing-function: ease-in-out;
		transition-duration: 0.35s;
	}
	.bit span {
		margin: auto;
	}
	code {
		white-space: pre;
	}
	.pad-bit {
		color: var(--dark-gray2);
		background-color: var(--black1);
	}
</style>
