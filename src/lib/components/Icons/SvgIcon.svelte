<script lang="ts">
	export let title: string = null;
	export let viewBox: string;
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<svg xmlns="http://www.w3.org/2000/svg" {viewBox} style="stroke-width: {strokeWidth}; padding: {padding};">
	{#if title}
		<title>{title}</title>
	{/if}
	<slot />
</svg>

<style>
	svg {
		stroke: currentColor;
		fill: currentColor;
		width: 100%;
		height: auto;
		max-height: 100%;
	}
</style>
