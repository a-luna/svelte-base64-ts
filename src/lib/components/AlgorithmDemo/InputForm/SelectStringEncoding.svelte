<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { getAppContext } from '$lib/stores/context';
	import { isStringEncoding } from '$lib/typeguards';
	import type { SelectMenuOption, StringEncoding } from '$lib/types';

	export let width = '100%';
	export let fontSize = '0.875rem';
	export let value: StringEncoding = 'ascii';
	export let disabled = false;
	export let dropdownShown = false;
	export let inHelpDocs = false;
	let userSelectionMade = false;
	const { state, demoState } = getAppContext();

	const options: SelectMenuOption[] = [
		{ label: 'ASCII', value: 'ascii', optionNumber: 1, active: false },
		{ label: 'UTF-8', value: 'utf8', optionNumber: 2, active: false },
		{ label: 'hex', value: 'hex', optionNumber: 3, active: false },
		{ label: 'bin', value: 'bin', optionNumber: 4, active: false },
	];
	const menuId = 'select-string-encoding';
	const menuLabel = '';

	$: if ($state.context.resetForm) {
		userSelectionMade = false;
	}
	$: bestMatch = inHelpDocs
		? 'ascii'
		: !$demoState.validInputEncodings.length
		? 'utf8'
		: $demoState.validInputEncodings.at(0);
	$: if (!userSelectionMade && !$demoState.test) {
		value = isStringEncoding(bestMatch) ? bestMatch : null;
	}

	function handleStringEncodingChanged(stringEncoding: StringEncoding) {
		userSelectionMade = true;
		value = stringEncoding;
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
	tooltip={'Select String (Input) Encoding'}
	flexStyles={'flex: 0 1 auto;'}
	on:changed={(e) => handleStringEncodingChanged(e.detail)}
/>
