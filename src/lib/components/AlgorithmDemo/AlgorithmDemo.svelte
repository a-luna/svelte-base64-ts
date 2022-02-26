<script lang="ts">
	import EncoderInputChunks from '$lib/components/AlgorithmDemo/EncoderInputChunks/EncoderInputChunks.svelte';
	import NavButtons from '$lib/components/AlgorithmDemo/NavButtons.svelte';
	import { alert } from '$lib/stores/alert';
	import { app } from '$lib/stores/app';
	import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
	import type { NavAction } from '$lib/types';
	import { encodingMachine } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';

	// TODO: Create smart text snippets that explain process of converting inputText -> binary -> 24-bit chunks
	// TODO: Create MapHexByteToBase64 component
	// TODO: Create state machine for b64Decode process

	const { state, send } = useMachine(encodingMachine);

	$: stateName = $state.matches('mapChunkBytesToBase64') ? $state.value['mapChunkBytesToBase64'] : $state.value;
	$: if ($state.matches('inputTextError')) {
		$alert = $state.context.input.validationResult.error.message;
	}

	const validateTransitions: { state: string; action: NavAction; event: 'VALIDATE_INPUT' | 'START_AUTO_PLAY' }[] = [
		{ state: 'inactive', action: 'GO_TO_NEXT_STEP', event: 'VALIDATE_INPUT' },
		{ state: 'inactive', action: 'START_AUTO_PLAY', event: 'START_AUTO_PLAY' },
		{ state: 'inputTextError', action: 'GO_TO_NEXT_STEP', event: 'VALIDATE_INPUT' },
		{ state: 'inputTextError', action: 'START_AUTO_PLAY', event: 'START_AUTO_PLAY' }
	];

	const getValidationEventType = (action: NavAction): 'VALIDATE_INPUT' | 'START_AUTO_PLAY' =>
		validateTransitions.find((t) => t.state === $state.value && t.action === action)?.event;

	function handleNavButtonEvent(e: CustomEvent<{ action: NavAction }>) {
		const { action } = e.detail;
		const validationEventType = getValidationEventType(action);
		if (validationEventType && isStringEncoding($app.inputEncoding) && isBase64Encoding($app.outputEncoding)) {
			send({
				type: validationEventType,
				inputText: $app.inputText,
				inputEncoding: $app.inputEncoding,
				outputEncoding: $app.outputEncoding
			});
		} else {
			send(action);
		}
	}
</script>

<NavButtons {state} on:navButtonEvent={handleNavButtonEvent} />
<div class="state-name">{stateName}</div>
{#if $state.matches('createBinaryChunks') || $state.matches('mapChunkBytesToBase64')}
	<EncoderInputChunks {state} />
{/if}

<style lang="postcss">
	.state-name {
		font-size: 3rem;
		font-weight: 700;
		color: var(--blue4);
	}
</style>
