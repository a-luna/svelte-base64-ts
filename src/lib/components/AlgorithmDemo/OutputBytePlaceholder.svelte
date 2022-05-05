<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { XStateMachineState } from '$lib/types';
	import { getChunkIndexFromBase64CharIndex } from '$lib/util';

	export let charIndex: number;
	export let state: XStateMachineState;

	$: b64 = $state.context.base64Maps[charIndex];
	$: b64CharNumber = charIndex + 1;
	$: chunkId = getChunkIndexFromBase64CharIndex(charIndex);
	$: chunkNumber = chunkId + 1;
	$: chunkColor = rotatingColors[chunkId % rotatingColors.length];
	$: stateName = $state.toStrings().join(' ');
	$: currentOutputChunk = $state.context.outputChunkIndex;
	$: chunkMappingInProgress = !stateName.includes('idle') && $state.matches('createOutputChunks');
	$: currentChunkIsMapped = chunkMappingInProgress && currentOutputChunk === chunkId;
	$: currentChunkColor = currentChunkIsMapped ? chunkColor : '--light-gray3';
</script>

<div class="b64Char-id" data-b64char-number={b64CharNumber} style="color: var({currentChunkColor});">
	<span class="letter-B">B</span>
	<span class="b64Char-number">{b64CharNumber}</span>
</div>
<div class="base64-char" data-chunk-id={chunkNumber} class:mapping={chunkMappingInProgress}>
	{#if !b64.isPad}
		{#each b64.bitGroups as bitGroup}
			<div
				class="hex-bit-group"
				data-bit-group={bitGroup.groupId}
				class:mapping={currentChunkIsMapped}
				style="color: var({currentChunkColor});"
			>
				{#each bitGroup.bits as bit}
					<code class="bit"><span>{bit}</span></code>
				{/each}
			</div>
		{/each}
	{:else}
		<div class="hex-bit-group pad-char" class:mapping={currentChunkIsMapped}>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		</div>
	{/if}
</div>
