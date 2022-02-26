<script lang="ts">
	import InputChunk from '$lib/components/AlgorithmDemo/EncoderInputChunks/InputChunk.svelte';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;
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
