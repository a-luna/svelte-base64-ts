<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { HexByteMap } from '$lib/types';
	import { getBase64CharIndexFromGroupId } from '$lib/util';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let chunkId: number;
	export let byteNumber: number;
	export let byte: HexByteMap;
	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;

	$: chunkNumber = chunkId + 1;
	$: chunkColor = rotatingColors[chunkId % rotatingColors.length];
	$: currentChunk = $state.context.chunkIndex;
	$: stateName = $state.toStrings().join(' ');
	$: chunkMappingInProgress =
		!stateName.includes('idle') && stateName.includes('createInputChunks') && currentChunk === chunkId;
	$: currentChunkColor = chunkMappingInProgress ? chunkColor : '--white1';

	$: byteIndex = byteNumber - 1;
	$: byteColor = rotatingColors[byteIndex % rotatingColors.length];
	$: currentByte = $state.context.byteIndex;
	$: byteMappingInProgress = stateName.includes('encodeInputText') && currentByte === byteIndex;
	$: currentByteColor = byteMappingInProgress ? byteColor : currentChunkColor;

	const getBase64CharColor = (groupId: string): string =>
		rotatingColors[getBase64CharIndexFromGroupId(groupId) % rotatingColors.length];
	const highlightBitGroup = (base64CharIndex: number, groupId: string): boolean =>
		!stateName.includes('idle') &&
		stateName.includes('encodeOutputText') &&
		base64CharIndex === getBase64CharIndexFromGroupId(groupId);
	const getCurrentBitGroupColor = (base64CharIndex: number, groupId: string): string =>
		highlightBitGroup(base64CharIndex, groupId) ? getBase64CharColor(groupId) : currentByteColor;
</script>

<div class="byte-id" data-byte-number={byteNumber}>
	<span class="letter-H" style="color: var({chunkColor});">H</span>
	<span class="byte-number" style="color: var({chunkColor});">{byteNumber}</span>
</div>
{#if byte.ascii}
	<span class="ascii" data-ascii={byte.ascii}>{@html byte.isWhiteSpace ? '&nbsp;' : byte.ascii}</span>
{/if}
<span class="hex" data-hex="{byte.hex_word1}{byte.hex_word2}">{byte.hex_word1}{byte.hex_word2}</span>
<div
	class="input-byte"
	data-chunk-id={chunkNumber}
	class:mapping={chunkMappingInProgress || byteMappingInProgress}
	style="color: var({currentByteColor});"
>
	{#if byte.bitGroups && byte.bitGroups?.length}
		{#each byte.bitGroups as bitGroup}
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
	{:else}
		{#each byte.bin_word1 as bit}
			<code class="bit"><span>{bit}</span></code>
		{/each}
		{#each byte.bin_word2 as bit}
			<code class="bit"><span>{bit}</span></code>
		{/each}
	{/if}
</div>

<style lang="postcss">
	.input-byte,
	.ascii,
	.hex,
	.base64-bit-group {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 11px;
	}
	.ascii {
		color: var(--pri-color);
		font-size: 12px;
		font-weight: 700;
		width: 15px;
		justify-self: center;
	}
	.hex {
		color: var(--pri-color);
		width: 20px;
		justify-self: center;
	}
	.byte-id {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		width: 2d1px;
		margin: 0 5px 0 0;
	}
	.letter-H,
	.byte-number {
		font-size: 10px;
		font-style: italic;
	}
	.letter-H {
		margin: 0 1px 0 0;
		align-self: center;
	}
	.byte-number {
		margin: 0 2px 0 0;
		align-self: end;
	}
	.input-byte {
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
	span {
		margin: auto;
	}
	code {
		white-space: pre;
	}
</style>
