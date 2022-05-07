<script lang="ts">
	import AuthorName from '$lib/components/AlgorithmDemo/AuthorName.svelte';
	import DemoText from '$lib/components/AlgorithmDemo/Base64EncodeDemo/DemoText.svelte';
	import InputForm from '$lib/components/AlgorithmDemo/Base64EncodeDemo/InputForm/InputForm.svelte';
	import EncodedInputByte from '$lib/components/AlgorithmDemo/EncodedInputByte.svelte';
	import EncodedOutputByte from '$lib/components/AlgorithmDemo/EncodedOutputByte.svelte';
	import EncoderHelpModal from '$lib/components/AlgorithmDemo/HelpModal/EncoderHelpModal.svelte';
	import InputChunk from '$lib/components/AlgorithmDemo/InputChunk.svelte';
	import OutputChunk from '$lib/components/AlgorithmDemo/OutputChunk.svelte';
	import FormTitle from '$lib/components/FormTitle.svelte';
	import AsciiLookupTable from '$lib/components/LookupTables/AsciiLookupTable.svelte';
	import Base64LookupTable from '$lib/components/LookupTables/Base64LookupTable.svelte';
	import { alert } from '$lib/stores/alert';
	import { demoState } from '$lib/stores/demoState';
	import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
	import type { Base64Encoding, StringEncoding } from '$lib/types';
	import { getChunkIndexFromBase64CharIndex, getChunkIndexFromByteIndex } from '$lib/util';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { encodingMachine } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';
	import { fade } from 'svelte/transition';
	import OutputBytePlaceholder from '../OutputBytePlaceholder.svelte';

	// TODO: Create smart text snippets that explain process of converting inputText -> binary -> 24-bit chunks
	// TODO: Create MapHexByteToBase64 component
	// TODO: Create state machine for b64Decode process

	let inputText = '';
	let inputTextEncoding: StringEncoding = 'ASCII';
	let outputBase64Encoding: Base64Encoding = 'base64';
	let highlightHexByte: number;
	let highlightBase64: string;
	let pageWidth: number;
	let helpModal: EncoderHelpModal;

	const { state, send } = useMachine<EncodingContext, EncodingEvent, EncodingTypeState>(encodingMachine);

	function openHelpDocsModal() {
		if (!$state.context.autoplay) {
			helpModal.toggleModal();
		}
	}

	$: updateInputText(inputText, inputTextEncoding, outputBase64Encoding);
	$: console.log({ state: $state.value, context: $state.context });
	$: showInputBytes =
		$state.matches({ encodeInput: 'autoPlayEncodeByte' }) ||
		$state.matches({ encodeInput: 'encodeByte' }) ||
		$state.matches({ encodeInput: 'encodingComplete' }) ||
		$state.matches({ createInputChunks: 'autoPlayCreateInputChunk' }) ||
		$state.matches({ createInputChunks: 'createInputChunk' }) ||
		$state.matches({ createInputChunks: 'createLastPaddedChunk' }) ||
		$state.matches({ createInputChunks: 'createdAllInputChunks' }) ||
		$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createdAllOutputChunks' }) ||
		$state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodingComplete' });
	$: showInputChunks =
		$state.matches({ createInputChunks: 'autoPlayCreateInputChunk' }) ||
		$state.matches({ createInputChunks: 'createInputChunk' }) ||
		$state.matches({ createInputChunks: 'createLastPaddedChunk' }) ||
		$state.matches({ createInputChunks: 'createdAllInputChunks' });
	$: showOutputChunks =
		$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createdAllOutputChunks' }) ||
		$state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodingComplete' });
	$: showOutputBytePlaceholders =
		$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createdAllOutputChunks' });
	$: showOutputBytes =
		$state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodeBase64' }) ||
		$state.matches({ encodeOutput: 'encodingComplete' });
	$: showAsciiTable =
		($state.matches({ encodeInput: 'idle' }) ||
			$state.matches({ encodeInput: 'autoPlayEncodeByte' }) ||
			$state.matches({ encodeInput: 'encodeByte' })) &&
		$state.context.input.ascii;
	$: if ($state.matches({ validateInputText: 'error' }) && $state?.context?.input?.validationResult?.error?.message) {
		$alert = $state.context.input.validationResult.error.message;
	}
	$: if (
		$state.matches({ encodeInput: 'idle' }) ||
		$state.matches({ createInputChunks: 'idle' }) ||
		$state.matches({ createInputChunks: 'autoPlayIdle' }) ||
		$state.matches({ createOutputChunks: 'idle' }) ||
		$state.matches({ encodeOutput: 'idle' })
	) {
		highlightHexByte = null;
		highlightBase64 = null;
	}
	$: if ($state.matches({ encodeInput: 'autoPlayEncodeByte' }) || $state.matches({ encodeInput: 'encodeByte' })) {
		highlightHexByte = $state.context.currentByte.byte;
	}
	$: if ($state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) || $state.matches({ encodeOutput: 'encodeBase64' })) {
		highlightBase64 = $state.context.currentBase64Char.b64;
	}
	$: tableChunkSize = pageWidth < 730 ? 32 : 16;
	$: tableSectionHeight = pageWidth < 730 ? 'auto' : '260px';
	$: formTitleFontSize = pageWidth < 730 ? '1.6rem' : '1.8rem';

	function updateInputText(input: string, stringEncoding: StringEncoding, base64Encoding: Base64Encoding) {
		send({
			type: 'UPDATE_TEXT',
			inputText: input,
			inputEncoding: stringEncoding,
			outputEncoding: base64Encoding,
		});
	}

	function submitForm(input: string) {
		if (isStringEncoding(inputTextEncoding) && isBase64Encoding(outputBase64Encoding)) {
			send({
				type: 'VALIDATE_TEXT',
				inputText: input,
				inputEncoding: inputTextEncoding,
				outputEncoding: outputBase64Encoding,
			});
		}
	}

	const handleNavButtonEvent = (e: CustomEvent<{ action: EncodingEvent }>) => send(e.detail.action);

	function handleKeyPress(key: string) {
		if (!$demoState.modalOpen) {
			if (key === 'ArrowRight') {
				if ($state.matches('inactive')) {
					sendEvent({
						type: 'VALIDATE_TEXT',
						inputText,
						inputEncoding: inputTextEncoding,
						outputEncoding: outputBase64Encoding,
					});
				} else {
					sendEvent({ type: 'GO_TO_NEXT_STEP' });
				}
			}
			if (key === 'ArrowLeft') {
				sendEvent({ type: 'GO_TO_PREV_STEP' });
			}
			if (key === 'Space') {
				if ($state.context.autoplay) {
					sendEvent({ type: 'STOP_AUTO_PLAY' });
				} else {
					if ($state.matches('inactive')) {
						sendEvent({
							type: 'START_AUTOPLAY',
							inputText,
							inputEncoding: inputTextEncoding,
							outputEncoding: outputBase64Encoding,
						});
					} else {
						sendEvent({ type: 'RESUME_AUTO_PLAY' });
					}
				}
			}
		}
	}

	function sendEvent(action: EncodingEvent) {
		if ($state.can(action)) {
			send(action);
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} bind:innerWidth={pageWidth} />

<div class="form-top-row">
	<div class="form-title-wrappper">
		<FormTitle title={'Base64 Algorithm Demo'} fontSize={formTitleFontSize} letterSpacing={'2.7px'} />
	</div>
	<div class="author-name">
		<AuthorName />
	</div>
</div>
<InputForm
	{state}
	bind:inputText
	bind:inputTextEncoding
	bind:outputBase64Encoding
	on:navButtonEvent={handleNavButtonEvent}
	on:openHelpModal={() => openHelpDocsModal()}
	on:submit={() => submitForm(inputText)}
/>
<div id="demo-steps-wrapper">
	<div class="demo-steps">
		<!-- <InspectStateMachineButton on:click={() => inspect({ iframe: false })} /> -->
		<div id="demo-text">
			<DemoText {state} />
		</div>
		{#if showInputBytes}
			<h3 class="input-heading">Input</h3>
			<div id="input-hex" class="encoded-bytes">
				<div class="binary-chunks">
					{#each $state.context.updatedByteMaps as byte, byteIndex}
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
			</div>
		{/if}
		{#if showInputChunks}
			<div id="hex-b64-mapping" class="binary-chunks data-mapping">
				{#each $state.context.updatedInputChunks as chunk, i}
					<InputChunk {state} {chunk} chunkIndex={i} />
				{/each}
			</div>
		{/if}
		{#if showOutputChunks}
			<div id="hex-b64-mapping" class="binary-chunks data-mapping">
				{#each $state.context.updatedOutputChunks as chunk, i}
					<InputChunk {state} chunk={$state.context.updatedInputChunks[i]} chunkIndex={i} />
					<OutputChunk {state} {chunk} chunkIndex={i} />
				{/each}
			</div>
		{/if}
		{#if showOutputBytePlaceholders}
			<h3 class="output-heading">Output</h3>
			<div id="output-b64" class="encoded-bytes">
				<div class="binary-chunks">
					{#each $state.context.base64Maps as _, charIndex}
						<div
							transition:fade={{ duration: 200 }}
							class="encoded-base64"
							data-chunk-id={getChunkIndexFromBase64CharIndex(charIndex) + 1}
							data-b64char-number={charIndex + 1}
						>
							<OutputBytePlaceholder {state} {charIndex} />
						</div>
					{/each}
				</div>
			</div>
		{/if}
		{#if showOutputBytes}
			<h3 class="output-heading">Output</h3>
			<div id="output-b64" class="encoded-bytes">
				<div class="binary-chunks">
					{#each $state.context.updatedBase64Maps as b64, charIndex}
						<div
							transition:fade={{ duration: 200 }}
							class="encoded-base64"
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
			</div>
		{/if}
	</div>
</div>
<div class="demo-references" style="flex: 1 0 {tableSectionHeight}">
	{#if showAsciiTable}
		<div transition:fade class="ascii-table">
			<AsciiLookupTable asciiTableChunkSize={tableChunkSize} {highlightHexByte} fontSize={'0.65rem'} />
		</div>
	{:else if $state.matches({ encodeInput: 'explainByteMapping' }) || $state.matches('encodeOutput')}
		<div transition:fade class="base64-table">
			<Base64LookupTable
				base64Encoding={outputBase64Encoding}
				base64TableChunkSize={tableChunkSize}
				{highlightBase64}
				fontSize={'0.65rem'}
			/>
		</div>
	{:else}
		<div class="placeholder" style="width: 292px" />
	{/if}
</div>
<EncoderHelpModal bind:this={helpModal} />

<style lang="postcss">
	.form-top-row {
		display: grid;
		grid-template-columns: auto auto;
		grid-template-rows: auto auto;
		align-items: baseline;
		gap: 1rem;
		margin: 0 0 1.5rem 0;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.form-title-wrappper {
		justify-self: center;

		grid-column: 1 / span 2;
		grid-row: 1 / span 1;
	}
	.author-name {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}
	#demo-steps-wrapper {
		display: block;
		background-color: var(--black2);
		border-radius: 6px;
		overflow: auto;
		padding: 0.5rem 0.75rem;
		transition: transform 0.75s ease-in-out;
		margin: 1rem 0;
		font-family: 'Roboto Mono', menlo, monospace;

		grid-column: 1 / span 1;
		grid-row: 3 / span 1;
	}
	.demo-steps {
		position: relative;
		z-index: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto auto auto auto 1fr;
		column-gap: 0.5rem;
	}
	h3 {
		font-size: 0.9rem;
		margin: 0;
		text-decoration: underline;
		text-align: center;
		margin: 0.5rem 0;
	}
	#demo-text {
		display: flex;
		flex-flow: column nowrap;
		align-self: flex-start;
		position: static;
		z-index: 1;
		margin: 0 0 0.5rem 0;

		grid-column: 1 / span 2;
		grid-row: 2 / span 1;
	}
	h3.input-heading {
		color: var(--pri-color);

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
	}
	#input-hex {
		justify-self: center;

		grid-column: 1 / span 1;
		grid-row: 5 / span 1;
	}
	#hex-b64-mapping {
		margin: 0 0 0.5rem 0;

		grid-column: 1 / span 2;
		grid-row: 3 / span 1;
	}
	h3.output-heading {
		color: var(--sec-color);

		grid-column: 2 / span 1;
		grid-row: 4 / span 1;
	}
	#output-b64 {
		justify-self: center;

		grid-column: 2 / span 1;
		grid-row: 5 / span 1;
	}
	.binary-chunks {
		display: flex;
		flex-flow: column nowrap;
		flex: 0 1 auto;
	}
	.encoded-bytes {
		display: flex;
		flex-flow: column nowrap;
		flex: 0 1 auto;
		justify-self: flex-start;
		gap: 1.5rem;
	}
	.demo-references {
		padding: 0.25rem;
		overflow: auto;
		width: min-content;
		margin: 0 auto;

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
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
	@media screen and (min-width: 730px) {
		.form-top-row {
			grid-template-columns: auto auto 1fr auto;
			grid-template-rows: auto;
			align-items: center;
			margin: 0 0 2rem 0;
			width: 698px;

			grid-column: 1 / span 1;
			grid-row: 1 / span 1;
		}
		.form-title-wrappper {
			grid-column: 1 / span 1;
		}
		.author-name {
			grid-column: 4 / span 1;
			grid-row: 1 / span 1;
		}
		#demo-steps-wrapper {
			padding: 1rem;
			margin: 0;
			width: 666px;

			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
		}
		.demo-steps {
			grid-template-columns: 148px 5px 353px 5px 122px;
			grid-template-rows: auto auto auto auto;
			align-items: flex-start;
			column-gap: 0.5rem;
		}
		h3 {
			font-size: 1rem;
		}
		#demo-text {
			grid-column: 1 / span 5;
			grid-row: 2 / span 1;
		}
		h3.input-heading {
			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
		}
		#input-hex {
			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
		#hex-b64-mapping {
			grid-column: 3 / span 1;
			grid-row: 4 / span 1;
		}
		h3.output-heading {
			grid-column: 5 / span 1;
			grid-row: 3 / span 1;
		}
		#output-b64 {
			grid-column: 5 / span 1;
			grid-row: 4 / span 1;
		}
		.demo-references {
			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
	}
</style>
