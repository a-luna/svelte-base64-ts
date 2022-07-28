<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import type { SelectMenuOption, StringEncoding } from '$lib/types';

	export let width = '100%';
	export let fontSize = '0.875rem';
	export let value: StringEncoding = 'ASCII';
	export let disabled = false;
	export let dropdownShown = false;

	const options: SelectMenuOption[] = [
		{ label: 'ASCII', value: 'ASCII', optionNumber: 1, active: false },
		{ label: 'UTF-8', value: 'UTF-8', optionNumber: 2, active: false },
		{ label: 'hex', value: 'hex', optionNumber: 3, active: false },
		{ label: 'bin', value: 'bin', optionNumber: 4, active: false },
	];
	const menuId = 'select-string-encoding';
	const menuLabel = '';

	const handleStringEncodingChanged = (stringEncoding: StringEncoding) => (value = stringEncoding);
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
	tooltip={'Select String (Input) Encoding'}
	flexStyles={'flex: 0 1 auto;'}
	on:changed={(e) => handleStringEncodingChanged(e.detail)}
/>
