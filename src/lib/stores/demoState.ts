import type { DemoState, EncodingMachineStateStore } from '$lib/types';
import type { DemoStore } from '$lib/types/DemoStore';
import { derived, writable, type Readable } from 'svelte/store';

export const demoUIState = writable<DemoState>({
	mode: 'encode',
	modalOpen: false,
});

export function createDemoStateStore(state: EncodingMachineStateStore): Readable<DemoStore> {
	return derived(state, ($state) => {
		const errorOccurred = () =>
			$state?.context?.input?.validationResult?.error?.message ? $state.matches({ validateInputText: 'error' }) : false;

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
			$state.matches({ encodeOutput: 'encodingComplete' });

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
			$state.matches({ encodeOutput: 'encodingComplete' });

		const showOutputBytePlaceholders = () =>
			$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
			$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
			$state.matches({ createOutputChunks: 'createLastPaddedChunk' }) ||
			$state.matches({ createOutputChunks: 'createdAllOutputChunks' });

		const showOutputBytes = () =>
			$state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
			$state.matches({ encodeOutput: 'encodeBase64' }) ||
			$state.matches({ encodeOutput: 'encodingComplete' });

		const showAsciiTable = () =>
			$state.context.input.inputEncoding === 'ASCII' &&
			($state.matches({ encodeInput: 'idle' }) ||
				$state.matches({ encodeInput: 'autoPlayEncodeByte' }) ||
				$state.matches({ encodeInput: 'encodeByte' }));

		const showBase64Table = () =>
			$state.matches({ encodeInput: 'explainByteMapping' }) || $state.matches('encodeOutput');

		return {
			errorOccurred: errorOccurred(),
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
