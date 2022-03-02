<svelte:options accessors />

<script lang="ts">
	import type { SelectMenuOption } from '$lib/types';
	import { clickOutside, getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import FaCaretDown from 'svelte-icons/fa/FaCaretDown.svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Option from './Option.svelte';

	export let menuLabel: string = 'Options';
	export let options: SelectMenuOption[] = [];
	export let selectedValue: number | string;
	export let flexStyles = 'flex: 1 0 auto;';
	export let width: string = 'auto';
	export let margin: string = '0';
	export let fontSize: string = '0.95rem';
	export let disabled: boolean = false;
	export let displaySelectedOptionText = true;
	export let menuId: string = `select-menu-${getRandomHexString(4)}`;
	export let buttonHeight = '33px';
	export let buttonPadding = '9px 11px 9px 14px';
	export let dropdownShown: boolean = false;
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
			style="font-size: {fontSize}; height: {buttonHeight}; padding: {buttonPadding}"
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
		font-weight: 500;
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
	}

	button:focus {
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		outline: 0;
	}

	.select-menu-wrapper {
		position: relative;
		display: inline-block;
		text-align: left;
	}

	.open-list-button,
	.dropdown {
		background-color: var(--select-bg-color, var(--white2));
		color: var(--select-text-color, var(--black2));
		border: 1px solid var(--select-border-color, var(--light-gray2));
	}

	.dropdown {
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

	.open-list-button:hover {
		background-color: var(--select-bg-color-hov, var(--white4));
	}

	.open-list-button.disabled {
		cursor: default;
		color: var(--select-text-color-disabled, var(--dark-gray2));
		background-color: var(--select-bg-color-disabled, var(--light-gray1));
	}

	.open-list-button.no-selection {
		color: var(--select-text-color-no-selection, var(--gray4));
	}

	.selected-value {
		line-height: 1;
		white-space: nowrap;
		margin: 0 auto;
	}
</style>
