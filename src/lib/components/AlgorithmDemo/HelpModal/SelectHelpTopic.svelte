<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let helpTopics: string[] = [];
	export let width = 'auto';
	export let fontSize = '0.75rem';
	export let value: number;
	export let disabled = false;
	export let dropdownShown = false;
	export let flexStyles = 'flex: 0 1 190px;';
	export let buttonHeight = '25px';
	export let buttonPadding = '6px 8px 6px 11px';
	let options: SelectMenuOption[];
	const dispatch = createEventDispatcher<{ helpTopicChanged: { sectionIndex: number } }>();

	$: options = helpTopics.map((name, i) => ({
		label: name,
		value: i,
		optionNumber: i,
		active: false,
	}));

	const menuId = 'select-help-topic';
	const menuLabel = '';

	function handleHelpSectionChanged(sectionNumber: number) {
		value = sectionNumber;
		dispatch('helpTopicChanged', { sectionIndex: sectionNumber });
	}
</script>

<Select
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{width}
	{fontSize}
	{flexStyles}
	{buttonHeight}
	{buttonPadding}
	{disabled}
	{dropdownShown}
	tooltip={'Select Help Topic'}
	on:changed={(e) => handleHelpSectionChanged(e.detail)}
/>
