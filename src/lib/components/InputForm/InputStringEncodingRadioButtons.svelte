<script lang="ts">
	import RadioButtons from '$lib/components/RadioButtons.svelte';
	import { state } from '$lib/stores/state';
	import { isEncoding, isStringEncoding } from '$lib/typeguards';

	let buttonsInstance: RadioButtons;
	export const reset = () => buttonsInstance.reset();

	const inputEncodingOptionDefs = {
		title: 'Input Encoding',
		form: 'encode-form',
		groupId: 'input-encoding',
		groupName: 'inputEncoding',
		buttons: [
			{
				label: 'ASCII',
				id: 'inputEncoding1',
				value: 'ASCII',
				checked: $state.encoderInput.inputEncoding === 'ASCII',
			},
			{
				label: 'Hex',
				id: 'inputEncoding2',
				value: 'hex',
				checked: $state.encoderInput.inputEncoding === 'hex',
			},
		],
	};

	function handleRadioButtonSelectionChanged(
		e: CustomEvent<{ groupId: string; groupName: string; selectionId: string; value: string }>,
	) {
		const { value } = e.detail;
		if (isEncoding(value) && isStringEncoding(value)) {
			state.changeInputEncoding(value);
		}
	}
</script>

<RadioButtons
	bind:this={buttonsInstance}
	{...inputEncodingOptionDefs}
	on:radioButtonSelectionChanged={handleRadioButtonSelectionChanged}
/>
