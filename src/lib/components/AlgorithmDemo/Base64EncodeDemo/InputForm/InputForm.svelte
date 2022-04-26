<script lang="ts">
	import LinkedLabel from '$lib/components/AlgorithmDemo/Buttons/LinkedLabel.svelte';
	import NavButtons from '$lib/components/AlgorithmDemo/Buttons/NavButtons.svelte';
	import EncoderHelpModal from '$lib/components/AlgorithmDemo/HelpModal/EncoderHelpModal.svelte';
	import OpenHelpDocs from '$lib/components/AlgorithmDemo/OpenHelpDocs.svelte';
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/SelectBase64Encoding.svelte';
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/SelectStringEncoding.svelte';
	import InputTextBox from '$lib/components/InputTextBox.svelte';
	import type { Base64Encoding, StringEncoding, XStateMachineState } from '$lib/types';
	import { slide } from 'svelte/transition';

	export let state: XStateMachineState;
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

	function openHelpDocsModal() {
		if (!$state.context.autoplay) {
			helpModal.toggleModal();
		}
	}

	function resetForm() {
		inputText = '';
		inputTextEncoding = 'ASCII';
		outputBase64Encoding = 'base64';
	}
</script>

<div class="input-form">
	<span class="input-text-label form-label">Input Text/Data</span>
	<OpenHelpDocs {state} on:openHelpModal={() => openHelpDocsModal()} />
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
		<NavButtons {state} on:reset={() => resetForm()} on:navButtonEvent />
	</div>
	{#if $state.matches('inactive') || $state.matches('inputTextError')}
		<div transition:slide class="open-help-docs">
			<LinkedLabel name={'help-docs-button-demo-text'} tooltip={'Open Help Docs'} on:click={() => openHelpDocsModal()}>
				<span>
					Click here to view the help docs if you are unfamiliar with Base64 encoding or other concepts like ASCII, hex
					vs binary values, etc.
				</span>
			</LinkedLabel>
		</div>
	{/if}
</div>
<EncoderHelpModal bind:this={helpModal} />

<style lang="postcss">
	.input-form {
		display: grid;
		grid-template-columns: 114px auto 114px;
		grid-template-rows: auto auto auto auto auto auto;
		column-gap: 1rem;
		margin: 0;

		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
	.form-label {
		margin: 0 0 0.5rem 0;
	}
	.input-text-label {
		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.input-text {
		margin: 0 0 1rem 0;
		grid-column: 1 / span 3;
		grid-row: 2 / span 1;
	}
	.input-encoding-label {
		line-height: 1;

		grid-column: 1 / span 1;
		grid-row: 3 / span 1;
	}
	.output-encoding-label {
		line-height: 1;
		justify-self: flex-end;

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
		margin: 0;

		grid-column: 1 / span 3;
		grid-row: 5 / span 1;
	}
	.open-help-docs {
		font-size: 0.75rem;
		line-height: 1.7;
		letter-spacing: 0.3px;
		border: 1px solid var(--nav-button-autoplay-bg-color);
		border-radius: 6px;
		padding: 0.5rem;
		background-color: var(--black2);
		margin: 1rem 0 0 0;

		grid-column: 1 / span 3;
		grid-row: 6 / span 1;
	}

	@media screen and (min-width: 730px) {
		.input-form {
			display: grid;
			grid-template-columns: 86px 114px auto;
			grid-template-rows: auto auto auto auto auto;
			row-gap: 0.5rem;
			column-gap: 1rem;
			margin: 0;
			width: 698px;

			grid-column: 1 / span 1;
			grid-row: 2 / span 1;
		}
		.form-label,
		.input-encoding,
		.output-encoding {
			margin: 0;
		}
		.input-text-label {
			grid-column: 1 / span 2;
			grid-row: 1 / span 1;
		}
		.input-text {
			grid-column: 1 / span 3;
			grid-row: 2 / span 1;
			margin: 0 0 0.5rem 0;
		}
		.input-encoding-label {
			justify-self: center;

			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
		}
		.input-encoding {
			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
		.output-encoding-label {
			justify-self: center;

			grid-column: 2 / span 1;
			grid-row: 3 / span 1;
		}
		.output-encoding {
			grid-column: 2 / span 1;
			grid-row: 4 / span 1;
		}
		.nav-buttons {
			grid-column: 3 / span 1;
			grid-row: 3 / span 2;
			margin: 0;
		}
		.open-help-docs {
			font-size: 0.8rem;
			margin: 0.5rem 0 0 0;

			grid-column: 1 / span 3;
			grid-row: 5 / span 1;
		}
	}
</style>
