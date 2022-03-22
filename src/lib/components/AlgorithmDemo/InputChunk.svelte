<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { EncoderInputChunk } from '$lib/types';
	import { getBase64CharIndexFromGroupId } from '$lib/util';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import type { State, StateSchema, TypegenDisabled } from 'xstate';

	export let state: Readable<
		State<EncodingContext, EncodingEvent, StateSchema<EncodingContext>, EncodingTypeState, TypegenDisabled>
	>;
	export let chunk: EncoderInputChunk;
	export let chunkIndex: number;

	$: chunkNumber = chunkIndex + 1;
	$: chunkColor = rotatingColors[chunkIndex % rotatingColors.length];
	$: stateName = $state.toStrings().join(' ');
	$: highlightChunk =
		!stateName.includes('idle') && stateName.includes('createInputChunks') && $state.context.chunkIndex === chunkIndex;
	$: currentChunkColor = highlightChunk ? chunkColor : '--light-gray3';
	$: finalBase64GroupId = chunk.inputMap.slice(-1)[0].bitGroups.slice(-1)[0].groupId;

	const getBase64CharColor = (groupId: string): string =>
		rotatingColors[getBase64CharIndexFromGroupId(groupId) % rotatingColors.length];
	const highlightBitGroup = (base64CharIndex: number, groupId: string): boolean =>
		!stateName.includes('idle') &&
		stateName.includes('encodeOutputText') &&
		base64CharIndex === getBase64CharIndexFromGroupId(groupId);
	const getCurrentBitGroupColor = (base64CharIndex: number, groupId: string, padding = false): string =>
		highlightBitGroup(base64CharIndex, groupId)
			? getBase64CharColor(groupId)
			: highlightChunk && !padding
			? chunkColor
			: highlightChunk && padding
			? '--white1'
			: '--light-gray3';
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
		<div
			class="base64-bit-group"
			data-bit-group={finalBase64GroupId}
			class:mapping={highlightBitGroup($state.context.base64CharIndex, finalBase64GroupId)}
			style="color: var({getCurrentBitGroupColor($state.context.base64CharIndex, finalBase64GroupId, true)});"
		>
			{#each Array.from({ length: chunk.padLength }, () => 0) as padBit}
				<code class="bit pad-bit"><span>{padBit}</span></code>
			{/each}
		</div>
	{/if}
</div>
