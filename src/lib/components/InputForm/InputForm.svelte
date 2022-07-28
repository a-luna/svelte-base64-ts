<script lang="ts">
	import FormTitle from '$lib/components/FormTitle.svelte';
	import InputBase64EncodingRadioButtons from '$lib/components/InputForm/InputBase64EncodingRadioButtons.svelte';
	import InputStringEncodingRadioButtons from '$lib/components/InputForm/InputStringEncodingRadioButtons.svelte';
	import OutputBase64EncodingRadioButtons from '$lib/components/InputForm/OutputBase64EncodingRadioButtons.svelte';
	import InputTextBox from '$lib/components/InputTextBox.svelte';
	import PushableButton from '$lib/components/PushableButton.svelte';
	import { alert } from '$lib/stores/alert';
	import { app } from '$lib/stores/app';
	import { state } from '$lib/stores/state';

	let inputText: string;
	let inputTextBox: InputTextBox;
	let inputStringEncodingButtons: InputStringEncodingRadioButtons;
	let inputBase64EncodingOptions: InputBase64EncodingRadioButtons;
	let outputBase64EncodingOptions: OutputBase64EncodingRadioButtons;

	$: inputTextBoxGridStyles = 'grid-column: 1 / span 3;';
	$: inputEncodingGridStyles = $state.mode === 'encode' ? 'flex: 1;' : 'flex: 0 1 50%';
	$: outputEncodingGridStyles = $state.mode === 'encode' ? 'flex: 0 1 auto;' : '';
	$: state.changeInputText(inputText);
	$: if ($state.resetPerformed) {
		inputText = '';
		$state.resetPerformed = false;
	}

	function toggleMode() {
		state.toggleMode();
		inputTextBox.focus();
	}

	function resetForm() {
		state.reset();
		resetRadioButtons();
		inputTextBox.focus();
	}

	function resetRadioButtons() {
		if ($app.encoderMode) {
			inputStringEncodingButtons.reset();
			outputBase64EncodingOptions.reset();
		} else {
			inputBase64EncodingOptions.reset();
		}
	}

	function submitForm() {
		if ($app.inputStringIsValid) {
			state.execute();
		}
		if ($app.errorMessage) {
			$alert = $app.errorMessage;
		}
	}
</script>

<div class="form-top">
	<FormTitle title={$app.formTitle} />
	<div class="switch-mode-button-wrapper">
		<PushableButton
			size={$app.buttonSize}
			color={'pri'}
			width={'100%'}
			testid={'switch-mode-button'}
			on:click={() => toggleMode()}>Switch Mode</PushableButton
		>
	</div>
	<div class="reset-form-button-wrapper">
		<PushableButton
			size={$app.buttonSize}
			color={'sec'}
			width={'100%'}
			testid={'reset-form-button'}
			on:click={() => resetForm()}>Reset</PushableButton
		>
	</div>
</div>
<div class="encoding-options-wrapper">
	<div class="input-encoding-options" style={inputEncodingGridStyles}>
		{#if $app.encoderMode}
			<InputStringEncodingRadioButtons bind:this={inputStringEncodingButtons} />
		{:else}
			<InputBase64EncodingRadioButtons bind:this={inputBase64EncodingOptions} />
		{/if}
	</div>
	<div class="output-encoding-options" style={outputEncodingGridStyles}>
		{#if $app.encoderMode}
			<OutputBase64EncodingRadioButtons bind:this={outputBase64EncodingOptions} />
		{:else}
			<div class="placeholder" />
		{/if}
	</div>
</div>
<InputTextBox
	bind:inputText
	bind:this={inputTextBox}
	error={!$app.inputStringIsValid}
	style={inputTextBoxGridStyles}
	on:submit={() => submitForm()}
/>
<PushableButton size={'xs'} color={$app.buttonColor} testid={'execute-button'} on:click={() => submitForm()}
	>{$app.buttonLabel}</PushableButton
>

<style lang="postcss">
	.form-top {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 31px 31px;
		grid-gap: 1rem;

		grid-column: 1 / span 4;
		grid-row: 1 / span 1;
	}
	.encoding-options-wrapper {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		grid-column: 1 / span 4;
	}
	.input-encoding-options,
	.output-encoding-options {
		margin: 0 0 0.25rem 0;
	}
	.switch-mode-button-wrapper,
	.reset-form-button-wrapper {
		width: 100%;
	}
	.switch-mode-button-wrapper {
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
		justify-self: end;
	}
	.reset-form-button-wrapper {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}
	@media screen and (min-width: 525px) {
		.form-top {
			display: grid;
			grid-template-columns: 1fr 115px 115px;
			grid-template-rows: 31px;
			grid-gap: 1rem;

			grid-column: 1 / span 4;
			grid-row: 1 / span 1;
		}
		.switch-mode-button-wrapper {
			grid-column: 2 / span 1;
			grid-row: 1 / span 1;
			justify-self: center;
		}
		.reset-form-button-wrapper {
			grid-column: 3 / span 1;
			grid-row: 1 / span 1;
		}
	}
</style>
