<script lang="ts">
	import Minus from '$lib/components/Icons/Minus.svelte';
	import Plus from '$lib/components/Icons/Plus.svelte';

	export let shown = false;
	let hovering = false;
</script>

<div class="button-wrapper" class:hovering>
	<button
		id="show-combined-emoji-button"
		on:click={() => (shown = !shown)}
		on:click
		on:mouseenter={() => (hovering = true)}
		on:mouseleave={() => (hovering = false)}
		title="Click to view a list of all help topics"
	>
		{#if shown}
			<Minus />
		{:else}
			<Plus />
		{/if}
	</button>
</div>

<style lang="postcss">
	.button-wrapper {
		border-top-left-radius: 6px;
		background-color: inherit;
		height: 16px;
	}
	#show-combined-emoji-button {
		width: 0.9rem;
		height: 0.9rem;
		color: var(--pri-color);
		background-color: transparent;
		border: none;
		padding: 0;
		align-self: flex-start;
	}

	.hovering button {
		background-color: transparent;
	}
</style>
