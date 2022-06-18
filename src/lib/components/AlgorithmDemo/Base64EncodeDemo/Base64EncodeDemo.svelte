<script lang="ts">
	import { dev } from '$app/env';
	import AuthorName from '$lib/components/AlgorithmDemo/AuthorName.svelte';
	import DemoResults from '$lib/components/AlgorithmDemo/Base64EncodeDemo/DemoResults.svelte';
	import DemoText from '$lib/components/AlgorithmDemo/Base64EncodeDemo/DemoText.svelte';
	import FinalResults from '$lib/components/AlgorithmDemo/Base64EncodeDemo/FinalResults.svelte';
	import InputForm from '$lib/components/AlgorithmDemo/Base64EncodeDemo/InputForm/InputForm.svelte';
	import OpenHelpDocsLarge from '$lib/components/AlgorithmDemo/Base64EncodeDemo/InputForm/OpenHelpDocsLarge.svelte';
	import LookupTables from '$lib/components/AlgorithmDemo/Base64EncodeDemo/LookupTables.svelte';
	import EncoderHelpModal from '$lib/components/AlgorithmDemo/HelpModal/EncoderHelpModal.svelte';
	import FormTitle from '$lib/components/FormTitle.svelte';
	import { defaultEncoderInput } from '$lib/constants';
	import { alert } from '$lib/stores/alert';
	import type {
		Base64Encoding,
		DemoState,
		EncodingMachineStateStore,
		StringEncoding,
		XStateSendEvent,
	} from '$lib/types';
	import type { DemoStore } from '$lib/types/DemoStore';
	import { copyToClipboard } from '$lib/util';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { createTestSet } from '$lib/xstate/b64Encode.test/testSetGenerator';
	import type { EventLogStore } from '$lib/xstate/b64Encode.test/types';
	import { getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';

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
	let helpModal: EncoderHelpModal;

	$: machineState =
		$state.matches('inactive') || $state.matches('finished') ? $state.value : Object.keys($state.value)[0];
	$: machineSubState =
		$state.matches('inactive') || $state.matches('finished') ? 'none' : Object.values($state.value)[0];
	$: if ($state.context.autoplay && $state.value) eventLog.add({ type: 'AUTOPLAYING' });
	$: if (inputText) updateInputText(inputText, inputTextEncoding, outputBase64Encoding);
	$: if ($demoState.errorOccurred) $alert = $state.context.input.validationResult.error.message;
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
	$: bottomRowHeight = $demoState.isMobileDisplay ? 'auto' : '260px';
	$: formTitleFontSize = $demoState.isMobileDisplay ? '1.6rem' : '1.9rem';

	// $: if (typeof window !== 'undefined') {
	// 	// const i_b64 = '4pyTIMOgIGxhIG1vZGU=';
	// 	const i_b64 = 'JUUyJTg4JTkxJUMzJTlGJUMzJUE1JUM1JTkzJTIwJUUyJTg5JTg4JTIwJUUyJTg4JTg2Yw==';
	// 	const decoded = b64Decode(validateDecoderInput(i_b64, 'base64url'));
	// 	const i_hex = decoded.chunks.map((chunk) => chunk.hex).join('');
	// 	// const i_hex = b64Decode(validateDecoderInput(i_b64, 'base64url')).output;
	// 	const j_bytes = hexStringToByteArray(i_hex);
	// 	const k_utf8 = utf8StringFromByteArray(j_bytes);
	// 	console.log({ decoded });
	// }
	// $: if (typeof window !== 'undefined') {
	// 	const i_utf8 = '✓ à la mode';
	// 	// const i_utf8 = '∑ßåœ ≈ ∆c';
	// 	const l_bytes = utf8StringToByteArray(i_utf8);
	// 	const m_hex = hexStringFromByteArray(l_bytes);
	// 	const m_utf8encoded = utf8StringFromByteArray(l_bytes);
	// 	const n_b64 = b64Encode(validateEncoderInput(m_hex, 'ASCII', 'base64')).output;
	// 	console.log({ i_utf8, l_bytes, m_hex, m_utf8encoded, n_b64 });
	// }
	// $: if (typeof window !== 'undefined') {
	// 	const input = '∑ßåœ ≈ ∆c';
	// 	console.log(validateEncoderInput(input, 'UTF-8', 'base64'));
	// 	console.log(
	// 		validateDecoderInput('JUUyJTg4JTkxJUMzJTlGJUMzJUE1JUM1JTkzJTIwJUUyJTg5JTg4JTIwJUUyJTg4JTg2Yw==', 'base64'),
	// 	);
	// }

	function openHelpDocsModal() {
		if (!$state.context.autoplay) {
			helpModal.toggleModal();
		}
	}

	function updateInputText(input: string, stringEncoding: StringEncoding, base64Encoding: Base64Encoding) {
		sendEvent({
			type: 'UPDATE_TEXT',
			inputText: input,
			inputEncoding: stringEncoding,
			outputEncoding: base64Encoding,
		});
	}

	function submitForm(input: string) {
		sendEvent({
			type: 'VALIDATE_TEXT',
			inputText: input,
			inputEncoding: inputTextEncoding,
			outputEncoding: outputBase64Encoding,
		});
	}

	async function handleKeyPress(key: string) {
		if (!$demoUIState.modalOpen) {
			if (key === 'KeyS') {
				console.log({ state: $state.value });
			}
			if (key === 'KeyT') {
				const result = await copyToClipboard(createTestSet());
				if (result.success) {
					console.log('Successfully created test set and copied to clipboard!');
				}
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
			if (dev) {
				if (key === 'KeyA') {
					console.log({ $eventLog });
				}
				if (key === 'KeyC') {
					console.log({ context: $state.context });
				}
				if (key === 'KeyE') {
					console.log({ log: eventLog.entries() });
				}
				if (key === 'KeyL') {
					eventLog.clear();
					console.log({ $eventLog });
				}
				if (key === 'KeyP') {
					const result = await copyToClipboard(eventLog.testScript());
					if (result.success) {
						console.log('Successfully created test script and copied to clipboard!');
					}
				}
			}
		}
	}

	function sendEvent(action: EncodingEvent) {
		if ($state.can(action)) {
			eventLog.add(action);
			send(action);
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} />

<div class="top-row">
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
		<div id="demo-text" data-testid="demo-text" data-state={machineState} data-sub-state={machineSubState}>
			<DemoText />
		</div>
		<DemoResults bind:highlightHexByte bind:highlightBase64 />
	</div>
</div>
<div class="bottom-row" style="flex: 1 0 {bottomRowHeight}">
	<OpenHelpDocsLarge on:click={() => openHelpDocsModal()} />
	<LookupTables {outputBase64Encoding} {highlightBase64} {highlightHexByte} />
	<FinalResults />
</div>
<EncoderHelpModal bind:this={helpModal} />

<style lang="postcss">
	.top-row {
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
		margin: 0;

		grid-column: 1 / span 2;
		grid-row: 2 / span 1;
	}
	#demo-text:not(:only-child) {
		margin: 0 0 1rem 0;
	}
	.bottom-row {
		overflow: auto;

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
	}
	:global(.highlight-hex-byte),
	:global(.highlight-base64) {
		background-color: var(--dark-gray1);
		font-weight: 700;
		transition: background-color 0.35s ease-in-out;
	}
	@media screen and (min-width: 762px) {
		.top-row {
			grid-template-columns: auto auto 1fr auto;
			grid-template-rows: auto;
			align-items: center;
			margin: 0 0 2rem 0;
			width: 701px;

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
			width: 669px;

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
		.bottom-row {
			margin: 1rem 0 0 0;

			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
	}
</style>
