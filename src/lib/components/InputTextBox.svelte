<script lang="ts">
	import { focusInput } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let style: string;
	export let inputText: string;
	export let placeholder = '';
	export let disabled: boolean = false;
	export let error = false;
	let inputTextElement: HTMLInputElement;
	const dispatch = createEventDispatcher();

	export function focus() {
		inputTextElement.focus();
	}

	function handleKeyPress(key: string) {
		if (key === 'Enter') {
			dispatch('submit');
		}
	}
</script>

<input
	type="text"
	spellcheck="false"
	{placeholder}
	class:error
	{style}
	{disabled}
	bind:this={inputTextElement}
	bind:value={inputText}
	on:keydown={(e) => handleKeyPress(e.key)}
	use:focusInput
/>

<style lang="postcss">
	input {
		font-size: 1rem;
		color: var(--pri-color);
		background-color: var(--black2);
		border: 1px solid var(--pri-color);
		outline: none;
		border-radius: 6px;
		margin: auto 0;
		padding: 0.375rem 0.5rem;
		width: 100%;
		font-size: 0.8rem;
		line-height: 19px;
	}
	input:focus {
		border: 1px solid var(--pri-color);
		outline: none;
	}
	input.error {
		border: 1px solid var(--red4);
		color: var(--red4);
	}
	input[disabled] {
		color: var(--button-disabled-text-color);
		background-color: var(--button-disabled-bg-color);
		border: 1px solid var(--button-disabled-border-color);
	}
</style>
