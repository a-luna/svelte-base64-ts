<script lang="ts">
	import AuthorName from '$lib/components/AlgorithmDemo/AuthorName.svelte';
	import DemoResults from '$lib/components/AlgorithmDemo/Base64EncodeDemo/DemoResults.svelte';
	import DemoText from '$lib/components/AlgorithmDemo/Base64EncodeDemo/DemoText.svelte';
	import InputForm from '$lib/components/AlgorithmDemo/Base64EncodeDemo/InputForm/InputForm.svelte';
	import EncoderHelpModal from '$lib/components/AlgorithmDemo/HelpModal/EncoderHelpModal.svelte';
	import FormTitle from '$lib/components/FormTitle.svelte';
	import AsciiLookupTable from '$lib/components/LookupTables/AsciiLookupTable.svelte';
	import Base64LookupTable from '$lib/components/LookupTables/Base64LookupTable.svelte';
	import { defaultEncoderInput } from '$lib/constants';
	import { alert } from '$lib/stores/alert';
	import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
	import type {
		Base64Encoding,
		DemoState,
		EncodingMachineStateStore,
		EventLogStore,
		StringEncoding,
		XStateSendEvent,
	} from '$lib/types';
	import type { DemoStore } from '$lib/types/DemoStore';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	let state: EncodingMachineStateStore;
	let demoState: Readable<DemoStore>;
	let demoUIState: Writable<DemoState>;
	let eventLog: EventLogStore;
	let send: XStateSendEvent;
	({ state, demoState, demoUIState, eventLog, send } = getContext('demo'));

	let inputText = defaultEncoderInput.inputText;
	let inputTextEncoding: StringEncoding = defaultEncoderInput.inputEncoding;
	let outputBase64Encoding: Base64Encoding = defaultEncoderInput.outputEncoding;
	let highlightHexByte: number;
	let highlightBase64: string;
	let pageWidth: number;
	let helpModal: EncoderHelpModal;

	function openHelpDocsModal() {
		if (!$state.context.autoplay) {
			helpModal.toggleModal();
		}
	}

	$: machineState =
		$state.matches('inactive') || $state.matches('finished') ? $state.value : Object.keys($state.value)[0];
	$: machineSubState =
		$state.matches('inactive') || $state.matches('finished') ? 'none' : Object.values($state.value)[0];
	$: if (inputText) updateInputText(inputText, inputTextEncoding, outputBase64Encoding);
	// $: console.log({ state: $state.value, context: $state.context });
	// $: console.log({ state: `${machineState}${machineSubState !== 'none' ? `-${machineSubState}` : ``}` });
	$: if ($demoState.errorOccurred) {
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
	$: if ($state.context.resetForm) {
		inputText = defaultEncoderInput.inputText;
		inputTextEncoding = defaultEncoderInput.inputEncoding;
		outputBase64Encoding = defaultEncoderInput.outputEncoding;
		eventLog.clear();
	}
	$: tableChunkSize = pageWidth < 730 ? 32 : 16;
	$: tableSectionHeight = pageWidth < 730 ? 'auto' : '260px';
	$: formTitleFontSize = pageWidth < 730 ? '1.6rem' : '1.9rem';

	function updateInputText(input: string, stringEncoding: StringEncoding, base64Encoding: Base64Encoding) {
		sendEvent({
			type: 'UPDATE_TEXT',
			inputText: input,
			inputEncoding: stringEncoding,
			outputEncoding: base64Encoding,
		});
	}

	function submitForm(input: string) {
		if (isStringEncoding(inputTextEncoding) && isBase64Encoding(outputBase64Encoding)) {
			sendEvent({
				type: 'VALIDATE_TEXT',
				inputText: input,
				inputEncoding: inputTextEncoding,
				outputEncoding: outputBase64Encoding,
			});
		}
	}

	function handleKeyPress(key: string) {
		if (!$demoUIState.modalOpen) {
			if (key === 'KeyA') {
				console.log({ $eventLog });
			}
			if (key === 'KeyC') {
				console.log({ context: $state.context });
			}
			if (key === 'KeyE') {
				const events = $eventLog.filter((e) => !Object.prototype.hasOwnProperty.call(e, 'state'));
				console.log({ events });
			}
			if (key === 'KeyL') {
				eventLog.clear();
				console.log({ $eventLog });
			}
			if (key === 'KeyS') {
				console.log({ state: $state.value });
			}
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
			eventLog.add(action);
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
	bind:inputText
	bind:inputTextEncoding
	bind:outputBase64Encoding
	on:openHelpModal={() => openHelpDocsModal()}
	on:submit={() => submitForm(inputText)}
/>
<div id="demo-steps-wrapper">
	<div class="demo-steps" data-testid="demo-steps">
		<!-- <InspectStateMachineButton on:click={() => inspect({ iframe: false })} /> -->
		<div id="demo-text" data-state={machineState} data-sub-state={machineSubState}>
			<DemoText />
		</div>
		<DemoResults bind:highlightHexByte bind:highlightBase64 />
	</div>
</div>
<div class="demo-references" style="flex: 1 0 {tableSectionHeight}">
	{#if $demoState.showAsciiTable}
		<div transition:fade class="ascii-table">
			<AsciiLookupTable asciiTableChunkSize={tableChunkSize} {highlightHexByte} fontSize={'0.65rem'} />
		</div>
	{:else if $demoState.showBase64Table}
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
		#demo-text {
			grid-column: 1 / span 5;
			grid-row: 2 / span 1;
		}
		.demo-references {
			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
	}
</style>
