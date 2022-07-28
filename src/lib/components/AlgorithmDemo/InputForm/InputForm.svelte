<script lang="ts">
	import NavButtons from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButtons.svelte';
	import OpenHelpDocsSmall from '$lib/components/AlgorithmDemo/InputForm/OpenHelpDocsSmall.svelte';
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/InputForm/SelectBase64Encoding.svelte';
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/InputForm/SelectStringEncoding.svelte';
	import InputTextBox from '$lib/components/InputTextBox.svelte';
	import type { Base64Encoding, EncodingMachineStateStore, StringEncoding } from '$lib/types';
	import { getContext } from 'svelte';

	export let inputText: string;
	export let inputTextEncoding: StringEncoding = 'ASCII';
	export let outputBase64Encoding: Base64Encoding = 'base64';
	let state: EncodingMachineStateStore;
	({ state } = getContext('demo'));

	$: inputTextBoxStyles = 'flex: 1;';
	$: controlsDisabled = !$state.matches('inactive') && !$state.matches({ validateInputText: 'error' });
	$: error =
		inputText &&
		!$state.matches('inactive') &&
		inputText === $state.context.input.inputText &&
		!$state.context.input.validationResult.success;
</script>

<div class="input-form">
	<span class="input-text-label form-label">Input Text/Data</span>
	<OpenHelpDocsSmall on:openHelpModal />
	<div class="input-text">
		<InputTextBox bind:inputText disabled={controlsDisabled} {error} style={inputTextBoxStyles} on:submit />
	</div>
	<span class="input-encoding-label form-label">Text Encoding</span>
	<div class="input-encoding">
		<SelectStringEncoding bind:value={inputTextEncoding} disabled={controlsDisabled} />
	</div>
	<span class="output-encoding-label form-label">Output Encoding</span>
	<div class="output-encoding">
		<SelectBase64Encoding bind:value={outputBase64Encoding} disabled={controlsDisabled} />
	</div>
	<div class="nav-buttons">
		<NavButtons />
	</div>
</div>

<style lang="postcss">
	.input-form {
		display: grid;
		grid-template-columns: 114px auto 114px;
		grid-template-rows: auto auto auto 55px auto;
		column-gap: 1rem;
		margin: 0;

		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
	.form-label {
		margin: 0 0 0.5rem 0;
	}
	.input-text-label {
		justify-self: center;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.input-text {
		margin: 0 0 1rem 0;
		grid-column: 1 / span 3;
		grid-row: 2 / span 1;
	}
	.input-encoding-label {
		justify-self: center;
		line-height: 1;

		grid-column: 1 / span 1;
		grid-row: 3 / span 1;
	}
	.output-encoding-label {
		justify-self: center;
		line-height: 1;

		grid-column: 3 / span 1;
		grid-row: 3 / span 1;
	}
	.input-encoding {
		margin: 0 0 1rem 0;

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
	}
	.output-encoding {
		margin: 0 0 1rem 0;

		grid-column: 3 / span 1;
		grid-row: 4 / span 1;
	}
	.nav-buttons {
		grid-column: 1 / span 3;
		grid-row: 5 / span 1;
	}

	@media screen and (min-width: 762px) {
		.input-form {
			display: grid;
			grid-template-columns: 86px 114px auto;
			grid-template-rows: auto auto 20px 33px auto;
			margin: 0 0 1rem 0;
			width: 701px;

			grid-column: 1 / span 1;
			grid-row: 2 / span 1;
		}
		.input-text-label {
			justify-self: start;

			grid-column: 1 / span 2;
			grid-row: 1 / span 1;
		}
		.input-text {
			grid-column: 1 / span 3;
			grid-row: 2 / span 1;
		}
		.input-encoding-label {
			justify-self: center;

			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
		}
		.input-encoding {
			margin: 0;

			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
		.output-encoding-label {
			justify-self: center;

			grid-column: 2 / span 1;
			grid-row: 3 / span 1;
		}
		.output-encoding {
			margin: 0;

			grid-column: 2 / span 1;
			grid-row: 4 / span 1;
		}
		.nav-buttons {
			align-self: flex-end;

			grid-column: 3 / span 1;
			grid-row: 3 / span 2;
		}
	}
</style>
