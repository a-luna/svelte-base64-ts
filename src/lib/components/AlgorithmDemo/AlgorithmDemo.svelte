<script lang="ts">
	import NavButtons from '$lib/components/AlgorithmDemo/NavButtons.svelte';
	import { rotatingColors } from '$lib/constants';
	import { app } from '$lib/stores/app';
	import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
	import type { NavAction } from '$lib/types';
	import { encodingMachine } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';
	import { onDestroy } from 'svelte';

	// TODO: Extract BinaryChunks component from this component
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

	$: stateName = $state.matches('mapChunkBytesToBase64') ? $state.value['mapChunkBytesToBase64'] : $state.value;

	const getChunkColor = (chunkNumber: number): string => rotatingColors[chunkNumber % rotatingColors.length];

	const chunkMappingInProgress = (state: string, i: number, chunkNumber: number): boolean =>
		state.includes('mapChunkBytesToBase64') && i === chunkNumber;

	const getChunkColorWhenMapping = (state: string, i: number, chunkNumber: number): string =>
		state.includes('mapChunkBytesToBase64') && i === chunkNumber
			? rotatingColors[chunkNumber % rotatingColors.length]
			: '--white1';

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
	<div class="binary-chunks">
		{#each $state.context.input.chunks as chunk, i}
			<div class="input-chunk">
				<div class="chunk-id" data-chunk-id={i}>
					<span class="letter-H" style="color: var({getChunkColor(i)});">H</span>
					<span class="chunk-number" style="color: var({getChunkColor(i)});">{i}</span>
				</div>
				{#each chunk.inputMap as map, j}
					<div
						class="chunk-byte"
						data-chunk-id={i}
						data-ascii={map.ascii}
						data-byte-id="chunk-{i}-byte-{j}"
						data-hex="{map.hex_word1}{map.hex_word2}"
						data-bin="{map.bin_word1}{map.bin_word1}"
						class:mapping={chunkMappingInProgress($state.toStrings().join(' '), $state.context.chunkIndex, i)}
						style="color: var({getChunkColorWhenMapping($state.toStrings().join(' '), $state.context.chunkIndex, i)});"
					>
						<div
							class="chunk-byte-word-1"
							data-chunk-id={i}
							data-byte-id="chunk-{i}-byte-{j}"
							data-hex={map.hex_word1}
							data-bin={map.bin_word1}
						>
							{#each map.bin_word1 as bit}
								<code class="bit"><span>{bit}</span></code>
							{/each}
						</div>
						<div
							class="chunk-byte-word-2"
							data-chunk-id={i}
							data-byte-id="chunk-{i}-byte-{j}"
							data-hex={map.hex_word2}
							data-bin={map.bin_word2}
							style="color: var({getChunkColorWhenMapping(
								$state.toStrings().join(' '),
								$state.context.chunkIndex,
								i
							)});"
						>
							{#each map.bin_word2 as bit}
								<code class="bit"><span>{bit}</span></code>
							{/each}
						</div>
					</div>
					{#if chunk.isPadded}
						{#each Array.from({ length: chunk.padLength }, () => 0) as padBit}
							<code class="bit pad-bit"><span>{padBit}</span></code>
						{/each}
					{/if}
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
	.input-chunk,
	.chunk-byte,
	.chunk-byte-word-1,
	.chunk-byte-word-2 {
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
		background-color: var(--dark-gray3);
		line-height: 1;
		text-align: center;
		padding: 2px 0;
		border: 0.5px solid var(--black2);
		width: 14px;
	}
	.mapping .bit {
		font-weight: 500;
		background-color: var(--black1);
		transition-property: color, background-color;
		transition-timing-function: ease-in-out;
		transition-duration: 0.35s;
	}
	.bit span {
		margin: auto;
	}
	code {
		white-space: pre;
	}
	.pad-bit {
		color: var(--dark-gray2);
		background-color: var(--black1);
	}
</style>
