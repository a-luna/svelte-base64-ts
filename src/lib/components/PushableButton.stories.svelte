<script>
	import { BUTTON_COLORS } from '$lib/types';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import PushableButton from './PushableButton.svelte';
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
	title="Pushable Button"
	component={PushableButton}
	argTypes={{
		color: {
			control: { type: 'select' },
			options: BUTTON_COLORS,
		},
		label: { control: 'text' },
		onClick: { action: 'onClick' },
		disabled: { control: 'boolean' },
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
		},
	}}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
	<PushableButton {...args} on:click={args.onClick}>{args.label}</PushableButton>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
	name="Indigo/Small"
	args={{
		color: 'indigo',
		label: 'Indigo',
		size: 'sm',
	}}
/>
<Story
	name="Teal/Small"
	args={{
		color: 'teal',
		label: 'Teal',
		size: 'sm',
	}}
/>
<Story
	name="Red/Medium"
	args={{
		color: 'red',
		label: 'Red',
		size: 'md',
	}}
/>
<Story
	name="Green/Large"
	args={{
		color: 'green',
		label: 'Green',
		size: 'lg',
	}}
/>
<Story
	name="Disabled/Medium"
	args={{
		color: 'red',
		label: 'Disabled',
		disabled: true,
		size: 'md',
	}}
/>
