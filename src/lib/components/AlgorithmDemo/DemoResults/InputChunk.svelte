<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { DemoState, EncoderInputChunk, EncodingMachineStateStore } from '$lib/types';
	import { getBase64CharIndexFromGroupId, getHexByteIndexFromGroupId } from '$lib/util';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	export let chunk: EncoderInputChunk;
	export let chunkIndex: number;
	let state: EncodingMachineStateStore;
	let demoUIState: Writable<DemoState>;
	({ state, demoUIState } = getContext('demo'));

	$: chunkNumber = chunkIndex + 1;
	$: chunkColor = rotatingColors[chunkIndex % rotatingColors.length];
	$: chunkMappingInProgress =
		$state.matches({ createInputChunks: 'autoPlayCreateInputChunk' }) ||
		$state.matches({ createInputChunks: 'createInputChunk' }) ||
		$state.matches({ createInputChunks: 'createLastPaddedChunk' });
	$: highlightChunk = chunkMappingInProgress && $state.context.inputChunkIndex === chunkIndex;
	$: finalBase64GroupId = chunk.inputMap.slice(-1)[0].bitGroups.slice(-1)[0].groupId;
	$: highlightPadBits = chunk.isPadded && $state.matches({ createInputChunks: 'explainLastPaddedChunk' });
	$: byteMappingInProgress =
		$state.matches({ encodeInput: 'autoPlayEncodeByte' }) ||
		$state.matches({ encodeInput: 'encodeByte' }) ||
		$state.matches({ encodeInput: 'explainByteMapping' });

	const bitGroupIsHovered = (currentGroupId: string, checkGroupId: string): boolean =>
		$state.matches('verifyResults') && currentGroupId === checkGroupId;

	const getHexByteColor = (groupId: string): string =>
		rotatingColors[getHexByteIndexFromGroupId(groupId) % rotatingColors.length];

	const getBase64CharColor = (groupId: string): string =>
		rotatingColors[getBase64CharIndexFromGroupId(groupId) % rotatingColors.length];
	const highlightBitGroup = (base64CharIndex: number, groupId: string): boolean =>
		byteMappingInProgress && base64CharIndex === getBase64CharIndexFromGroupId(groupId);
	const getCurrentB64BitGroupColor = (
		base64CharIndex: number,
		currentHexGroupId: string,
		checkHexGroupId: string,
		currentB64GroupId: string,
		checkB64GroupId: string,
		padding = false,
	): string =>
		highlightBitGroup(base64CharIndex, checkB64GroupId) || bitGroupIsHovered(currentB64GroupId, checkB64GroupId)
			? getBase64CharColor(checkB64GroupId)
			: bitGroupIsHovered(currentHexGroupId, checkHexGroupId)
			? getHexByteColor(checkHexGroupId)
			: highlightChunk && !padding
			? chunkColor
			: highlightChunk && padding
			? '--white1'
			: '--gray3';
</script>

<div
	out:slide
	class="input-chunk"
	data-chunk-id={chunkNumber}
	data-bin={chunk.binary}
	data-hex={chunk.hex}
	data-ascii={chunk.ascii}
	class:mapping={highlightChunk}
>
	<div class="chunk-id" data-chunk-id={chunkNumber}>
		<span class="chunk-label" style="color: var({chunkColor});">IN</span>
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
		>
			{#each map.bitGroups as bitGroup}
				<div
					class="base64-bit-group"
					data-bit-group={bitGroup.groupId}
					style="color: var({getCurrentB64BitGroupColor(
						$state.context.base64CharIndex,
						$demoUIState.highlightHexBitGroup,
						map.groupId,
						$demoUIState.highlightBase64BitGroup,
						bitGroup.groupId,
					)});"
				>
					{#each bitGroup.bits as bit}
						<code class="bit"><span>{bit}</span></code>
					{/each}
				</div>
			{/each}
		</div>
	{/each}
	{#if chunk.isPadded}
		<div
			class="base64-bit-group"
			data-bit-group={finalBase64GroupId}
			class:explain={highlightPadBits}
			style="color: var({getCurrentB64BitGroupColor(
				$state.context.base64CharIndex,
				$demoUIState.highlightHexBitGroup,
				'never',
				$demoUIState.highlightBase64BitGroup,
				finalBase64GroupId,
				true,
			)});"
		>
			{#each Array.from({ length: chunk.padLength }, () => 0) as padBit}
				<code class="bit pad-bit"><span>{padBit}</span></code>
			{/each}
		</div>
	{/if}
</div>
