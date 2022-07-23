<script lang="ts">
	import EncodedChunk from '$lib/components/Visualization/EncodedChunk.svelte';
	import { app } from '$lib/stores/app';
	import { state } from '$lib/stores/state';

	$: isUTF8 = $state.decoderOutput.outputEncoding === 'UTF-8' || $state.encoderOutput.inputEncoding === 'UTF-8';
	$: textEncoding = isUTF8 || $app.isAscii;
	$: charType = isUTF8 ? 'UTF-8' : 'ASCII';
</script>

<div class="visualization-wrapper">
	<div class="visualization">
		<div class="encoding-key">
			<div class="input-key">
				<div>
					<code class:hide-element={!textEncoding}>{charType}</code>
					<code>Hex</code>
					<code>8-bit</code>
				</div>
			</div>
			<div class="output-key">
				<div>
					<code>6-bit</code>
					<code>Decimal</code>
					<code>Base64</code>
				</div>
			</div>
		</div>
		<section class="encoding-map">
			<div>
				{#if $app.totalBytesOut && $app.chunks && $app.chunks.length}
					<ul>
						{#each $app.chunks as chunk}
							<li>
								<EncodedChunk {chunk} on:highlightHexByteValue on:highlightBase64Value on:highlightBitGroups />
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</section>
	</div>
</div>

<style lang="postcss">
	.visualization-wrapper {
		font-size: 0.75rem;
		background-color: var(--page-bg-color);
		border: 1px solid hsla(0, 0%, 85%, 0.45);
		border-radius: 0.375rem;
		padding: 0.3125rem 0.625rem;
		overflow: auto;

		grid-column: 1 / span 4;
		grid-row: 6 / span 1;
	}

	.visualization {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.625rem;
		overflow: hidden;
		width: auto;
		padding: 0.3125rem;
		white-space: nowrap;
	}

	.encoding-key {
		display: flex;
		flex-flow: column nowrap;
		color: var(--fieldset-title-color);
		font-weight: 400;
		padding: 0 0.5rem 0 0;
		border-right: 1px solid hsla(0, 0%, 85%, 0.45);
	}

	.input-key {
		margin: 0 0 0.3125rem 0;
	}

	.output-key {
		margin: 0.3125rem 0 0 0;
	}

	code {
		display: block;
		color: var(--fieldset-title-color);
		font-weight: 400;
		letter-spacing: 0.75px;
		text-transform: uppercase;
	}

	.hide-element {
		display: none;
	}

	.encoding-map {
		overflow-x: auto;
	}

	.encoding-map div {
		overflow: hidden;
	}

	.encoding-map ul {
		display: flex;
		flex-flow: row nowrap;
		overflow-x: scroll;
		cursor: ew-resize;
		block-size: calc(100% + 25px);
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	.encoding-map li {
		flex: 1 0 auto;
		block-size: calc(100% - 25px);
		border-right: 1px solid hsla(0, 0%, 85%, 0.25);
	}

	.encoding-map li:last-child {
		border: none;
	}
	@media screen and (min-width: 525px) {
		.visualization-wrapper {
			font-size: 0.875rem;
		}
	}
</style>
