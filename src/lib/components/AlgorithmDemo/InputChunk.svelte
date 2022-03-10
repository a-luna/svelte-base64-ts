<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { EncoderInputChunk } from '$lib/types';
	import { getBase64CharIndexFromGroupId } from '$lib/util';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;
	export let chunk: EncoderInputChunk;
	export let chunkIndex: number;

	$: chunkNumber = chunkIndex + 1;
	$: chunkColor = rotatingColors[chunkIndex % rotatingColors.length];
	$: stateName = $state.toStrings().join(' ');
	$: highlightChunk =
		!stateName.includes('idle') && stateName.includes('createInputChunks') && $state.context.chunkIndex === chunkIndex;
	$: currentChunkColor = highlightChunk ? chunkColor : '--white1';

	const getBase64CharColor = (groupId: string): string =>
		rotatingColors[getBase64CharIndexFromGroupId(groupId) % rotatingColors.length];
	const highlightBitGroup = (base64CharIndex: number, groupId: string): boolean =>
		!stateName.includes('idle') &&
		stateName.includes('encodeOutputText') &&
		base64CharIndex === getBase64CharIndexFromGroupId(groupId);
	const getCurrentBitGroupColor = (base64CharIndex: number, groupId: string): string =>
		highlightBitGroup(base64CharIndex, groupId) ? getBase64CharColor(groupId) : currentChunkColor;
</script>

<div
	out:slide
	class="input-chunk"
	class:output-mapping={$state.matches('encodeOutputText')}
	data-chunk-id={chunkNumber}
	data-bin={chunk.binary}
	data-hex={chunk.hex}
	data-ascii={chunk.ascii}
>
	<div class="chunk-id" data-chunk-id={chunkNumber}>
		<span class="chunk-label" style="color: var({chunkColor});">In</span>
		<span class="chunk-number" style="color: var({chunkColor});">{chunkNumber}</span>
	</div>
	{#each chunk.inputMap as map}
		<div
			class="chunk-byte"
			data-chunk-id={chunkNumber}
			data-ascii={map.ascii}
			data-bit-group={map.groupId}
			data-hex="{map.hex_word1}{map.hex_word2}"
			data-bin="{map.bin_word1}{map.bin_word1}"
			class:mapping={highlightChunk}
		>
			{#each map.bitGroups as bitGroup}
				<div
					class="base64-bit-group"
					data-bit-group={bitGroup.groupId}
					class:mapping={highlightBitGroup($state.context.base64CharIndex, bitGroup.groupId)}
					style="color: var({getCurrentBitGroupColor($state.context.base64CharIndex, bitGroup.groupId)});"
				>
					{#each bitGroup.bits as bit}
						<code class="bit"><span>{bit}</span></code>
					{/each}
				</div>
			{/each}
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
	.base64-bit-group {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 11px;
	}
	.input-chunk.output-mapping {
		margin: 0 0 0.25rem 0;
	}
	.chunk-id {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		width: 28px;
	}
	.chunk-label,
	.chunk-number {
		font-size: 10px;
		font-style: italic;
	}
	.chunk-label {
		margin: 0 1px 0 0;
		align-self: center;
	}
	.chunk-number {
		margin: 0 2px 0 0;
		align-self: end;
	}
	.chunk-byte {
		margin: 0 0.75rem 0 0;
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
