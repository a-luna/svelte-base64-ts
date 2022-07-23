<script lang="ts">
	import { app } from '$lib/stores/app';
	import { state } from '$lib/stores/state';

	$: utf8 = $state.encoderOutput.inputEncoding === 'UTF-8';
</script>

<fieldset class="results-in">
	<legend>Input</legend>
	<div class="details-wrapper">
		<div class="encoding"><span class="name">Encoding</span><span class="value">{$app.inputEncoding}</span></div>
		{#if $app.encoderMode}
			<div class="byte-length">
				<span class="name">Total Bytes</span><span class="value">{$app.totalBytesIn}</span>
			</div>
		{/if}
	</div>
	<textarea class:utf8 id="copyable-input-text" readonly rows="1" bind:value={$app.inputText} />
</fieldset>

<style lang="postcss">
	.results-in {
		color: var(--pri-color);
		grid-column: 1 / span 4;
		grid-row: 4 / span 1;
	}
	#copyable-input-text {
		font-family: 'Roboto Mono', monospace;
		line-height: 1rem;
		margin: 0;
		white-space: normal;
		word-break: break-all;
		margin: 0;
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
		gap: 0.75rem;
	}
	.details-wrapper .name {
		color: var(--options-details-name-color);
		margin: 0 6px 0 0;
	}
	.details-wrapper .value {
		color: var(--options-details-value-color);
	}
	.utf8 {
		letter-spacing: 5px;
		font-size: 1rem;
	}
	@media screen and (min-width: 525px) {
		fieldset {
			font-size: 0.9rem;
		}
	}
</style>
