<script lang="ts">
	import NavButtons from '$lib/components/AlgorithmDemo/NavButtons.svelte';
	import { rotatingColors } from '$lib/constants';
	import { app } from '$lib/stores/app';
	import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
	import type { NavAction } from '$lib/types';
	import { encodingMachine } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';
	import { onDestroy } from 'svelte';

	// TODO: Investigate why createBinaryChunks state is no longer occurring after input is successfully validated
	// TODO: Extract BinaryChunks component from this component
	// TODO: Change BinaryChunks to use $state.context.input.chunks[...].inputMap[...]
	// TODO: Add data attributes (e.g., chunk-N-Byte-M) to BinaryChunks to allow highlighting in ASCII/B64 lookup tables AND/OR inputText?
	// TODO: Conditionally disable/enable NavButtons based on possible transitions/guard conditions as defined in state machine
	// TODO: When inputText is invalid, display toast notification with error message
	// TODO: Create smart text snippets that explain process of converting inputText -> binary -> 24-bit chunks
	// TODO: Create MapHexByteToBase64 component
	// TODO: Create state machine for b64Decode process

	const { state, send } = useMachine(encodingMachine);
	onDestroy(() => send('TEARDOWN'));

	const validateTransitions: { state: string; action: NavAction; event: 'VALIDATE_INPUT' | 'START_AUTO_PLAY' }[] = [
		{ state: 'inactive', action: 'GO_TO_NEXT_STEP', event: 'VALIDATE_INPUT' },
		{ state: 'inactive', action: 'START_AUTO_PLAY', event: 'START_AUTO_PLAY' },
		{ state: 'inputTextError', action: 'GO_TO_NEXT_STEP', event: 'VALIDATE_INPUT' },
		{ state: 'inputTextError', action: 'START_AUTO_PLAY', event: 'START_AUTO_PLAY' }
	];

	const getValidationEventType = (action: NavAction): 'VALIDATE_INPUT' | 'START_AUTO_PLAY' =>
		validateTransitions.find((t) => t.state === $state.value && t.action === action)?.event;

	$: stateName = $state.value?.['mapChunkBytesToBase64'] ? $state.value['mapChunkBytesToBase64'] : $state.value;
	$: binaryChunks = $state.context.input.chunks.map((chunk) => chunk.binary);

	const getChunkColor = (chunkNumber: number): string => rotatingColors[chunkNumber % rotatingColors.length];

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

<NavButtons on:navButtonEvent={handleNavButtonEvent} />
<div class="state-name">{stateName}</div>
{#if stateName === 'createBinaryChunks'}
	<div class="binary-chunks">
		{#each binaryChunks as bin, i}
			<div class="input-chunk">
				<div class="chunk-id">
					<span class="letter-H" style="color: var({getChunkColor(i)});">H</span>
					<span class="chunk-number" style="color: var({getChunkColor(i)});">{i}</span>
				</div>
				{#each bin as bit}
					<code class="bit"><span>{bit}</span></code>
				{/each}
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.state-name {
		font-size: 3rem;
		font-weight: 700;
		color: var(--blue4);
	}
	.binary-chunks {
		display: flex;
		flex-flow: column nowrap;
	}
	.input-chunk {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 11px;
	}
	.chunk-id {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		width: 18px;
	}
	.letter-H,
	.chunk-number {
		font-size: 10px;
		font-style: italic;
	}
	.letter-H {
		margin: 0 1px 0 0;
		align-self: center;
	}
	.chunk-number {
		margin: 0 2px 0 0;
		align-self: end;
	}
	.bit {
		color: var(--white1);
		background-color: var(--dark-gray3);
		line-height: 1;
		text-align: center;
		padding: 2px 0;
		border: 0.5px solid var(--black2);
		width: 14px;
	}
	.bit span {
		margin: auto;
	}
	code {
		white-space: pre;
	}
</style>
