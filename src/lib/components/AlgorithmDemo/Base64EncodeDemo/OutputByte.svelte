<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { Base64ByteMap, EncodingMachineStateStore } from '$lib/types';
	import { getChunkIndexFromBase64CharIndex } from '$lib/util';

	export let charIndex: number;
	export let b64: Base64ByteMap;
	export let state: EncodingMachineStateStore;

	$: chunkId = getChunkIndexFromBase64CharIndex(charIndex);
	$: chunkNumber = chunkId + 1;
	$: chunkColor = rotatingColors[chunkId % rotatingColors.length];
	$: currentChunk = $state.context.inputChunkIndex;
	$: chunkMappingInProgress =
		$state.matches({ createInputChunks: 'autoPlayCreateInputChunk' }) ||
		$state.matches({ createInputChunks: 'createInputChunk' }) ||
		$state.matches({ createInputChunks: 'createLastPaddedChunk' });
	$: currentChunkIsMapped = chunkMappingInProgress && currentChunk === chunkId;
	$: currentChunkColor = currentChunkIsMapped ? chunkColor : '--black1';

	$: b64CharNumber = charIndex + 1;
	$: b64CharColor = rotatingColors[charIndex % rotatingColors.length];
	$: currentB64Char = $state.context.base64CharIndex;
	$: b64MappingInProgress =
		$state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodingComplete' });
	$: currentB64CharIsMapped = b64MappingInProgress && currentB64Char === charIndex;
	$: currentB64CharColor = currentB64CharIsMapped ? b64CharColor : currentChunkColor;
	$: currentB64CharIdColor = currentB64CharIsMapped
		? b64CharColor
		: $state.matches('finished')
		? chunkColor
		: '--light-gray3';

	function getBase64DecimalValue() {
		return b64.isPad ? '' : b64.dec < 10 ? `&nbsp;${b64.dec}` : b64.dec;
	}
</script>

<div class="b64Char-id" data-b64char-number={b64CharNumber} style="color: var({currentB64CharIdColor});">
	<span class="letter-B">B</span>
	<span class="b64Char-number">{b64CharNumber}</span>
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
				style="color: var({currentB64CharColor});"
			>
				{#each bitGroup.bits as bit}
					<code class="bit"><span>{bit}</span></code>
				{/each}
			</div>
		{/each}
	{:else}
		<div class="hex-bit-group pad-char" class:mapping={currentB64CharIsMapped}>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		</div>
	{/if}
</div>
