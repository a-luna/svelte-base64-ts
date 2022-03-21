<script lang="ts">
	import HelpButton from '$lib/components/AlgorithmDemo/Buttons/HelpButton.svelte';
	import NavButtons from '$lib/components/AlgorithmDemo/Buttons/NavButtons.svelte';
	import EncoderHelpModal from '$lib/components/AlgorithmDemo/HelpModal/EncoderHelpModal.svelte';
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
	let helpModal: EncoderHelpModal;

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
	<div class="help-button">
		<HelpButton {state} on:click={() => helpModal.toggleModal()} />
	</div>
	<div class="input-encoding">
		<SelectStringEncoding bind:value={inputTextEncoding} disabled={controlsDisabled} />
	</div>
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
	<div class="output-encoding">
		<SelectBase64Encoding bind:value={outputBase64Encoding} disabled={controlsDisabled} />
	</div>
</div>
<EncoderHelpModal bind:this={helpModal} />

<style lang="postcss">
	.input-form {
		display: grid;
		grid-template-columns: 33px 86px 28px 28px 29px 114px 1fr;
		grid-template-rows: repeat(3, auto);
		row-gap: 1rem;
		column-gap: 0.75rem;
		margin: 0 0 1rem 0;

		grid-column: 1 / span 2;
		grid-row: 3 / span 1;
	}
	.help-button {
		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.input-encoding {
		grid-column: 2 / span 1;
		grid-row: 1 / span 1;
	}
	.output-encoding {
		grid-column: 6 / span 1;
		grid-row: 1 / span 1;
	}
	.input-text {
		grid-column: 1 / span 6;
		grid-row: 2 / span 1;
	}
	.nav-buttons {
		grid-column: 1 / span 6;
		grid-row: 3 / span 1;
	}

	@media screen and (min-width: 785px) {
		.input-form {
			grid-template-columns: 33px 86px auto auto auto 114px;
			grid-template-rows: auto;
			gap: 0.75rem;
			margin: 0;

			grid-column: 1 / span 1;
			grid-row: 2 / span 1;
		}
		.help-button {
			grid-column: 1 / span 1;
			grid-row: 1 / span 1;
		}
		.input-encoding {
			grid-column: 2 / span 1;
			grid-row: 1 / span 1;
		}
		.input-text {
			grid-column: 3 / span 2;
			grid-row: 1 / span 1;
		}
		.nav-buttons {
			grid-column: 5 / span 1;
			grid-row: 1 / span 1;
		}
		.output-encoding {
			grid-column: 6 / span 1;
			grid-row: 1 / span 1;
		}
	}
</style>
