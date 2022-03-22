<script lang="ts">
	import CircleFull from '$lib/components/Icons/CircleFull.svelte';
	import CircleOutline from '$lib/components/Icons/CircleOutline.svelte';

	export let sectionTitles: string[] = [];
	export let index: number;
</script>

<ul>
	{#each sectionTitles as _, i}
		<li class="help-topic-dot" class:current-section={index === i} on:click={() => (index = i)}>
			{#if index === i}
				<CircleFull />
			{:else}
				<CircleOutline />
			{/if}
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
		margin: 0 auto;
		padding: 0;

		grid-column: 3 / span 1;
	}
	.help-topic-dot {
		cursor: pointer;
		width: 7px;
		color: var(--button-disabled-bg-color);
	}
	.current-section {
		color: var(--nav-button-active-bg-color);
	}
</style>
