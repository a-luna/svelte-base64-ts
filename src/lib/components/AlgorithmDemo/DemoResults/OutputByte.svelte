<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { Base64ByteMap, DemoState, EncodingMachineStateStore } from '$lib/types';
	import { getChunkIndexFromBase64CharIndex, getHexByteIndexFromGroupId } from '$lib/util';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let charIndex: number;
	export let b64: Base64ByteMap;
	let state: EncodingMachineStateStore;
	let demoUIState: Writable<DemoState>;
	({ state, demoUIState } = getContext('demo'));

	$: b64CharNumber = charIndex + 1;
	$: byteDisplayChar = b64.isPad ? '&nbsp;' : 'B';
	$: byteDisplayNumber = b64.isPad ? '&nbsp;' : `${b64CharNumber}`;
	$: chunkIndex = getChunkIndexFromBase64CharIndex(charIndex);
	$: chunkNumber = chunkIndex + 1;
	$: chunkColor = rotatingColors[chunkIndex % rotatingColors.length];
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
	$: chunkMappingInProgress = inputChunkMappingInProgress || outputChunkMappingInProgress;
	$: currentInputChunkIsMapped = inputChunkMappingInProgress && currentInputChunk === chunkIndex;
	$: currentOutputChunkIsMapped = outputChunkMappingInProgress && currentOutputChunk === chunkIndex;
	$: currentChunkIsMapped = currentInputChunkIsMapped || currentOutputChunkIsMapped;
	$: currentChunkColor = currentChunkIsMapped ? chunkColor : '--black1';

	$: b64CharColor = rotatingColors[charIndex % rotatingColors.length];
	$: currentB64Char = $state.context.base64CharIndex;
	$: b64MappingInProgress =
		$state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodingComplete' });
	$: currentB64CharIsMapped = b64MappingInProgress && currentB64Char === charIndex;
	$: currentB64CharIsHovered = $state.matches('verifyResults') && $demoUIState.highlightBase64BitGroup === b64.groupId;
	$: currentB64CharColor = currentB64CharIsMapped || currentB64CharIsHovered ? b64CharColor : currentChunkColor;
	$: currentB64CharIdColor =
		currentB64CharIsMapped || currentB64CharIsHovered
			? b64CharColor
			: $state.matches('finished')
			? chunkColor
			: '--light-gray3';
	$: currentPadOutline =
		currentB64CharIsMapped || currentB64CharIsHovered ? `1px dotted var(${currentB64CharColor})` : 'none';

	function getBase64DecimalValue() {
		return b64.isPad ? '' : b64.dec < 10 ? `&nbsp;${b64.dec}` : b64.dec;
	}

	const bitGroupIsHovered = (currentGroupId: string, checkGroupId: string): boolean =>
		$state.matches('verifyResults') && currentGroupId === checkGroupId;
	const getHexByteColor = (groupId: string): string =>
		rotatingColors[getHexByteIndexFromGroupId(groupId) % rotatingColors.length];
	const getCurrentBitGroupColor = (currentGroupId: string, checkGroupId: string): string =>
		bitGroupIsHovered(currentGroupId, checkGroupId) ? getHexByteColor(checkGroupId) : currentB64CharColor;
</script>

<div class="b64Char-id" data-b64char-number={b64CharNumber} style="color: var({currentB64CharIdColor});">
	<span class="letter-B">{@html byteDisplayChar}</span>
	<span class="b64Char-number">{@html byteDisplayNumber}</span>
</div>
<span class="base64" data-b64={b64.b64}>{b64.b64}</span>
<span class="dec" data-dec={b64.isPad ? 'null' : b64.dec}>{@html getBase64DecimalValue()}</span>
<div class="base64-char" data-chunk-id={chunkNumber} class:mapping={chunkMappingInProgress}>
	{#if !b64.isPad}
		{#each b64.bitGroups as bitGroup}
			<div
				class="hex-bit-group"
				data-bit-group={bitGroup.groupId}
				class:mapping={currentB64CharIsMapped}
				style="color: var({getCurrentBitGroupColor($demoUIState.highlightHexBitGroup, bitGroup.groupId)});"
			>
				{#each bitGroup.bits as bit}
					<code class="bit"><span>{bit}</span></code>
				{/each}
			</div>
		{/each}
	{:else}
		<div class="hex-bit-group pad-char" class:mapping={currentB64CharIsMapped} style="outline: {currentPadOutline};">
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		</div>
	{/if}
</div>
