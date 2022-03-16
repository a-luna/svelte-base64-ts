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
	<div class="input-form-left">
		<HelpButton {state} on:click={() => helpModal.toggleModal()} />
		<SelectStringEncoding bind:value={inputTextEncoding} disabled={controlsDisabled} />
		<InputTextBox
			bind:inputText
			placeholder={getPlaceholder(inputTextEncoding)}
			disabled={controlsDisabled}
			{error}
			style={inputTextBoxStyles}
			on:submit
		/>
	</div>
	<div class="input-form-right">
		<NavButtons {state} on:reset={() => (inputText = '')} on:navButtonEvent />
		<SelectBase64Encoding bind:value={outputBase64Encoding} disabled={controlsDisabled} />
	</div>
</div>
<EncoderHelpModal bind:this={helpModal} />

<style lang="postcss">
	.input-form {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
	}

	.input-form-left,
	.input-form-right {
		display: flex;
		flex: 0 0 48%;
		justify-content: space-between;
		gap: 0.75rem;
	}
</style>
