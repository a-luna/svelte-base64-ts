<script lang="ts">
	import NavButtons from '$lib/components/AlgorithmDemo/Buttons/NavButtons.svelte';
	import OpenHelpDocs from '$lib/components/AlgorithmDemo/OpenHelpDocs.svelte';
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/SelectBase64Encoding.svelte';
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/SelectStringEncoding.svelte';
	import InputTextBox from '$lib/components/InputTextBox.svelte';
	import type { Base64Encoding, StringEncoding } from '$lib/types';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import type { Readable } from 'svelte/store';
	import type { State, TypegenDisabled } from 'xstate';

	export let state: Readable<State<EncodingContext, EncodingEvent, any, EncodingTypeState, TypegenDisabled>>;
	export let inputText: string;
	export let inputTextEncoding: StringEncoding = 'ASCII';
	export let outputBase64Encoding: Base64Encoding = 'base64';

	$: inputTextBoxStyles = 'flex: 1;';
	$: controlsDisabled = !$state.matches('inactive') && !$state.matches('inputTextError');
	$: error =
		inputText &&
		!$state.matches('inactive') &&
		inputText === $state.context.input.inputText &&
		!$state.context.input.validationResult.success;

	function getPlaceholder(encoding: StringEncoding): string {
		const stringEncoding = encoding === 'ASCII' ? 'string' : encoding === 'hex' ? 'hex string' : 'binary string';
		return `enter ${stringEncoding} to encode`;
	}
</script>

<div class="input-form">
	<span class="input-encoding-label form-label">Text Encoding</span>
	<div class="input-encoding">
		<SelectStringEncoding bind:value={inputTextEncoding} disabled={controlsDisabled} />
	</div>
	<span class="input-text-label form-label">Input Text/Data</span>
	<OpenHelpDocs {state} on:openHelpModal />
	<div class="input-text">
		<InputTextBox
			bind:inputText
			placeholder={getPlaceholder(inputTextEncoding)}
			disabled={controlsDisabled}
			{error}
			style={inputTextBoxStyles}
			on:submit
		/>
	</div>
	<div class="nav-buttons">
		<NavButtons {state} on:reset={() => (inputText = '')} on:navButtonEvent />
	</div>
	<span class="output-encoding-label form-label">Output Encoding</span>
	<div class="output-encoding">
		<SelectBase64Encoding bind:value={outputBase64Encoding} disabled={controlsDisabled} />
	</div>
</div>

<style lang="postcss">
	.form-label {
		line-height: 1;
		font-size: 0.75rem;
		font-style: italic;
		letter-spacing: 0.4px;
		color: var(--nav-button-active-bg-color);
	}
	.input-form {
		display: grid;
		grid-template-columns: 114px auto 114px;
		grid-template-rows: auto auto auto auto auto;
		row-gap: 0.5rem;
		column-gap: 1rem;
		margin: 0;

		grid-column: 1 / span 2;
		grid-row: 2 / span 1;
	}
	.input-text-label {
		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.input-text {
		margin: 0 0 0.5rem 0;

		grid-column: 1 / span 3;
		grid-row: 2 / span 1;
	}
	.input-encoding-label {
		line-height: 1;
		margin: 0;

		grid-column: 1 / span 1;
		grid-row: 3 / span 1;
	}
	.output-encoding-label {
		line-height: 1;
		margin: 0;

		grid-column: 3 / span 1;
		grid-row: 3 / span 1;
	}
	.input-encoding {
		margin: 0 0 0.25rem 0;

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
	}
	.output-encoding {
		margin: 0 0 0.25rem 0;

		grid-column: 3 / span 1;
		grid-row: 4 / span 1;
	}
	.nav-buttons {
		margin: 0.5rem 0 0 0;

		grid-column: 1 / span 3;
		grid-row: 5 / span 1;
	}

	@media screen and (min-width: 730px) {
		.input-form {
			display: grid;
			grid-template-columns: 86px 114px auto;
			grid-template-rows: auto auto auto auto;
			row-gap: 0.5rem;
			column-gap: 1rem;
			margin: 0;
			width: 698px;

			grid-column: 1 / span 1;
			grid-row: 2 / span 1;
		}
		.input-text-label {
			grid-column: 1 / span 2;
			grid-row: 1 / span 1;
		}
		.input-text {
			grid-column: 1 / span 3;
			grid-row: 2 / span 1;
			margin: 0;
		}
		.input-encoding-label {
			margin: 0.25rem 0 0 0;

			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
		}
		.input-encoding {
			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
		.output-encoding-label {
			margin: 0.25rem 0 0 0;

			grid-column: 2 / span 1;
			grid-row: 3 / span 1;
		}
		.output-encoding {
			grid-column: 2 / span 1;
			grid-row: 4 / span 1;
		}
		.nav-buttons {
			grid-column: 3 / span 1;
			grid-row: 4 / span 1;
			margin: 0;
		}
	}
</style>
