<script lang="ts">
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

<div class="input-form" class:error={!$app.inputStringIsValid}>
	<span class="form-title">
		{$app.formTitle}
	</span>
	<PushableButton size={'xs'} color={$app.switchModeButtonColor} on:click={() => toggleMode()}
		>Switch Mode</PushableButton
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
	<InputTextBox bind:inputText bind:this={inputTextBox} style={inputTextBoxGridStyles} on:submit={() => submitForm()} />
	<PushableButton size={'xs'} color={$app.buttonColor} on:click={() => submitForm()}>{$app.buttonLabel}</PushableButton>
</div>

<style lang="postcss">
	.input-form {
		display: grid;
		grid-template-columns: 87px auto auto 87px;
		grid-template-rows: 31px auto 31px;
		grid-auto-flow: row;
		align-items: end;
		grid-gap: 1rem 0.5rem;
	}
	.form-title {
		grid-column: 1 / span 2;
		color: var(--pri-color);
		font-size: 1.8rem;
		font-weight: 400;
		text-align: center;
		letter-spacing: 1.5px;
		margin: 0;
		line-height: 1;
		text-shadow: 2px 2px var(--sec-color), 1.75px 1.75px var(--sec-color), 1.5px 1.5px var(--sec-color),
			1.25px 1.25px var(--sec-color), 1px 1px var(--sec-color), 0.75px 0.75px var(--sec-color),
			0.5px 0.5px var(--sec-color), 0.25px 0.25px var(--sec-color);
	}
	.input-encoding-options,
	.output-encoding-options {
		margin: 0 0 0.25rem 0;
	}
</style>
