<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { OutputChunk } from '$lib/types';
	import { getBase64CharIndexFromGroupId } from '$lib/util';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;
	export let chunk: OutputChunk;
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
	transition:slide
	class="output-chunk"
	data-chunk-id={chunkNumber}
	data-bin={chunk.binary}
	data-hex={chunk.hex}
	data-ascii={chunk.ascii}
>
	<div class="chunk-id" data-chunk-id={chunkNumber}>
		<span class="chunk-label" style="color: var({chunkColor});">Out</span>
		<span class="chunk-number" style="color: var({chunkColor});">{chunkNumber}</span>
	</div>
	{#each chunk.base64Map as map}
		<div
			class="base64-char"
			data-chunk-id={chunkNumber}
			data-bit-group={map.groupId}
			data-dec={map.dec}
			data-bin={map.bin}
			data-b64={map.b64}
			class:mapping={highlightBitGroup($state.context.base64CharIndex, map.groupId)}
			style="color: var({getCurrentBitGroupColor($state.context.base64CharIndex, map.groupId)});"
		>
			{#each map.bitGroups as bitGroup}
				<div class="hex-bit-group" data-bit-group={bitGroup.groupId}>
					{#each bitGroup.bits as bit}
						<code class="bit" class:pad-bit={map.isPad}><span>{bit}</span></code>
					{/each}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	.output-chunk,
	.base64-char,
	.hex-bit-group {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 11px;
	}
	.output-chunk {
		margin: 0 0 0.5rem 0;
	}
	.chunk-id {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		width: 22px;
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
	.base64-char {
		margin: 0 0.5rem 0 0;
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
