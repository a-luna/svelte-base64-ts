<style lang="postcss">
	.form-top-row {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		height: auto;
		gap: 1rem;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.author-name {
		margin: 0 0 1rem 0;

		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
	.demo-steps {
		display: grid;
		grid-template-columns: 193px auto;
		grid-template-rows: auto auto 1fr;
		gap: 0.5rem;
		background-color: var(--black2);
		border-radius: 6px;
		overflow: auto;
		padding: 1rem;

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
	}
	#input-hex {
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
	#hex-b64-mapping {
		grid-column: 1 / span 2;
		grid-row: 1 / span 1;
	}
	#output-b64 {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}
	.binary-chunks {
		display: flex;
		flex-flow: column nowrap;
		transition: transform 0.75s ease-in-out;
		flex: 0 1 auto;
	}
	.encoded-bytes {
		display: flex;
		flex-flow: column nowrap;
		flex: 0 1 auto;
		justify-self: flex-start;
		gap: 1.5rem;
	}
	.encoded-byte,
	.base64-char {
		display: flex;
		justify-content: flex-end;
	}
	.demo-references {
		padding: 0.25rem;
		overflow: auto;
		width: min-content;
		margin: 0 auto;

		grid-column: 1 / span 1;
		grid-row: 5 / span 1;
	}
	.ascii-table,
	.base64-table {
		flex: 0 1 auto;
		margin: 0 auto;
	}
	:global(.highlight-hex-byte),
	:global(.highlight-base64) {
		background-color: var(--dark-gray1);
		font-weight: 700;
		transition: background-color 0.35s ease-in-out;
	}
	@media screen and (min-width: 785px) {
		.form-top-row {
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			height: 33px;
			margin: 0;

			grid-column: 1 / span 1;
			grid-row: 1 / span 1;
		}
		.demo-steps {
			grid-template-columns: 173px 355px 142px;
			grid-template-rows: auto;

			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
		}
		#input-hex {
			grid-column: 1 / span 1;
			grid-row: 1 / span 1;
		}
		#hex-b64-mapping {
			grid-column: 2 / span 1;
			grid-row: 1 / span 1;
		}
		#output-b64 {
			grid-column: 3 / span 1;
			grid-row: 1 / span 1;
		}
		.demo-references {
			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
	}
</style>

<script lang="ts">
	import AuthorName from '$lib/components/AlgorithmDemo/AuthorName.svelte';
	import InputForm from '$lib/components/AlgorithmDemo/Base64EncodeDemo/InputForm/InputForm.svelte';
	import EncodedInputByte from '$lib/components/AlgorithmDemo/EncodedInputByte.svelte';
	import EncodedOutputByte from '$lib/components/AlgorithmDemo/EncodedOutputByte.svelte';
	import InputChunk from '$lib/components/AlgorithmDemo/InputChunk.svelte';
	import OutputChunk from '$lib/components/AlgorithmDemo/OutputChunk.svelte';
	import FormTitle from '$lib/components/FormTitle.svelte';
	import AsciiLookupTable from '$lib/components/LookupTables/AsciiLookupTable.svelte';
	import Base64LookupTable from '$lib/components/LookupTables/Base64LookupTable.svelte';
	import { alert } from '$lib/stores/alert';
	import { demoState } from '$lib/stores/demoState';
	import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
	import type { Base64Encoding, NavAction, StringEncoding } from '$lib/types';
	import { getChunkIndexFromBase64CharIndex, getChunkIndexFromByteIndex } from '$lib/util';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { encodingMachine } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';
	import { fade } from 'svelte/transition';

	// TODO: Create smart text snippets that explain process of converting inputText -> binary -> 24-bit chunks
	// TODO: Create MapHexByteToBase64 component
	// TODO: Create state machine for b64Decode process

	let inputText = '';
	let inputTextEncoding: StringEncoding = 'ASCII';
	let outputBase64Encoding: Base64Encoding = 'base64';
	let highlightHexByte: number;
	let highlightBase64: string;
	let action: NavAction;
	let pageWidth: number;
	let stateName: string;

	const { state, send } = useMachine<EncodingContext, EncodingEvent, EncodingTypeState>(encodingMachine);

	$: anyEncodingState =
		$state.matches('encodeInputText') ||
		$state.matches('createInputChunks') ||
		$state.matches('encodeOutputText') ||
		$state.matches('finished');
	$: stateName = $state.toStrings().join(' ');
	$: if ($state.matches('inputTextError') && $state?.context?.input?.validationResult?.error?.message) {
		$alert = $state.context.input.validationResult.error.message;
	}
	$: if (stateName.includes('idle')) {
		highlightHexByte = null;
		highlightBase64 = null;
	}
	$: if ($state.matches('encodeInputText') && stateName.includes('Byte')) {
		highlightHexByte = $state.context.currentByte.byte;
	}
	$: if ($state.matches('encodeOutputText') && stateName.includes('Base64')) {
		highlightBase64 = $state.context.currentBase64Char.b64;
	}
	$: tableChunkSize = pageWidth < 830 ? 32 : 16;
	$: tableSectionHeight = pageWidth < 830 ? 'auto' : '260px';
	$: updateInputText(inputText, inputTextEncoding, outputBase64Encoding);

	function updateInputText(input: string, stringEncoding: StringEncoding, base64Encoding: Base64Encoding) {
		send({
			type: 'UPDATE_INPUT_TEXT',
			inputText: input,
			inputEncoding: stringEncoding,
			outputEncoding: base64Encoding,
		});
	}

	function submitForm(input: string) {
		if (isStringEncoding(inputTextEncoding) && isBase64Encoding(outputBase64Encoding)) {
			send({
				type: 'VALIDATE_INPUT',
				inputText: input,
				inputEncoding: inputTextEncoding,
				outputEncoding: outputBase64Encoding,
			});
		}
	}

	const validationEventMap: {
		state: string;
		action: NavAction;
		event: 'VALIDATE_INPUT' | 'VALIDATE_INPUT_AUTO' | 'ENCODE_INPUT_TEXT';
	}[] = [
		{ state: 'inactive', action: 'GO_TO_NEXT_STEP', event: 'VALIDATE_INPUT' },
		{ state: 'inactive', action: 'GO_TO_LAST_STEP', event: 'ENCODE_INPUT_TEXT' },
		{ state: 'inactive', action: 'START_AUTO_PLAY', event: 'VALIDATE_INPUT_AUTO' },
		{ state: 'inputTextError', action: 'GO_TO_NEXT_STEP', event: 'VALIDATE_INPUT' },
		{ state: 'inputTextError', action: 'GO_TO_LAST_STEP', event: 'ENCODE_INPUT_TEXT' },
		{ state: 'inputTextError', action: 'START_AUTO_PLAY', event: 'VALIDATE_INPUT_AUTO' },
	];

	const getValidationEventType = (action: NavAction): 'VALIDATE_INPUT' | 'VALIDATE_INPUT_AUTO' | 'ENCODE_INPUT_TEXT' =>
		validationEventMap.find((t) => t.state === $state.value && t.action === action)?.event;

	const handleNavButtonEvent = (e: CustomEvent<{ action: NavAction }>) => sendEvent(e.detail.action);

	function handleKeyPress(key: string) {
		if (!$demoState.modalOpen) {
			const savePreviousAction = action;
			action = null;
			if (key === 'ArrowRight') {
				action = 'GO_TO_NEXT_STEP';
			}
			if (key === 'ArrowLeft') {
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
				sendEvent(action);
			} else {
				action = savePreviousAction;
			}
		}
	}

	function sendEvent(action: NavAction) {
		const validationEventType = getValidationEventType(action);
		if (validationEventType && isStringEncoding(inputTextEncoding) && isBase64Encoding(outputBase64Encoding)) {
			send({
				type: validationEventType,
				inputText: inputText,
				inputEncoding: inputTextEncoding,
				outputEncoding: outputBase64Encoding,
			});
		} else if ($state.can(action)) {
			send(action);
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} bind:innerWidth={pageWidth} />

<div class="form-top-row">
	<FormTitle title={'Base64 Algorithm Demo'} fontSize={'1.8rem'} letterSpacing={'2.7px'} />
	{#if pageWidth >= 785}
		<AuthorName />
	{/if}
</div>
{#if pageWidth < 785}
	<div class="author-name">
		<AuthorName />
	</div>
{/if}
<InputForm
	{state}
	bind:inputText
	bind:inputTextEncoding
	bind:outputBase64Encoding
	on:navButtonEvent={handleNavButtonEvent}
	on:submit={() => submitForm(inputText)}
/>
<div class="demo-steps">
	<div id="input-hex" class="encoded-bytes">
		{#if anyEncodingState}
			<div class="binary-chunks">
				{#each $state.context.byteMaps as byte, byteIndex}
					<div
						transition:fade={{ duration: 200 }}
						class="encoded-byte"
						data-chunk-id={getChunkIndexFromByteIndex(byteIndex) + 1}
						data-byte-number={byteIndex + 1}
						data-bin="{byte.bin_word1}{byte.bin_word2}"
						data-hex="{byte.hex_word1}{byte.hex_word2}"
						data-ascii={byte.ascii}
						on:mouseenter={() => (highlightHexByte = byte.byte)}
						on:mouseleave={() => (highlightHexByte = null)}
					>
						<EncodedInputByte {state} {byteIndex} {byte} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div id="hex-b64-mapping" class="binary-chunks data-mapping">
		{#if $state.context?.input?.chunks}
			{#each $state.context.input.chunks as chunk, i}
				{#if $state.matches('createInputChunks') || $state.matches('encodeOutputText') || $state.matches('finished')}
					<InputChunk {state} {chunk} chunkIndex={i} />
				{/if}
				{#if $state.matches('encodeOutputText') || $state.matches('finished')}
					<OutputChunk {state} chunk={$state.context.output.chunks[i]} chunkIndex={i} />
				{/if}
			{/each}
		{/if}
	</div>
	<div id="output-b64" class="encoded-bytes">
		{#if $state.matches('encodeOutputText') || $state.matches('finished')}
			<div class="binary-chunks">
				{#each $state.context.base64Maps as b64, charIndex}
					<div
						transition:fade={{ duration: 200 }}
						class="base64-char"
						data-chunk-id={getChunkIndexFromBase64CharIndex(charIndex) + 1}
						data-b64char-number={charIndex + 1}
						data-b64={b64.b64}
						data-bin={b64.bin}
						data-dec={b64.dec}
						on:mouseenter={() => (highlightBase64 = b64.b64)}
						on:mouseleave={() => (highlightBase64 = null)}
					>
						<EncodedOutputByte {state} {charIndex} {b64} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
<div class="demo-references" style="flex: 1 0 {tableSectionHeight}">
	{#if ($state.matches('encodeInputText') && $state.context.input.ascii) || $state.matches('createInputChunks')}
		<div transition:fade class="ascii-table">
			<AsciiLookupTable asciiTableChunkSize={tableChunkSize} {highlightHexByte} fontSize={'0.65rem'} />
		</div>
	{:else if $state.matches('encodeOutputText')}
		<div transition:fade class="base64-table">
			<Base64LookupTable base64TableChunkSize={tableChunkSize} {highlightBase64} fontSize={'0.65rem'} />
		</div>
	{:else}
		<div class="placeholder" style="width: 292px" />
	{/if}
</div>
