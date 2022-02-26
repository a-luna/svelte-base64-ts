<script lang="ts">
	import InputChunk from '$lib/components/AlgorithmDemo/EncoderInputChunks/InputChunk.svelte';
	import { rotatingColors } from '$lib/constants';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;

	const getChunkColor = (chunkNumber: number): string => rotatingColors[chunkNumber % rotatingColors.length];

	const chunkMappingInProgress = (state: string, i: number, chunkNumber: number): boolean =>
		state.includes('mapChunkBytesToBase64') && i === chunkNumber;

	const getChunkColorWhenMapping = (state: string, i: number, chunkNumber: number): string =>
		chunkMappingInProgress(state, i, chunkNumber) ? getChunkColor(chunkNumber) : '--white1';
</script>

<div class="binary-chunks">
	{#each $state.context.input.chunks as chunk, i}
		<InputChunk {state} {chunk} chunkNumber={i + 1} />
	{/each}
</div>

<style lang="postcss">
	.binary-chunks {
		display: flex;
		flex-flow: column nowrap;
	}
</style>
