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
	$: inputEncodingGridStyles = $state.mode === 'encode' ? 'grid-column: 1 / span 2;' : 'grid-column: 2 / span 2;';
	$: outputEncodingGridStyles = $state.mode === 'encode' ? 'grid-column: 3 / span 2;' : 'grid-column: 4 / span 1;';
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

<FormTitle title={$app.formTitle} />
<PushableButton size={'xs'} color={$app.switchModeButtonColor} on:click={() => toggleMode()}>Switch Mode</PushableButton
>
<PushableButton size={'xs'} color={'gray'} on:click={() => resetForm()}>Reset</PushableButton>
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
<InputTextBox
	bind:inputText
	bind:this={inputTextBox}
	error={!$app.inputStringIsValid}
	style={inputTextBoxGridStyles}
	on:submit={() => submitForm()}
/>
<PushableButton size={'xs'} color={$app.buttonColor} on:click={() => submitForm()}>{$app.buttonLabel}</PushableButton>

<style lang="postcss">
	.input-form {
	}
	.input-encoding-options,
	.output-encoding-options {
		margin: 0 0 0.25rem 0;
	}
</style>
