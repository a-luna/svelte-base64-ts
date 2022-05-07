<script lang="ts">
	import {
		describeBase64Char,
		describeInputByte,
		describeInputChunk,
		describeOutputChunk,
		explainLastPaddedChunk,
		explainPadCharacter,
		getBase64AlphabetVerbose,
		getEncodeInputText_IdleDemoText,
	} from '$lib/components/AlgorithmDemo/Base64EncodeDemo/_demoText';
	import LinkedLabel from '$lib/components/AlgorithmDemo/Buttons/LinkedLabel.svelte';
	import InputChunk from '$lib/components/AlgorithmDemo/InputChunk.svelte';
	import ArrowKey from '$lib/components/Icons/KeyboardIcons/ArrowKey.svelte';
	import { alert } from '$lib/stores/alert';
	import { demoState } from '$lib/stores/demoState';
	import type { B64EncodingMachineState, StringEncoding } from '$lib/types';
	import { copyToClipboard } from '$lib/util';
	import { slide } from 'svelte/transition';

	export let state: B64EncodingMachineState;
	const formatEncodingType = (encoding: StringEncoding): string => (encoding === 'bin' ? 'binary' : encoding);
	let pageWidth: number;
	let arrowSize: 'sm' | 'md' | 'lg';
	let welcomeDetailsElement: HTMLDetailsElement;
	let appNavDetailsElement: HTMLDetailsElement;

	$: encodingIn = formatEncodingType($state.context.input.inputEncoding);
	$: arrowSize = pageWidth < 730 ? 'sm' : 'md';
	$: $demoState.welcomeDetailsOpen = welcomeDetailsElement?.open ?? $demoState.welcomeDetailsOpen;
	$: $demoState.appNavDetailsOpen = appNavDetailsElement?.open ?? $demoState.appNavDetailsOpen;
	$: copyToClipboardButtonStyle = pageWidth < 730 ? 'font-weight: 700; align-self: flex-end;' : 'font-weight: 700;';

	function toggleWelcomeDetails() {
		if (welcomeDetailsElement.open) {
			appNavDetailsElement.open = false;
			$demoState.appNavDetailsOpen = false;
		}
		$demoState.welcomeDetailsOpen = welcomeDetailsElement.open;
	}

	function toggleAppNavDetails() {
		if (appNavDetailsElement.open) {
			welcomeDetailsElement.open = false;
			$demoState.welcomeDetailsOpen = false;
		}
		$demoState.appNavDetailsOpen = appNavDetailsElement.open;
	}

	async function handleCopyButtonClicked(colorString: string) {
		const result = await copyToClipboard(colorString);
		if (!result.success) {
			$alert = result.error.message;
		}
	}
</script>

<svelte:window bind:innerWidth={pageWidth} />

{#if $state.matches('inactive') || $state.matches({ validateInputText: 'error' })}
	<details bind:this={welcomeDetailsElement} on:toggle={() => toggleWelcomeDetails()} open>
		<summary>Welcome!</summary>
		{#if welcomeDetailsElement?.open}
			<div transition:slide class="details-content">
				<p>
					Welcome to the <strong>Base64 Algorithm Demo</strong> app! Enter a string value in the text box above to get started.
				</p>
				<p>
					If necessary, update the <strong>Text Encoding</strong> setting (ASCII, hex or binary) based on the type of data
					your string contains.
				</p>
				<p>
					The <strong>Output Encoding</strong> setting controls which Base64 alphabet is used to generate the encoded
					data: either the standard Base64 alphabet (<code>base64</code>) or the URL-safe variant (<code>base64url</code
					>).
				</p>
				<p>
					When ready, click the <strong>Next Step</strong> button.
				</p>
			</div>
		{/if}
	</details>
	<details bind:this={appNavDetailsElement} on:toggle={() => toggleAppNavDetails()}>
		<summary>App Navigation</summary>
		{#if appNavDetailsElement?.open}
			<div transition:slide class="details-content">
				<p>
					You can proceed through the encoding process step-by-step (forward or backward) using the <strong
						>Prev. Step</strong
					>
					and <strong>Next Step</strong> buttons (<ArrowKey arrow="left" size={arrowSize} /> and <ArrowKey
						arrow="right"
						size={arrowSize}
					/> arrow keys will perform the same function).
				</p>
				<p>
					If you are only interested in the final Base64-encoded value, at any time you can jump to the end of the
					demonstration using the <strong>Last Step</strong> button.
				</p>
				<p>
					Both <strong>First Step</strong> and <strong>Reset</strong> buttons return to the first step of the demo, the
					only difference being that <strong>Reset</strong> also changes the form values back to their initial state.
				</p>
				<p>
					If you would rather watch the demo proceed automatically step-by-step, press the <strong
						>Start Autoplay</strong
					>
					button.
				</p>
				<p>
					You can stop autoplaying and return to manually stepping through the demo with the <strong
						>Stop Autoplay</strong
					>
					button. (You can also start/stop autoplay using the <kbd>Space</kbd> bar)
				</p>
			</div>
		{/if}
	</details>
{:else if $state.matches({ validateInputText: 'success' })}
	<p>
		Nicely done! The value you provided looks, smells and tastes like a valid {encodingIn} string.
	</p>
	<p>
		The first step in the Base64 encoding process is to convert the input data to binary (i.e, a string consisting of
		only <code>0</code> and <code>1</code> characters).
	</p>
{:else if $state.matches({ encodeInput: 'idle' })}
	{#each getEncodeInputText_IdleDemoText($state.context.input.inputText, $state.context.input.inputEncoding) as text}
		<p>{@html text}</p>
	{/each}
{:else if $state.matches({ encodeInput: 'autoPlayEncodeByte' }) || $state.matches({ encodeInput: 'encodeByte' })}
	<p>
		{@html describeInputByte(
			$state.context.currentByte.byte,
			$state.context.byteIndex,
			$state.context.byteMaps.length,
			$state.context.input.inputEncoding,
		)}
	</p>
{:else if $state.matches({ encodeInput: 'explainByteMapping' })}
	<p>The first step is complete: the input data has been converted to a sequence of 8-bit bytes.</p>
	<p>
		However, in Base64 encoding each value is stored as a 6-bit byte (see the table below which shows the complete
		Base64 alphabet with corresponding decimal and binary values).
	</p>
	<p>
		In order to reconcile the differing byte sizes, we need to find a number that is evenly divisible by both 8 and 6.
	</p>
{:else if $state.matches({ createInputChunks: 'idle' }) || $state.matches({ createInputChunks: 'autoPlayIdle' })}
	<p>
		In mathematics, this value is called the <strong
			><a href="https://en.wikipedia.org/wiki/Least_common_multiple">Least Common Multple</a></strong
		>
		or <strong>LCM</strong>. The
		<strong>LCM</strong> of 8 and 6 is 24.
	</p>
	<p>
		What can we do with this information? Three 8-bit bytes of input data (3x8 = 24 bits) can be represented by four
		6-bit Base64 digits (4x6 = 24 bits).
	</p>
	<p>
		Therefore, if we separate the input data into chunks of three bytes, each chunk can be encoded as four Base64 digts.
	</p>
{:else if $state.matches( { createInputChunks: 'autoPlayCreateInputChunk' }, ) || $state.matches( { createInputChunks: 'createInputChunk' }, ) || $state.matches( { createInputChunks: 'createLastPaddedChunk' }, )}
	<p>
		{@html describeInputChunk(
			$state.context.currentInputChunk,
			$state.context.inputChunkIndex,
			$state.context.input.totalChunks,
		)}
	</p>
{:else if $state.matches({ createInputChunks: 'explainLastPaddedChunk' })}
	{#each explainLastPaddedChunk($state.context.currentInputChunk, $state.context.inputChunkIndex, $state.context.input.totalChunks) as text}
		<p>{@html text}</p>
	{/each}
	<InputChunk {state} chunk={$state.context.currentInputChunk} chunkIndex={$state.context.inputChunkIndex} />
{:else if $state.matches({ createInputChunks: 'explainPadCharacter' })}
	{#each explainPadCharacter($state.context.currentInputChunk) as text}
		<p>{@html text}</p>
	{/each}
{:else if $state.matches({ createOutputChunks: 'idle' })}
	<p>
		Next, for each chunk of input data with three 8-bit bytes (24 total bits), an output chunk with four 6-bit bytes is
		created from the same sequence of bits.
	</p>
	<div id="byte-map-demo">
		<div id="hex-b64-mapping" class="binary-chunks data-mapping">
			<div class="input-chunk">
				<div class="chunk-id">
					<span class="chunk-label" style="color: var(--red4);">IN</span>
				</div>
				<div class="chunk-byte" data-bit-group="hex-chunk-1-byte-1" style="outline: 1px dotted var(--teal4);">
					<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-1" style="color: var(--yellow3);">
						<code class="bit">
							<span>1</span>
						</code>
						<code class="bit">
							<span>2</span>
						</code>
						<code class="bit">
							<span>3</span>
						</code>
						<code class="bit">
							<span>4</span>
						</code>
						<code class="bit">
							<span>5</span>
						</code>
						<code class="bit">
							<span>6</span>
						</code>
					</div>
					<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-2" style="color: var(--pink4);">
						<code class="bit">
							<span>7</span>
						</code>
						<code class="bit">
							<span>8</span>
						</code>
					</div>
				</div>
				<div class="chunk-byte" data-bit-group="hex-chunk-1-byte-2" style="outline: 1px dotted var(--orange-yellow3);">
					<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-2" style="color: var(--pink4);">
						<code class="bit">
							<span>9</span>
						</code>
						<code class="bit">
							<span>10</span>
						</code>
						<code class="bit">
							<span>11</span>
						</code>
						<code class="bit">
							<span>12</span>
						</code>
					</div>
					<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-3" style="color: var(--yellow-green3);">
						<code class="bit">
							<span>13</span>
						</code>
						<code class="bit">
							<span>14</span>
						</code>
						<code class="bit">
							<span>15</span>
						</code>
						<code class="bit">
							<span>16</span>
						</code>
					</div>
				</div>
				<div class="chunk-byte" data-bit-group="hex-chunk-1-byte-3" style="outline: 1px dotted var(--purple3);">
					<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-3" style="color: var(--yellow-green3);">
						<code class="bit">
							<span>17</span>
						</code>
						<code class="bit">
							<span>18</span>
						</code>
					</div>
					<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-4" style="color: var(--orange3);">
						<code class="bit">
							<span>19</span>
						</code>
						<code class="bit">
							<span>20</span>
						</code>
						<code class="bit">
							<span>21</span>
						</code>
						<code class="bit">
							<span>22</span>
						</code>
						<code class="bit">
							<span>23</span>
						</code>
						<code class="bit">
							<span>24</span>
						</code>
					</div>
				</div>
			</div>
			<div class="output-chunk">
				<div class="chunk-id">
					<span class="chunk-label" style="color: var(--red4);">OUT</span>
				</div>
				<div class="chunk-byte" data-bit-group="base64-chunk-1-digit-1" style="outline: 1px dotted var(--yellow3);">
					<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-1" style="color: var(--teal4);">
						<code class="bit">
							<span>1</span>
						</code>
						<code class="bit">
							<span>2</span>
						</code>
						<code class="bit">
							<span>3</span>
						</code>
						<code class="bit">
							<span>4</span>
						</code>
						<code class="bit">
							<span>5</span>
						</code>
						<code class="bit">
							<span>6</span>
						</code>
					</div>
				</div>
				<div class="chunk-byte" data-bit-group="base64-chunk-1-digit-2" style="outline: 1px dotted var(--pink4);">
					<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-1" style="color: var(--teal4);">
						<code class="bit">
							<span>7</span>
						</code>
						<code class="bit">
							<span>8</span>
						</code>
					</div>
					<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-2" style="color: var(--orange-yellow3);">
						<code class="bit">
							<span>9</span>
						</code>
						<code class="bit">
							<span>10</span>
						</code>
						<code class="bit">
							<span>11</span>
						</code>
						<code class="bit">
							<span>12</span>
						</code>
					</div>
				</div>
				<div
					class="chunk-byte"
					data-bit-group="base64-chunk-1-digit-3"
					style="outline: 1px dotted var(--yellow-green3);"
				>
					<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-2" style="color: var(--orange-yellow3);">
						<code class="bit">
							<span>13</span>
						</code>
						<code class="bit">
							<span>14</span>
						</code>
						<code class="bit">
							<span>15</span>
						</code>
						<code class="bit">
							<span>16</span>
						</code>
					</div>
					<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-3" style="color: var(--purple3);">
						<code class="bit">
							<span>17</span>
						</code>
						<code class="bit">
							<span>18</span>
						</code>
					</div>
				</div>
				<div class="chunk-byte" data-bit-group="base64-chunk-1-digit-4" style="outline: 1px dotted var(--orange3);">
					<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-3" style="color: var(--purple3);">
						<code class="bit">
							<span>19</span>
						</code>
						<code class="bit">
							<span>20</span>
						</code>
						<code class="bit">
							<span>21</span>
						</code>
						<code class="bit">
							<span>22</span>
						</code>
						<code class="bit">
							<span>23</span>
						</code>
						<code class="bit">
							<span>24</span>
						</code>
					</div>
				</div>
			</div>
		</div>
	</div>
	{#if $state.context.input.lastChunkPadded}
		<p>The last chunk will require special processing since it does not contain three 8-bit bytes.</p>
	{/if}
{:else if $state.matches( { createOutputChunks: 'autoPlayCreateOutputChunk' }, ) || $state.matches( { createOutputChunks: 'createOutputChunk' }, )}
	{#each describeOutputChunk($state.context.currentOutputChunk, $state.context.outputChunkIndex, $state.context.input.totalChunks) as text}
		<p>
			{@html text}
		</p>
	{/each}
{:else if $state.matches({ encodeOutput: 'idle' })}
	<p>
		The final step is to convert each 6-bit value to the corresponding Base64 digit. The table below shows the Base64
		digit, decimal value and binary value for the entire {getBase64AlphabetVerbose($state.context.input.outputEncoding)}
	</p>
	<p>As each 6-bit value is converted to a Base64 digit, the mathing value in the table below will be highlighted.</p>
{:else if $state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) || $state.matches({ encodeOutput: 'encodeBase64' })}
	{#each describeBase64Char($state.context.currentBase64Char, $state.context.base64CharIndex, $state.context.output.outputEncoding) as text}
		<p>
			{@html text}
		</p>
	{/each}
{:else if $state.matches('finished')}
	<p>The encoding process is complete!</p>
	<div class="demo-results">
		<div class="result input-value">
			<div class="result-label-wrapper">
				<span class="result-label">Input</span>
				<span class="encoding-type" title="Input Encoding">{$state.context.input.inputEncoding}</span>
			</div>
			<span class="result-value">{$state.context.input.inputText}</span>
		</div>
		<div class="result output-value">
			<div class="result-label-wrapper">
				<span class="result-label">Output</span>
				<span class="encoding-type" title="Output Encoding">{$state.context.output.outputEncoding}</span>
			</div>
			<span class="result-value">{$state.context.output.output}</span>
			<LinkedLabel
				tooltip={'Copy encoded output string to clipboard'}
				name={'copy-output-string-button'}
				style={copyToClipboardButtonStyle}
				on:click={() => copyToClipboard($state.context.output.output)}
			>
				Copy to Clipboard
			</LinkedLabel>
		</div>
	</div>
{/if}

<style lang="postcss">
	.details-content {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.75rem;
	}
	#byte-map-demo {
		margin: 0.5rem 0 0 0;
	}
	.demo-results {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		margin: 0 0 0.5rem 0;
	}
	.result {
		display: flex;
		flex-flow: column nowrap;
		font-size: 0.65rem;
		gap: 0.75rem;
		padding: 0.5rem;
		background-color: var(--black1);
		border-radius: 6px;
		white-space: normal;
		word-break: break-all;
		line-height: 1;
	}
	.result-label-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.result-label {
		font-size: 0.75rem;
		font-weight: 700;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.input-value {
		border: 1px solid var(--nav-button-bg-color);
	}
	.input-value .result-label {
		color: var(--pri-color);
	}
	.output-value {
		border: 1px solid var(--nav-button-stop-autoplay-bg-color);
	}
	.output-value .result-label {
		color: var(--sec-color);
	}
	.result-value {
		font-family: 'Roboto Mono', menlo, monospace;
		color: var(--white3);
		letter-spacing: 0.7px;
		line-height: 1.4;

		grid-column: 2 / span 1;
		grid-row: 1 / span 1;
	}
	.encoding-type {
		font-size: 0.6rem;
	}
	.input-value .encoding-type {
		color: var(--nav-button-active-bg-color);
	}
	.output-value .encoding-type {
		color: var(--nav-button-autoplay-bg-color);
	}
	@media screen and (min-width: 730px) {
		.demo-results {
			margin: 0.5rem 0 0 0;
		}
		.result {
			font-size: 0.75rem;
		}
		.result-label {
			font-size: 0.85rem;
		}
		.result-value {
			line-height: 1.6;
		}
		.encoding-type {
			font-size: 0.7rem;
		}
	}
</style>
