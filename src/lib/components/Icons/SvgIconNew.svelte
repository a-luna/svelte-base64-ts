<script lang="ts">
	export let viewBox: string;
	export let title = '';
	export let width = '100%';
	export let height = 'auto';
	export let fill = 'currentColor';
	export let strokeWidth = '0';
	export let padding = '0';
	export let customClass = '';

	$: useWidth = calculateSize(width);
	$: useHeight = calculateSize(height);

	function calculateSize(input: string): string {
		const parsedInt = parseInt(input);
		return input.slice(-1) === '%' ? input : parsedInt ? `${parsedInt}px` : input;
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
	{fill}
	width={useWidth}
	height={useHeight}
	stroke="currentColor"
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	style="padding: {padding};"
	class={customClass}
>
	{#if title}
		<title>{title}</title>
	{/if}
	<slot />
</svg>

<style>
	svg {
		max-height: 100%;
	}
</style>
