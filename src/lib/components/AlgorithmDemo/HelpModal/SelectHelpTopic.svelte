<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import type { SelectMenuOption } from '$lib/types';

	export let sectionNames: string[] = [];
	export let width = 'auto';
	export let fontSize: string = '0.75rem';
	export let value: number;
	export let disabled = false;
	export let dropdownShown = false;
	let options: SelectMenuOption[];

	$: options = sectionNames.map((name, i) => ({
		label: name,
		value: i,
		optionNumber: i,
		active: false,
	}));

	const menuId = 'select-help-topic';
	const menuLabel = '';

	function handleHelpSectionChanged(sectionNumber: number) {
		value = sectionNumber;
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
	tooltip={'Select Help Topic'}
	flexStyles={'flex: 0 0 auto;'}
	on:changed={(e) => handleHelpSectionChanged(e.detail)}
/>
