<script lang="ts">
	import { dev } from '$app/env';
	import AuthorName from '$lib/components/AlgorithmDemo/AuthorName.svelte';
	import DemoIntro from '$lib/components/AlgorithmDemo/DemoIntro/DemoIntro.svelte';
	import DemoResults from '$lib/components/AlgorithmDemo/DemoResults/DemoResults.svelte';
	import DemoText from '$lib/components/AlgorithmDemo/DemoText/DemoText.svelte';
	import FinalResults from '$lib/components/AlgorithmDemo/FinalResults.svelte';
	import HelpDocsModal from '$lib/components/AlgorithmDemo/HelpDocs/HelpDocsModal.svelte';
	import InputForm from '$lib/components/AlgorithmDemo/InputForm/InputForm.svelte';
	import LookupTables from '$lib/components/AlgorithmDemo/LookupTables.svelte';
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
	let helpModal: HelpDocsModal;

	$: if ($state.context.autoplay && $state.value) eventLog.add({ type: 'AUTOPLAYING' });
	$: if (inputText) updateInputText(inputText, inputTextEncoding, outputBase64Encoding);
	$: if ($demoState.errorOccurred) $alert = $state.context.input.validationResult.error.message;
	$: if ($demoState.startedSubProcess) {
		$demoUIState.highlightHexByte = null;
		$demoUIState.highlightBase64 = '';
	}
	$: if ($state.matches({ encodeInput: 'autoPlayEncodeByte' }) || $state.matches({ encodeInput: 'encodeByte' })) {
		$demoUIState.highlightHexByte = $state.context.currentByte.byte;
	}
	$: if ($state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) || $state.matches({ encodeOutput: 'encodeBase64' })) {
		$demoUIState.highlightBase64 = $state.context.currentBase64Char.b64;
	}
	$: if ($state.context.resetForm) {
		inputText = defaultEncoderInput.inputText;
		inputTextEncoding = defaultEncoderInput.inputEncoding;
		outputBase64Encoding = defaultEncoderInput.outputEncoding;
	}
	$: bottomRowHeight = $demoState.isMobileDisplay ? 'auto' : '260px';
	$: formTitleFontSize = $demoState.isMobileDisplay ? '1.6rem' : '1.9rem';

	function openHelpDocsModal(helpModalSettings: { helpTopicIndex: number; expanded: boolean }) {
		const { helpTopicIndex, expanded } = helpModalSettings;
		if (!$state.context.autoplay) {
			helpModal.toggleModal(helpTopicIndex, expanded);
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
				if (key === 'KeyS') {
					console.log({ state: $state.value });
				}
				if (key === 'KeyT') {
					const result = await copyToClipboard(createTestSet());
					if (result.success) {
						console.log('Successfully created test set and copied to clipboard!');
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
	on:openHelpModal={(e) => openHelpDocsModal(e.detail)}
	on:submit={() => submitForm(inputText)}
/>
<div id="demo-steps-wrapper">
	<div class="demo-steps" data-testid="demo-steps">
		<!-- <InspectStateMachineButton on:click={() => inspect({ iframe: false })} /> -->
		<div
			id="demo-text"
			data-testid="demo-text"
			data-state={$demoState.machineState}
			data-sub-state={$demoState.machineSubState}
		>
			{#if $state.matches('inactive') || $state.matches({ validateInputText: 'error' })}
				<DemoIntro on:openHelpModal={(e) => openHelpDocsModal(e.detail)} />
			{:else}
				<DemoText on:openHelpModal={(e) => openHelpDocsModal(e.detail)} />
			{/if}
		</div>
		<DemoResults />
	</div>
</div>
<div class="bottom-row" style="flex: 1 0 {bottomRowHeight}">
	<LookupTables
		{outputBase64Encoding}
		highlightBase64={$demoUIState.highlightBase64}
		highlightHexByte={$demoUIState.highlightHexByte}
	/>
	<FinalResults />
</div>
<HelpDocsModal bind:this={helpModal} />

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
