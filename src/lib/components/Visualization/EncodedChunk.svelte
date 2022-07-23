<script lang="ts">
	import { app } from '$lib/stores/app';
	import { state } from '$lib/stores/state';
	import type { Base64ByteMap, HexByteMap, OutputChunk } from '$lib/types';

	export let chunk: OutputChunk;

	$: isUTF8 = $state.decoderOutput.outputEncoding === 'UTF-8' || $state.encoderOutput.inputEncoding === 'UTF-8';
	$: textEncoding = isUTF8 || $app.isAscii;

	function highlightHexByteValue(highlight: boolean, hexMap: HexByteMap) {
		$state.highlightHexByte = highlight ? hexMap.byte : null;
		$state.highlightHexBitGroup = highlight ? hexMap.groupId : null;
	}

	function highlightBase64Value(highlight: boolean, b64Map: Base64ByteMap) {
		$state.highlightBase64 = highlight ? b64Map.b64 : null;
		$state.highlightBase64BitGroup = highlight ? b64Map.groupId : null;
	}
</script>

<div class="single-chunk">
	{#if chunk.hexMap}
		<div class="hex-map">
			{#each chunk.hexMap as hexMap}
				<div
					class="hex-byte"
					class:highlight-hex-byte={$state.highlightHexBitGroup === hexMap.groupId}
					data-eight-bit="{hexMap.bin_word1}{hexMap.bin_word2}"
					data-hex-byte={hexMap.byte}
					data-ascii={hexMap.ascii}
					data-bit-group={hexMap.groupId}
					on:mouseenter={() => highlightHexByteValue(true, hexMap)}
					on:mouseleave={() => highlightHexByteValue(false, hexMap)}
				>
					<div>
						<code
							class="hex-ascii"
							data-ascii={hexMap.ascii}
							data-hex-byte={hexMap.byte}
							class:hide-element={!textEncoding}
							class:black={hexMap.isWhiteSpace}
						>
							{@html hexMap.char}
						</code>
						<code data-ascii={hexMap.ascii} data-hex-byte={hexMap.byte}>
							<span class="hex-digit" data-hex={hexMap.hex_word1} data-four-bit={hexMap.bin_word1}>
								{hexMap.hex_word1}
							</span>
							<span class="hex-digit" data-hex={hexMap.hex_word2} data-four-bit={hexMap.bin_word2}>
								{hexMap.hex_word2}
							</span>
						</code>
						{#if hexMap.bitGroups}
							<code class="hex-binary bit-group" data-ascii={hexMap.ascii} data-bit-group={hexMap.groupId}>
								<code>
									{#each hexMap.bitGroups as bitGroup}
										<span
											class:highlight-bit-group={bitGroup.groupId === $state.highlightBase64BitGroup}
											data-bit-group={bitGroup.groupId}
										>
											{bitGroup.bits}
										</span>
									{/each}
								</code>
							</code>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
	{#if chunk.base64Map}
		<div class="base64-map">
			{#each chunk.base64Map as b64Map}
				<div
					class="base64"
					class:highlight-base64={$state.highlightBase64BitGroup === b64Map.groupId}
					data-six-bit={b64Map.bin}
					data-decimal={b64Map.dec}
					data-base={b64Map.b64}
					data-bit-group={b64Map.groupId}
					on:mouseenter={() => highlightBase64Value(true, b64Map)}
					on:mouseleave={() => highlightBase64Value(false, b64Map)}
				>
					<div>
						{#if b64Map.bitGroups}
							<code class="base64-binary bit-group" data-base={b64Map.b64} data-bit-group={b64Map.groupId}>
								<code>
									{#each b64Map.bitGroups as bitGroup}
										<span
											class:highlight-bit-group={bitGroup.groupId === $state.highlightHexBitGroup}
											class:black={b64Map.isPad}
											data-bit-group={bitGroup.groupId}
										>
											{bitGroup.bits}
										</span>
									{/each}
								</code>
							</code>
						{/if}
						<code
							class="base64-decimal"
							class:small-font={b64Map.isPad}
							data-base={b64Map.b64}
							data-decimal={b64Map.dec}
							class:black={b64Map.isPad}
						>
							{@html b64Map.isPad ? '&nbsp;' : b64Map.dec}
						</code>
						<code class="base64-digit" data-base={b64Map.b64} data-decimal={b64Map.dec}>
							{b64Map.b64}
						</code>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	code,
	span {
		margin: 0;
	}

	.hex-map,
	.base64-map {
		transition: background-color 0.35s ease-in-out, color 0.35s ease-in-out;
	}

	.hex-map {
		margin: 0 0 0.3125rem 0;
	}

	.base64-map {
		margin: 0.3125rem 0 0 0;
	}

	.single-chunk {
		display: flex;
		flex-flow: column nowrap;
		padding: 0 0.625rem;
	}

	.hex-map,
	.base64-map {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
	}

	.hex-byte {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-end;
	}

	code.hex-ascii,
	code.base64-decimal {
		font-weight: 400;
	}

	.base64 {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-end;
	}

	code {
		display: block;
	}

	.hex-byte:nth-child(even) code {
		color: var(--indigo4);
	}

	.hex-byte:nth-child(odd) code {
		color: var(--green4);
	}

	.base64:nth-child(even) code {
		color: var(--pink4);
	}

	.base64:nth-child(odd) code {
		color: var(--teal4);
	}

	.hex-byte code,
	.base64 code {
		font-weight: 400;
	}

	.hex-binary code,
	.base64-binary code {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}

	.small-font {
		font-size: 0.75rem;
	}

	.hide-element {
		display: none;
	}

	.hex-byte code.black,
	.base64 code.black {
		color: var(--page-bg-color);
		transition: color 0.35s ease-in-out;
	}

	/* :global(.highlight-bit-group),
	:global(.highlight-hex-byte),
	:global(.highlight-base64) {
		background-color: hsla(0, 0%, 35%, 0.5);
		transition: background-color 0.35s ease-in-out;
	} */

	:global(.highlight-bit-group),
	:global(.highlight-hex-byte),
	:global(.highlight-base64) {
		text-shadow: var(--hl-text-shadow) 1px 0px 1px, var(--hl-text-shadow) 0px 1px 1px,
			var(--hl-text-shadow) -1px 0px 1px, var(--hl-text-shadow) 0px -1px 1px;
		transition: text-shadow 0.35s ease-in-out;
	}
</style>
