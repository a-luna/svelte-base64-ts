<script lang="ts">
	import EncodedInputByte from '$lib/components/AlgorithmDemo/EncodedInputByte.svelte';
	import EncodedOutputByte from '$lib/components/AlgorithmDemo/EncodedOutputByte.svelte';
	import InputChunk from '$lib/components/AlgorithmDemo/InputChunk.svelte';
	import OutputChunk from '$lib/components/AlgorithmDemo/OutputChunk.svelte';
	import AsciiLookupTable from '$lib/components/LookupTables/AsciiLookupTable.svelte';
	import Base64LookupTable from '$lib/components/LookupTables/Base64LookupTable.svelte';
	import { alert } from '$lib/stores/alert';
	import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
	import type { Base64ByteMap, Base64Encoding, HexByteMap, NavAction, StringEncoding } from '$lib/types';
	import { EncodingContext, EncodingEvent, encodingMachine, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';
	import { fade } from 'svelte/transition';
	import InputForm from './InputForm/InputForm.svelte';

	// TODO: Create smart text snippets that explain process of converting inputText -> binary -> 24-bit chunks
	// TODO: Create MapHexByteToBase64 component
	// TODO: Create state machine for b64Decode process

	let inputText = '';
	let inputTextEncoding: StringEncoding = 'ASCII';
	let outputBase64Encoding: Base64Encoding = 'base64';
	let highlightHexByte: number;
	let highlightBase64: string;
	let action: NavAction;
	let inputByteMaps: { chunkId: number; byteNumber: number; byte: HexByteMap }[] = [];
	let outputByteMaps: { chunkId: number; charNumber: number; byte: Base64ByteMap }[] = [];

	const { state, send } = useMachine<EncodingContext, EncodingEvent, EncodingTypeState>(encodingMachine);

	$: anyEncodingState =
		$state.matches('encodeInputText') || $state.matches('createInputChunks') || $state.matches('encodeOutputText');
	$: stateName = $state.toStrings().join(' ');
	$: if ($state.matches('inputTextError')) $alert = $state.context.input.validationResult.error.message;
	$: if (stateName.includes('encodeInputText') && stateName.includes('idle')) {
		inputByteMaps = [];
		outputByteMaps = [];
		highlightHexByte = null;
		highlightBase64 = null;
	}
	$: if (stateName.includes('encodeInputText') && stateName.includes('Byte') && $state.context.currentByte) {
		const chunkId = ($state.context.byteIndex / 3) | 0;
		const byteNumber = $state.context.byteIndex + 1;
		const byteMap = { chunkId, byteNumber, byte: $state.context.currentByte };
		highlightHexByte = byteMap.byte.byte;
		if (!inputByteMaps.find((map) => map.byteNumber === byteNumber)) {
			inputByteMaps = [...inputByteMaps, byteMap];
		} else if (action === 'GO_TO_PREV_STEP') {
			const removeByteMap = inputByteMaps[inputByteMaps.length - 1];
			inputByteMaps = [...inputByteMaps.filter((map) => map.byteNumber !== removeByteMap.byteNumber)];
		}
	}
	$: if (stateName.includes('createInputChunks') && stateName.includes('idle')) {
		highlightHexByte = null;
		highlightBase64 = null;
	}
	$: if (stateName.includes('encodeOutputText') && stateName.includes('idle')) {
		outputByteMaps = [];
		highlightBase64 = null;
		console.log({ chunks: $state.context.output.chunks });
	}
	$: if (stateName.includes('encodeOutputText') && stateName.includes('Base64') && $state.context.currentBase64Char) {
		const chunkId = ($state.context.base64CharIndex / 4) | 0;
		const charNumber = $state.context.base64CharIndex + 1;
		const charMap = { chunkId, charNumber, byte: $state.context.currentBase64Char };
		highlightBase64 = charMap.byte.b64;
		if (!outputByteMaps.find((map) => map.charNumber === charNumber)) {
			outputByteMaps = [...outputByteMaps, charMap];
		} else if (action === 'GO_TO_PREV_STEP') {
			const removeCharMap = outputByteMaps[outputByteMaps.length - 1];
			outputByteMaps = [...outputByteMaps.filter((map) => map.charNumber !== removeCharMap.charNumber)];
		}
	}

	function submitForm() {
		if (isStringEncoding(inputTextEncoding) && isBase64Encoding(outputBase64Encoding)) {
			send({
				type: 'VALIDATE_INPUT',
				inputText: inputText,
				inputEncoding: inputTextEncoding,
				outputEncoding: outputBase64Encoding,
			});
		}
	}

	const validateTransitions: { state: string; action: NavAction; event: 'VALIDATE_INPUT' | 'START_AUTO_PLAY' }[] = [
		{ state: 'inactive', action: 'GO_TO_NEXT_STEP', event: 'VALIDATE_INPUT' },
		{ state: 'inactive', action: 'START_AUTO_PLAY', event: 'START_AUTO_PLAY' },
		{ state: 'inputTextError', action: 'GO_TO_NEXT_STEP', event: 'VALIDATE_INPUT' },
		{ state: 'inputTextError', action: 'START_AUTO_PLAY', event: 'START_AUTO_PLAY' },
	];

	const getValidationEventType = (action: NavAction): 'VALIDATE_INPUT' | 'START_AUTO_PLAY' =>
		validateTransitions.find((t) => t.state === $state.value && t.action === action)?.event;

	function handleNavButtonEvent(e: CustomEvent<{ action: NavAction }>) {
		({ action } = e.detail);
		const validationEventType = getValidationEventType(action);
		if (validationEventType && isStringEncoding(inputTextEncoding) && isBase64Encoding(outputBase64Encoding)) {
			send({
				type: validationEventType,
				inputText: inputText,
				inputEncoding: inputTextEncoding,
				outputEncoding: outputBase64Encoding,
			});
		} else {
			send(action);
		}
	}

	function handleKeyPress(key: string) {
		const savePreviousAction = action;
		action = null;
		if (key === 'ArrowRight' && $state.can('GO_TO_NEXT_STEP')) {
			action = 'GO_TO_NEXT_STEP';
		}
		if (key === 'ArrowLeft' && $state.can('GO_TO_PREV_STEP')) {
			action = 'GO_TO_PREV_STEP';
		}
		if (key === 'Space') {
			if ($state.context.autoplay && $state.can('STOP_AUTO_PLAY')) {
				action = 'STOP_AUTO_PLAY';
			}
			if (!$state.context.autoplay) {
				action = 'START_AUTO_PLAY';
			}
		}
		if (action) {
			send(action);
		} else {
			action = savePreviousAction;
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} />

<InputForm
	{state}
	bind:inputText
	bind:inputTextEncoding
	bind:outputBase64Encoding
	on:navButtonEvent={handleNavButtonEvent}
	on:submit={() => submitForm()}
/>
<div class="demo-steps">
	<div class="encoded-bytes">
		{#if anyEncodingState}
			<div class="binary-chunks">
				{#each inputByteMaps as { chunkId, byteNumber, byte }}
					<div
						transition:fade={{ duration: 200 }}
						class="encoded-byte"
						data-chunk-id={chunkId + 1}
						data-byte-number={byteNumber}
						data-bin="{byte.bin_word1}{byte.bin_word2}"
						data-hex="{byte.hex_word1}{byte.hex_word2}"
						data-ascii={byte.ascii}
						on:mouseenter={() => (highlightHexByte = byte.byte)}
						on:mouseleave={() => (highlightHexByte = null)}
					>
						<EncodedInputByte {state} {chunkId} {byteNumber} {byte} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="binary-chunks data-mapping">
		{#if $state.context?.input?.chunks}
			{#each $state.context.input.chunks as chunk, i}
				{#if $state.matches('createInputChunks') || $state.matches('encodeOutputText')}
					<InputChunk {state} {chunk} chunkIndex={i} />
				{/if}
				{#if $state.matches('encodeOutputText')}
					<OutputChunk {state} chunk={$state.context.output.chunks[i]} chunkIndex={i} />
				{/if}
			{/each}
		{/if}
	</div>
	<div class="encoded-bytes">
		{#if anyEncodingState}
			<div class="binary-chunks">
				{#each outputByteMaps as { chunkId, charNumber, byte }}
					<div
						transition:fade={{ duration: 200 }}
						class="base64-char"
						data-chunk-id={chunkId + 1}
						data-b64char-number={charNumber}
						data-b64={byte.b64}
						data-bin={byte.bin}
						data-dec={byte.dec}
						on:mouseenter={() => (highlightBase64 = byte.b64)}
						on:mouseleave={() => (highlightBase64 = null)}
					>
						<EncodedOutputByte {state} {chunkId} {charNumber} {byte} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
<div class="demo-references">
	{#if (($state.matches('encodeInputText') && !stateName.includes('idle')) || $state.matches('createInputChunks')) && inputByteMaps && $state.context.input.ascii}
		<div transition:fade class="ascii-table">
			<AsciiLookupTable asciiTableChunkSize={14} {highlightHexByte} fontSize={'0.65rem'} />
		</div>
	{/if}
	{#if $state.matches('encodeOutputText') && outputByteMaps}
		<div transition:fade class="base64-table">
			<Base64LookupTable base64TableChunkSize={13} {highlightBase64} fontSize={'0.65rem'} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.demo-steps {
		flex: 1 1 auto;
		align-items: flex-start;
		justify-content: space-between;
		display: flex;
		gap: 1rem;
		background-color: var(--black3);
		border-radius: 6px;
		overflow: auto;
		padding: 1rem;
	}
	.binary-chunks {
		display: flex;
		flex-flow: column nowrap;
		transition: transform 0.75s ease-in-out;
	}
	.encoded-bytes {
		display: flex;
		flex-flow: column nowrap;
		flex: 0;
		justify-self: flex-start;
		gap: 1.5rem;
		width: 200px;
	}
	.encoded-byte,
	.base64-char {
		display: flex;
		justify-content: flex-end;
	}
	.demo-references {
		flex: 0 1 235px;
		padding: 0.25rem;
		overflow: auto;
		height: 100%;
		width: min-content;
		margin: 0 auto;
	}
	.ascii-table,
	.base64-table {
		flex: 0 1 auto;
		margin: 0 auto;
	}
	:global(main) {
		width: calc(815px + 7rem);
	}
	:global(.highlight-hex-byte),
	:global(.highlight-base64) {
		text-shadow: var(--hl-text-shadow) 1px 0px 1px, var(--hl-text-shadow) 0px 1px 1px,
			var(--hl-text-shadow) -1px 0px 1px, var(--hl-text-shadow) 0px -1px 1px;
		transition: text-shadow 0.35s ease-in-out;
	}
</style>
