<script lang="ts">
	import CircleFull from '$lib/components/Icons/CircleFull.svelte';
	import CircleOutline from '$lib/components/Icons/CircleOutline.svelte';

	export let expanded: boolean;
</script>

<div class="list-icon">
	{#if expanded}
		<CircleFull />
	{:else}
		<CircleOutline />
	{/if}
</div>

<style lang="postcss">
	div {
		width: 10px;
	}
	.list-icon {
		color: var(--pri-color);
	}

	@media screen and (min-width: 762px) {
		div {
			width: 12px;
		}
	}
</style>
