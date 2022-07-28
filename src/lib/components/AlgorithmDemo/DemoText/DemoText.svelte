<script lang="ts">
	import InputChunk from '$lib/components/AlgorithmDemo/DemoResults/InputChunk.svelte';
	import NormalByteMap from '$lib/components/AlgorithmDemo/DemoText/ByteMaps/NormalByteMap.svelte';
	import OneByteMap from '$lib/components/AlgorithmDemo/DemoText/ByteMaps/OneByteMap.svelte';
	import TwoByteMap from '$lib/components/AlgorithmDemo/DemoText/ByteMaps/TwoByteMap.svelte';
	import Utf8EncodedBytes from '$lib/components/AlgorithmDemo/DemoText/Utf8/Utf8EncodedBytes.svelte';
	import {
		describeBase64Char,
		describeInputByte,
		describeInputChunk,
		describeOutputChunk,
		explainCombinedUtf8Chars,
		explainLastPaddedInputChunk,
		explainLastPaddedOutputChunk,
		explainPadCharacter,
		getBase64AlphabetVerbose,
		getEncodeInputText_IdleDemoText,
	} from '$lib/components/AlgorithmDemo/DemoText/_demoText';
	import type { EncodingMachineStateStore, StringEncoding } from '$lib/types';
	import type { DemoStore } from '$lib/types/DemoStore';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	let state: EncodingMachineStateStore;
	let demoState: Readable<DemoStore>;
	({ state, demoState } = getContext('demo'));
	const formatEncodingType = (encoding: StringEncoding): string => (encoding === 'bin' ? 'binary' : encoding);
	const wikiUrl = 'https://en.wikipedia.org/wiki/Least_common_multiple';
	const lcmSolveUrl =
		'https://www.calculatorsoup.com/calculators/math/lcm.php?input=8+6&data=multiples_method&action=solve';

	$: encodingIn = formatEncodingType($state.context.input.inputEncoding);
	$: finalBase64CharNumber = $state.context.input.lastChunkPadded
		? $state.context.byteMaps.length % 3 === 1
			? $state.context.base64Maps.length - 2
			: $state.context.base64Maps.length - 1
		: $state.context.base64Maps.length;
	$: finalInputChunk = $state.context.input.chunks.slice(-1)[0];
	$: finalInputChunkSize = finalInputChunk.bytes.length;
	$: finalInputChunkSizeVerbose =
		finalInputChunkSize === 2 ? '18 bits (two 8-bit bytes + 2 pad bits)' : '12 bits (one 8-bit byte + 4 pad bits)';
	$: finalChunkBase64 = $state.context.output.chunks.slice(-1)[0].base64;
</script>

{#if $state.matches({ validateInputText: 'success' })}
	<p>
		Nicely done! The value you provided looks, smells and tastes like a valid {encodingIn} string.
	</p>
{:else if $state.matches({ encodeInput: 'idle' })}
	{#each getEncodeInputText_IdleDemoText($state.context.input.inputText, $state.context.input.inputEncoding) as text}
		<p>{@html text}</p>
	{/each}
	{#if $state.context.input.inputEncoding === 'UTF-8'}
		{#if $state.context.output.utf8.hasCombinedChars}
			<p>{@html explainCombinedUtf8Chars($state.context.output.utf8)}</p>
		{/if}
		<Utf8EncodedBytes input={$state.context.input.inputText} />
	{/if}
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
	<p>The first step is complete: <strong>the input data has been converted to a sequence of 8-bit bytes.</strong></p>
	<p>
		However, <strong>in Base64 encoding each value is stored as a 6-bit byte</strong> (see the table below which shows the
		complete Base64 alphabet with corresponding decimal and binary values).
	</p>
	<p>
		<strong>
			In order to reconcile the differing byte sizes, we need to find a number that is evenly divisible by both 8 and 6.
		</strong>
	</p>
{:else if $state.matches({ createInputChunks: 'regularIdle' }) || $state.matches({ createInputChunks: 'autoPlayIdle' })}
	<p>
		In mathematics, this value is called the <strong><a href={wikiUrl} target="_blank">Least Common Multple</a></strong>
		or <strong>LCM</strong>. The <strong>LCM</strong> of 8 and 6 is 24.
		<span class="external-link"><a href={lcmSolveUrl} target="_blank">(click here for a step-by-step proof)</a></span>
	</p>
	<p>
		What can we do with this information?
		<strong>
			Three 8-bit bytes of input data (3x8 = 24 bits) can be represented by four 6-bit Base64 digits (4x6 = 24 bits).
		</strong>
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
	{#each explainLastPaddedInputChunk($state.context.currentInputChunk, $state.context.input.totalChunks) as text}
		<p>{@html text}</p>
	{/each}
	<InputChunk chunk={$state.context.currentInputChunk} chunkIndex={$state.context.inputChunkIndex} />
{:else if $state.matches( { createOutputChunks: 'regularIdle' }, ) || $state.matches( { createOutputChunks: 'autoPlayIdle' }, )}
	<p>
		Next, for each chunk of input data with 24 bits (three 8-bit bytes), an output chunk with four 6-bit bytes is
		created from the same sequence of bits.
	</p>
	<NormalByteMap />
	{#if $state.context.input.lastChunkPadded}
		<p>
			The last chunk will require special processing since it only contains {finalInputChunkSizeVerbose}.
		</p>
	{/if}
{:else if $state.matches( { createOutputChunks: 'autoPlayCreateOutputChunk' }, ) || $state.matches( { createOutputChunks: 'createOutputChunk' }, ) || $state.matches( { createOutputChunks: 'createLastPaddedChunk' }, )}
	{#each describeOutputChunk($state.context.currentOutputChunk, $state.context.outputChunkIndex, $state.context.input.totalChunks) as text}
		<p>
			{@html text}
		</p>
	{/each}
{:else if $state.matches({ createOutputChunks: 'explainLastPaddedChunk' })}
	<p>
		{@html explainLastPaddedOutputChunk(finalInputChunk)[0]}
	</p>
	{#if $state.context.currentOutputChunk.bytes.length === 2}
		<TwoByteMap />
	{:else}
		<OneByteMap />
	{/if}
	<p>
		{@html explainLastPaddedOutputChunk(finalInputChunk)[1]}
	</p>
{:else if $state.matches({ createOutputChunks: 'explainPadCharacter' })}
	{#each explainPadCharacter($state.context.currentOutputChunk) as text}
		<p>{@html text}</p>
	{/each}
{:else if $state.matches({ encodeOutput: 'idle' })}
	<p>
		The final step is to convert each 6-bit value to the corresponding Base64 digit. The table below shows all 64 digits
		in the {getBase64AlphabetVerbose($state.context.input.outputEncoding)} and their decimal and binary values.
	</p>
	<p>
		As each 6-bit value is converted to a Base64 digit, the corresponding row in the table below will be highlighted.
	</p>
{:else if $state.matches({ encodeOutput: 'autoPlayEncodeBase64' }) || $state.matches({ encodeOutput: 'encodeBase64' })}
	{#each describeBase64Char($state.context.currentBase64Char, $state.context.base64CharIndex, finalBase64CharNumber, $state.context.output.outputEncoding, finalChunkBase64) as text}
		<p>
			{@html text}
		</p>
	{/each}
{:else if $state.matches('verifyResults')}
	<p>The input data has been successfully encoded as a string of Base64 characters!</p>
	<p>
		By hovering the mouse over any of the input/output bytes, you can inspect the relationships between the various
		groups of bits.
	</p>
	<p>When you are ready, proceed to the next step to see the final results.</p>
{:else if $state.matches('finished')}
	<p>The encoding process is complete!</p>
{/if}

<style lang="postcss">
	.external-link {
		font-size: 0.7rem;
	}
</style>
