<script lang="ts">
	import { app } from '$lib/stores/app';
	import { state } from '$lib/stores/state';

	$: utf8 = $state.decoderOutput.outputEncoding === 'UTF-8';
</script>

<fieldset class="results-out">
	<legend>Output</legend>
	<div class="details-wrapper">
		<div class="encoding"><span class="name">Encoding</span><span class="value">{$app.outputEncoding}</span></div>
		{#if $app.decoderMode}
			<div class="byte-length">
				<span class="name">Total Bytes</span><span class="value">{$app.totalBytesOut}</span>
			</div>
		{/if}
	</div>
	<textarea class:utf8 id="copyable-output-text" readonly rows="1" bind:value={$app.outputText} />
</fieldset>

<style lang="postcss">
	.results-out {
		color: var(--sec-color);
		grid-column: 1 / span 4;
		grid-row: 5 / span 1;
	}
	#copyable-output-text {
		font-family: 'Roboto Mono', monospace;
		line-height: 1rem;
		margin: 0;
		white-space: normal;
		word-break: break-all;
		margin: 0;
		word-break: break-word;
		width: 100%;
		background-color: inherit;
		color: inherit;
		border: none;
		overflow: auto;
		outline: none;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		resize: vertical;
		padding: 0.4375rem 0 0.375rem 0;
	}
	.utf8 {
		letter-spacing: 5px;
		font-size: 1rem;
	}
	fieldset {
		border: 1px solid var(--fieldset-border-color);
		border-radius: 4px;
		padding: 0.5rem 0.75rem 0.25rem 0.75rem;
		font-size: 0.8rem;
		line-height: 1;
	}
	fieldset:last-child {
		margin: 0;
	}
	legend {
		color: var(--fieldset-title-color);
		font-weight: 400;
		padding: 0 3px;
	}
	.details-wrapper {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 0.7rem;
		font-weight: 400;
		gap: 0.25rem;
	}
	.details-wrapper .name {
		color: var(--options-details-name-color);
		margin: 0 6px 0 0;
	}
	.details-wrapper .value {
		color: var(--options-details-value-color);
	}
	@media screen and (min-width: 525px) {
		fieldset {
			font-size: 0.875rem;
		}
	}
</style>
