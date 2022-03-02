<script lang="ts">
	import NavButtons from '$lib/components/AlgorithmDemo/NavButtons.svelte';
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
</script>

<div class="input-form">
	<SelectStringEncoding bind:value={inputTextEncoding} disabled={controlsDisabled} />
	<InputTextBox bind:inputText disabled={controlsDisabled} style={inputTextBoxStyles} on:submit />
	<NavButtons {state} on:reset={() => (inputText = '')} on:navButtonEvent />
	<SelectBase64Encoding bind:value={outputBase64Encoding} disabled={controlsDisabled} />
</div>

<style lang="postcss">
	.input-form {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
	}
</style>
