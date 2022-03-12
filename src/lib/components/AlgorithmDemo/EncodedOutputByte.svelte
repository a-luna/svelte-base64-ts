<script lang="ts">
	import { rotatingColors } from '$lib/constants';
	import type { Base64ByteMap } from '$lib/types';
	import { getChunkIndexFromBase64CharIndex } from '$lib/util';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let charIndex: number;
	export let b64: Base64ByteMap;
	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;

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
</script>

<div class="b64Char-id" data-b64char-number={charNumber}>
	<span class="letter-B" style="color: var({chunkColor});">B</span>
	<span class="b64Char-number" style="color: var({chunkColor});">{charNumber}</span>
</div>
<div class="base64-char" data-chunk-id={chunkNumber} class:mapping={chunkMappingInProgress}>
	<span class="base64" data-b64={b64.b64}>{b64.b64}</span>
	<span class="dec" data-dec={b64.isPad ? 'null' : b64.dec}>{b64.isPad ? '' : b64.dec}</span>
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
		<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
	{/if}
</div>

<style lang="postcss">
	.base64-char,
	.base64,
	.dec,
	.hex-bit-group {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 11px;
	}
	.base64 {
		color: var(--sec-color);
		font-size: 12px;
		font-weight: 700;
		width: 15px;
		justify-self: center;
	}
	.dec {
		color: var(--sec-color);
		width: 20px;
		justify-self: center;
	}
	.b64Char-id {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		width: 21px;
		margin: 0 5px 0 0;
	}
	.letter-B,
	.b64Char-number {
		font-size: 10px;
		font-style: italic;
	}
	.letter-B {
		margin: 0 1px 0 0;
		align-self: center;
	}
	.b64Char-number {
		margin: 0 2px 0 0;
		align-self: end;
	}
	.base64-char {
		margin: 0 0.5rem 0 0;
	}
	.bit {
		background-color: var(--gray2);
		line-height: 1;
		text-align: center;
		padding: 1px 0;
		border: 0.5px solid var(--black2);
		width: 13px;
	}
	.mapping .bit {
		font-weight: 500;
		background-color: var(--gray4);
		transition-property: color, background-color;
		transition-timing-function: ease-in-out;
		transition-duration: 0.35s;
	}
	.pad-bit {
		color: var(--dark-gray2);
		background-color: var(--black1);
	}
	span {
		margin: auto;
	}
	code {
		white-space: pre;
	}
</style>
