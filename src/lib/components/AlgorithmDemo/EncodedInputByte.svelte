<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { HexByteMap } from '$lib/types';
	import { getBase64CharIndexFromGroupId, getChunkIndexFromByteIndex } from '$lib/util';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let byte: HexByteMap;
	export let byteIndex: number;
	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;

	$: chunkId = getChunkIndexFromByteIndex(byteIndex);
	$: chunkNumber = chunkId + 1;
	$: chunkColor = rotatingColors[chunkId % rotatingColors.length];
	$: currentChunk = $state.context.chunkIndex;
	$: stateName = $state.toStrings().join(' ');
	$: chunkMappingInProgress =
		!stateName.includes('idle') && stateName.includes('createInputChunks') && currentChunk === chunkId;
	$: currentChunkColor = chunkMappingInProgress ? chunkColor : '--light-gray3';

	$: byteNumber = byteIndex + 1;
	$: byteColor = rotatingColors[byteIndex % rotatingColors.length];
	$: currentByte = $state.context.byteIndex;
	$: byteMappingInProgress =
		!stateName.includes('idle') && stateName.includes('encodeInputText') && currentByte === byteIndex;
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
