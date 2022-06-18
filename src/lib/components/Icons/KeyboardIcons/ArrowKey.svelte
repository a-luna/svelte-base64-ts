<script lang="ts">
	import ArrowLeft from '$lib/components/Icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/components/Icons/ArrowRight.svelte';

	export let arrow: 'left' | 'right';
	export let size: 'sm' | 'md' | 'lg' = 'lg';

	$: tooltip = `${arrow.slice(0, 1)?.toUpperCase()}${arrow.slice(1)} Arrow Key`;
	$: iconWidth = size === 'sm' ? '13px' : size === 'md' ? '14px' : '16px';
	$: style = `height: ${iconWidth}; width: ${iconWidth}; line-height: ${iconWidth};`;
</script>

<kbd title={tooltip} {style}>
	{#if arrow === 'left'}
		<ArrowLeft />
	{:else if arrow === 'right'}
		<ArrowRight />
	{/if}
</kbd>

<style lang="postcss">
	kbd {
		display: inline-flex;
		margin: auto;
		padding: 0;
	}
</style>
