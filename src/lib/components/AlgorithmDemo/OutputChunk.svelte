<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { OutputChunk, XStateMachineState } from '$lib/types';
	import { getBase64CharIndexFromGroupId } from '$lib/util';
	import { slide } from 'svelte/transition';

	export let state: XStateMachineState;
	export let chunk: OutputChunk;
	export let chunkIndex: number;

	$: chunkNumber = chunkIndex + 1;
	$: chunkColor = rotatingColors[chunkIndex % rotatingColors.length];
	$: currentInputChunk = $state.context.inputChunkIndex;
	$: currentOutputChunk = $state.context.outputChunkIndex;
	$: stateName = $state.toStrings().join(' ');
	$: inputChunkMappingInProgress =
		$state.matches({ createInputChunks: 'autoPlayCreateInputChunk' }) ||
		$state.matches({ createInputChunks: 'createInputChunk' }) ||
		$state.matches({ createInputChunks: 'createLastPaddedChunk' });
	$: outputChunkMappingInProgress =
		$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createdAllOutputChunks' });
	$: currentInputChunkIsMapped = inputChunkMappingInProgress && currentInputChunk === chunkIndex;
	$: currentOutputChunkIsMapped = outputChunkMappingInProgress && currentOutputChunk === chunkIndex;
	$: currentChunkIsMapped = currentInputChunkIsMapped || currentOutputChunkIsMapped;
	$: currentChunkColor = currentChunkIsMapped ? chunkColor : '--black1';

	const getBase64CharColor = (groupId: string): string =>
		rotatingColors[getBase64CharIndexFromGroupId(groupId) % rotatingColors.length];
	const highlightBitGroup = (base64CharIndex: number, groupId: string): boolean =>
		!stateName.includes('idle') &&
		stateName.includes('encodeOutput') &&
		base64CharIndex === getBase64CharIndexFromGroupId(groupId);
	const getCurrentBitGroupColor = (base64CharIndex: number, groupId: string): string =>
		highlightBitGroup(base64CharIndex, groupId) ? getBase64CharColor(groupId) : currentChunkColor;
	const getCurrentBitGroupOutlineStyle = (base64CharIndex: number, groupId: string, isPad: boolean): string =>
		isPad && highlightBitGroup(base64CharIndex, groupId)
			? ` outline: 1px dotted var(${getCurrentBitGroupColor(base64CharIndex, groupId)})`
			: '';
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
		<span class="chunk-label" style="color: var({chunkColor});">OUT</span>
		<span class="chunk-number" style="color: var({chunkColor});">{chunkNumber}</span>
	</div>
	{#each chunk.base64Map as map}
		<div
			class="chunk-byte"
			data-chunk-id={chunkNumber}
			data-bit-group={map.groupId}
			data-dec={map.dec}
			data-bin={map.bin}
			data-b64={map.b64}
			class:mapping={highlightBitGroup($state.context.base64CharIndex, map.groupId)}
			style="color: var({getCurrentBitGroupColor(
				$state.context.base64CharIndex,
				map.groupId,
			)});{getCurrentBitGroupOutlineStyle($state.context.base64CharIndex, map.groupId, map.isPad)}"
		>
			{#if !map.isPad}
				{#each map.bitGroups as bitGroup}
					<div class="hex-bit-group" data-bit-group={bitGroup.groupId}>
						{#each bitGroup.bits as bit}
							<code class="bit" class:pad-bit={map.isPad}><span>{bit}</span></code>
						{/each}
					</div>
				{/each}
			{:else}
				<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
				<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
				<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
				<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
				<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
				<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			{/if}
		</div>
	{/each}
</div>
