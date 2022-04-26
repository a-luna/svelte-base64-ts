<svelte:options accessors />

<script lang="ts">
	import Option from '$lib/components/Select/Option.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { clickOutside, getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import FaCaretDown from 'svelte-icons/fa/FaCaretDown.svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let menuLabel = 'Options';
	export let options: SelectMenuOption[] = [];
	export let selectedValue: number | string;
	export let flexStyles = 'flex: 1 0 auto;';
	export let width = 'auto';
	export let margin = '0';
	export let fontSize = '0.95rem';
	export let disabled = false;
	export let displaySelectedOptionText = true;
	export let menuId = `select-menu-${getRandomHexString(4)}`;
	export let buttonHeight = '33px';
	export let buttonPadding = '9px 11px 9px 14px';
	export let dropdownShown = false;
	export let tooltip = '';
	let selectedOption: SelectMenuOption;
	const dispatch = createEventDispatcher();

	$: label = displaySelectedOptionText ? selectedOption?.label ?? menuLabel : menuLabel;
	$: noSelection = selectedValue === '';
	$: if (options && selectedValue !== selectedOption?.value) {
		options.forEach((menuOption) => (menuOption.active = false));
		selectedOption = options.find((menuOption) => menuOption.value == selectedValue);
		if (selectedOption) {
			selectedOption.active = true;
			selectedValue = selectedOption.value;
		}
	}

	export function handleOptionClicked(selectedOptionNumber: number) {
		if (options.length > 0) {
			options.forEach((menuOption) => (menuOption.active = false));
			selectedOption = options.find((menuOption) => menuOption.optionNumber == selectedOptionNumber);
			if (selectedOption) {
				selectedOption.active = true;
				dispatch('changed', selectedOption.value);
			}
			dropdownShown = false;
		}
	}

	const handleButtonClicked = () => {
		if (!disabled) {
			dropdownShown = !dropdownShown;
		}
	};
</script>

<div
	class="select-menu-wrapper"
	style="width: {width ? width : 'auto'}; margin: {margin ? margin : '0'}; {flexStyles}"
	title={tooltip}
	data-testid={menuId}
	use:clickOutside={{ enabled: dropdownShown, cb: () => (dropdownShown = !dropdownShown) }}
>
	<div>
		<button
			type="button"
			class="open-list-button"
			class:disabled
			class:no-selection={noSelection}
			id="{menuId}-open-list-button"
			data-testid="{menuId}-open-list-button"
			aria-expanded={dropdownShown}
			aria-haspopup="true"
			style="font-size: {fontSize}; font-weight: 500; height: {buttonHeight}; padding: {buttonPadding}"
			on:click={() => handleButtonClicked()}
		>
			<span class="selected-value">
				<slot name="selectedValue">
					{label}
				</slot>
			</span>
			<div style="width: {fontSize}; height: {fontSize}">
				<FaCaretDown />
			</div>
		</button>
	</div>
	{#if dropdownShown}
		<div
			class="dropdown"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="{menuId}-open-list-button"
			tabindex="-1"
			in:scale={{ duration: 100, start: 0.95, easing: cubicOut }}
			out:scale={{ duration: 75, start: 0.95, easing: cubicIn }}
		>
			<slot name="options">
				{#each options as option}
					<Option {...option} {menuId} {fontSize} on:click={(e) => handleOptionClicked(e.detail)} />
				{/each}
			</slot>
		</div>
	{/if}
</div>

<style lang="postcss">
	button {
		display: inline-flex;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		gap: 0.625rem;
		border-radius: 0.375rem;
		border-width: 0;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		margin: 0;
		cursor: pointer;
	}

	button:focus {
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	}

	.select-menu-wrapper {
		position: relative;
		display: inline-block;
		text-align: left;
	}

	.open-list-button {
		background-color: var(--list-button-bg-color, var(--white2));
		color: var(--list-button-text-color, var(--black2));
		border: 1px solid var(--list-button-border-color, var(--light-gray2));
	}

	.dropdown {
		background-color: var(--dropdown-bg-color, var(--white2));
		color: var(--dropdown-text-color, var(--black2));
		border: 1px solid var(--dropdown-border-color, var(--light-gray2));
		transform-origin: top right;
		position: absolute;
		right: 0;
		z-index: 10;
		margin-top: 0.5rem;
		width: 100%;
		border-radius: 0.375rem;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	}

	.dropdown:focus {
		outline: 0;
	}

	.open-list-button:hover,
	.open-list-button:focus {
		background-color: var(--list-button-hover-bg-color, var(--white4));
		color: var(--list-button-hover-text-color, var(--black2));
		border: 1px solid var(--list-button-border-color, var(--light-gray2));
	}

	.open-list-button.disabled {
		cursor: default;
		color: var(--list-button-disabled-text-color, var(--dark-gray2));
		background-color: var(--list-button-disabled-bg-color, var(--light-gray1));
	}

	.open-list-button.no-selection {
		color: var(--list-button-text-color-no-selection, var(--gray4));
	}

	.selected-value {
		line-height: 1;
		white-space: nowrap;
		margin: 0 auto;
	}
</style>
