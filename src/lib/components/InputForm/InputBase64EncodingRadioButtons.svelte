<script lang="ts">
	import RadioButtons from '$lib/components/RadioButtons.svelte';
	import { state } from '$lib/stores/state';
	import { isBase64Encoding, isEncoding } from '$lib/typeguards';

	let buttonsInstance: RadioButtons;
	export const reset = () => buttonsInstance.reset();

	const inputDecodingButtonDefs = {
		title: 'Input Encoding',
		form: 'decode-form',
		groupId: 'input-base64-encoding',
		groupName: 'base64EncodingIn',
		buttons: [
			{
				label: 'base64',
				id: 'base64EncodingIn1',
				value: 'base64',
				checked: $state.decoderInput.inputEncoding === 'base64',
			},
			{
				label: 'base64url',
				id: 'base64EncodingIn2',
				value: 'base64url',
				checked: $state.decoderInput.inputEncoding === 'base64url',
			},
		],
	};

	function handleRadioButtonSelectionChanged(
		e: CustomEvent<{ groupId: string; groupName: string; selectionId: string; value: string }>,
	) {
		const { value } = e.detail;
		if (isEncoding(value) && isBase64Encoding(value)) {
			state.changeInputEncoding(value);
		}
	}
</script>

<RadioButtons
	bind:this={buttonsInstance}
	{...inputDecodingButtonDefs}
	on:radioButtonSelectionChanged={handleRadioButtonSelectionChanged}
/>
