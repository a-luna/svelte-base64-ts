import { getPageWidth } from '$lib/stores/pageWidth';
import type { DemoState, EncodingMachineStateStore } from '$lib/types';
import type { DemoStore } from '$lib/types/DemoStore';
import { derived, writable, type Readable } from 'svelte/store';

export const demoUIState = writable<DemoState>({
	mode: 'encode',
	modalOpen: false,
	highlightHexByte: null,
	highlightBase64: '',
	highlightHexBitGroup: '',
	highlightBase64BitGroup: '',
});

export function createDemoStateStore(state: EncodingMachineStateStore): Readable<DemoStore> {
	return derived([state, getPageWidth()], ([$state, $pageWidth]) => {
		const machineState = () =>
			$state.matches('inactive') || $state.matches('finished') || $state.matches('verifyResults')
				? $state.value
				: Object.keys($state.value)[0];

		const machineSubState = () =>
			$state.matches('inactive') || $state.matches('finished') || $state.matches('verifyResults')
				? 'none'
				: Object.values($state.value)[0];

		const startedSubProcess = () =>
			$state.matches({ encodeInput: 'idle' }) ||
			$state.matches({ createInputChunks: 'idle' }) ||
			$state.matches({ createInputChunks: 'autoPlayIdle' }) ||
			$state.matches({ createOutputChunks: 'idle' }) ||
			$state.matches({ createOutputChunks: 'autoPlayIdle' }) ||
			$state.matches({ encodeOutput: 'idle' });

		const showInputBytes = () =>
			$state.matches({ encodeInput: 'autoPlayEncodeByte' }) ||
			$state.matches({ encodeInput: 'encodeByte' }) ||
			$state.matches({ encodeInput: 'encodingComplete' }) ||
			$state.matches({ createInputChunks: 'autoPlayCreateInputChunk' }) ||
			$state.matches({ createInputChunks: 'createInputChunk' }) ||
			$state.matches({ createInputChunks: 'createLastPaddedChunk' }) ||
			$state.matches({ createInputChunks: 'createdAllInputChunks' }) ||
			$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
			$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
			$state.matches({ createOutputChunks: 'createLastPaddedChunk' }) ||
			$state.matches({ createOutputChunks: 'createdAllOutputChunks' }) ||
			$state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
			$state.matches({ encodeOutput: 'encodeBase64' }) ||
			$state.matches({ encodeOutput: 'encodingComplete' }) ||
			$state.matches('verifyResults');

		const showInputChunks = () =>
			$state.matches({ createInputChunks: 'autoPlayCreateInputChunk' }) ||
			$state.matches({ createInputChunks: 'createInputChunk' }) ||
			$state.matches({ createInputChunks: 'createLastPaddedChunk' }) ||
			$state.matches({ createInputChunks: 'createdAllInputChunks' });

		const showOutputChunks = () =>
			$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
			$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
			$state.matches({ createOutputChunks: 'createLastPaddedChunk' }) ||
			$state.matches({ createOutputChunks: 'createdAllOutputChunks' }) ||
			$state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
			$state.matches({ encodeOutput: 'encodeBase64' }) ||
			$state.matches({ encodeOutput: 'encodingComplete' }) ||
			$state.matches('verifyResults');

		const showOutputBytePlaceholders = () =>
			$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
			$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
			$state.matches({ createOutputChunks: 'createLastPaddedChunk' }) ||
			$state.matches({ createOutputChunks: 'createdAllOutputChunks' });

		const showOutputBytes = () =>
			$state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
			$state.matches({ encodeOutput: 'encodeBase64' }) ||
			$state.matches({ encodeOutput: 'encodingComplete' }) ||
			$state.matches('verifyResults');

		const showAsciiTable = () =>
			$state.context.input.inputEncoding === 'ASCII' &&
			($state.matches({ encodeInput: 'idle' }) ||
				$state.matches({ encodeInput: 'autoPlayEncodeByte' }) ||
				$state.matches({ encodeInput: 'encodeByte' }));

		const showBase64Table = () =>
			$state.matches({ encodeInput: 'explainByteMapping' }) || $state.matches('encodeOutput');

		return {
			pageWidth: $pageWidth,
			isMobileDisplay: $pageWidth < 762,
			machineState: machineState(),
			machineSubState: machineSubState(),
			startedSubProcess: startedSubProcess(),
			errorOccurred: $state.matches({ validateInputText: 'error' }),
			showInputBytes: showInputBytes(),
			showInputChunks: showInputChunks(),
			showOutputChunks: showOutputChunks(),
			showOutputBytePlaceholders: showOutputBytePlaceholders(),
			showOutputBytes: showOutputBytes(),
			showAsciiTable: showAsciiTable(),
			showBase64Table: showBase64Table(),
		};
	});
}
