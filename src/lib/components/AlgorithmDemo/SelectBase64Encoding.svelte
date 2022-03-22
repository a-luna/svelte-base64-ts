<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import type { Base64Encoding, SelectMenuOption } from '$lib/types';

	export let width = '100%';
	export let fontSize = '0.875rem';
	export let value: Base64Encoding = 'base64';
	export let disabled = false;
	export let dropdownShown = false;

	const options: SelectMenuOption[] = [
		{ label: 'base64', value: 'base64', optionNumber: 1, active: false },
		{ label: 'base64url', value: 'base64url', optionNumber: 2, active: false },
	];
	const menuId = 'select-base64-encoding';
	const menuLabel = '';

	function handleStringEncodingChanged(base64Encoding: Base64Encoding) {
		value = base64Encoding;
	}
</script>

<Select
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{width}
	{fontSize}
	{disabled}
	{dropdownShown}
	tooltip={'Select Base64 (Output) Encoding'}
	flexStyles={'flex: 0 1 auto;'}
	on:changed={(e) => handleStringEncodingChanged(e.detail)}
/>
