<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import { isTextEncoding } from '$lib/typeguards';
	import type { DemoState, EncodingMachineStateStore, HexByteMap } from '$lib/types';
	import { getBase64CharIndexFromGroupId, getChunkIndexFromByteIndex } from '$lib/util';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let byte: HexByteMap;
	export let byteIndex: number;
	let currentByteColor: string;
	let state: EncodingMachineStateStore;
	let demoUIState: Writable<DemoState>;
	({ state, demoUIState } = getContext('demo'));

	$: inputEncoding = $state.context.input.inputEncoding;
	$: chunkId = getChunkIndexFromByteIndex(byteIndex);
	$: chunkNumber = chunkId + 1;
	$: chunkColor = rotatingColors[chunkId % rotatingColors.length];
	$: currentInputChunk = $state.context.inputChunkIndex;
	$: currentOutputChunk = $state.context.outputChunkIndex;
	$: inputChunkMappingInProgress =
		$state.matches({ createInputChunks: 'autoPlayCreateInputChunk' }) ||
		$state.matches({ createInputChunks: 'createInputChunk' }) ||
		$state.matches({ createInputChunks: 'createLastPaddedChunk' });
	$: outputChunkMappingInProgress =
		$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createLastPaddedChunk' }) ||
		$state.matches({ createOutputChunks: 'createdAllOutputChunks' });
	$: currentInputChunkIsMapped = inputChunkMappingInProgress && currentInputChunk === chunkId;
	$: currentOutputChunkIsMapped = outputChunkMappingInProgress && currentOutputChunk === chunkId;
	$: currentChunkIsMapped = currentInputChunkIsMapped || currentOutputChunkIsMapped;
	$: currentChunkColor = currentChunkIsMapped ? chunkColor : '--light-gray3';

	$: byteNumber = byteIndex + 1;
	$: byteColor = rotatingColors[byteIndex % rotatingColors.length];
	$: currentByte = $state.context.byteIndex;
	$: byteMappingInProgress =
		$state.matches({ encodeInput: 'autoPlayEncodeByte' }) ||
		$state.matches({ encodeInput: 'encodeByte' }) ||
		$state.matches({ encodeInput: 'explainByteMapping' });
	$: currentByteIsMapped = byteMappingInProgress && currentByte === byteIndex;
	$: currentByteIsHovered = $state.matches('verifyResults') && $demoUIState.highlightHexBitGroup === byte.groupId;
	$: b64MappingInProgress = $state.matches('encodeOutput');
	$: currentByteColor =
		currentByteIsMapped || currentByteIsHovered
			? byteColor
			: currentInputChunkIsMapped
			? currentChunkColor
			: '--light-gray3';
	$: currentByteIdColor =
		currentByteIsMapped || currentByteIsHovered
			? byteColor
			: currentChunkIsMapped || b64MappingInProgress || $state.matches('finished')
			? chunkColor
			: '--light-gray3';

	const bitGroupIsHovered = (currentGroupId: string, checkGroupId: string): boolean =>
		$state.matches('verifyResults') && currentGroupId === checkGroupId;
	const getBase64CharColor = (groupId: string): string =>
		rotatingColors[getBase64CharIndexFromGroupId(groupId) % rotatingColors.length];
	const highlightBitGroup = (base64CharIndex: number, groupId: string): boolean =>
		b64MappingInProgress && base64CharIndex === getBase64CharIndexFromGroupId(groupId);
	const getCurrentBitGroupColor = (base64CharIndex: number, currentGroupId: string, checkGroupId: string): string =>
		highlightBitGroup(base64CharIndex, checkGroupId) || bitGroupIsHovered(currentGroupId, checkGroupId)
			? getBase64CharColor(checkGroupId)
			: currentByteColor;
</script>

<div class="byte-id" data-byte-number={byteNumber}>
	<span class="letter-H" style="color: var({currentByteIdColor});">H</span>
	<span class="byte-number" style="color: var({currentByteIdColor});">{byteNumber}</span>
</div>
{#if isTextEncoding(inputEncoding)}
	<span class="char" data-ascii={byte.char}>{@html byte.isWhiteSpace ? '&nbsp;' : byte.char}</span>
{/if}
<span class="hex" data-hex="{byte.hex_word1}{byte.hex_word2}">{byte.hex_word1}{byte.hex_word2}</span>
<div
	class="input-byte"
	data-chunk-id={chunkNumber}
	class:mapping={inputChunkMappingInProgress || byteMappingInProgress}
	style="color: var({currentByteColor});"
>
	{#if byte.bitGroups && byte.bitGroups?.length}
		{#each byte.bitGroups as bitGroup}
			<div
				class="base64-bit-group"
				data-bit-group={bitGroup.groupId}
				class:mapping={highlightBitGroup($state.context.base64CharIndex, bitGroup.groupId)}
				style="color: var({getCurrentBitGroupColor(
					$state.context.base64CharIndex,
					$demoUIState.highlightBase64BitGroup,
					bitGroup.groupId,
				)});"
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
