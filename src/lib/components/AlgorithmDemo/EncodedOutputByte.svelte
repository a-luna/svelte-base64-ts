<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { Base64ByteMap } from '$lib/types';
	import { getChunkIndexFromBase64CharIndex } from '$lib/util';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, StateSchema, TypegenDisabled } from 'xstate';

	export let charIndex: number;
	export let b64: Base64ByteMap;
	export let state: Readable<
		State<EncodingContext, EncodingEvent, StateSchema<EncodingContext>, EncodingTypeState, TypegenDisabled>
	>;

	$: chunkId = getChunkIndexFromBase64CharIndex(charIndex);
	$: chunkNumber = chunkId + 1;
	$: chunkColor = rotatingColors[chunkId % rotatingColors.length];
	$: currentChunk = $state.context.chunkIndex;
	$: stateName = $state.toStrings().join(' ');
	$: chunkMappingInProgress =
		!stateName.includes('idle') && stateName.includes('createInputChunks') && currentChunk === chunkId;
	$: currentChunkColor = chunkMappingInProgress ? chunkColor : '--black1';

	$: charNumber = charIndex + 1;
	const getBase64CharColor = (): string => rotatingColors[charIndex % rotatingColors.length];
	const highlightBitGroup = (base64CharIndex: number): boolean =>
		!stateName.includes('idle') && stateName.includes('encodeOutputText') && base64CharIndex === charIndex;
	const getCurrentBitGroupColor = (base64CharIndex: number): string =>
		highlightBitGroup(base64CharIndex) ? getBase64CharColor() : currentChunkColor;

	function getBase64DecimalValue() {
		return b64.isPad ? '' : b64.dec < 10 ? `&nbsp;${b64.dec}` : b64.dec;
	}
</script>

<div class="b64Char-id" data-b64char-number={charNumber}>
	<span class="letter-B" style="color: var({chunkColor});">B</span>
	<span class="b64Char-number" style="color: var({chunkColor});">{charNumber}</span>
</div>
<span class="base64" data-b64={b64.b64}>{b64.b64}</span>
<span class="dec" data-dec={b64.isPad ? 'null' : b64.dec}>{@html getBase64DecimalValue()}</span>
<div class="base64-char" data-chunk-id={chunkNumber} class:mapping={chunkMappingInProgress}>
	{#if !b64.isPad}
		{#each b64.bitGroups as bitGroup}
			<div
				class="hex-bit-group"
				data-bit-group={bitGroup.groupId}
				class:mapping={highlightBitGroup($state.context.base64CharIndex)}
				style="color: var({getCurrentBitGroupColor($state.context.base64CharIndex)});"
			>
				{#each bitGroup.bits as bit}
					<code class="bit"><span>{bit}</span></code>
				{/each}
			</div>
		{/each}
	{:else}
		<div class="hex-bit-group pad-char" class:mapping={highlightBitGroup($state.context.base64CharIndex)}>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		</div>
	{/if}
</div>
