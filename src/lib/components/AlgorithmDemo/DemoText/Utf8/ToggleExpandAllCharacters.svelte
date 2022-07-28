<script lang="ts">
	import Minus from '$lib/components/Icons/Minus.svelte';
	import Plus from '$lib/components/Icons/Plus.svelte';

	export let toggled = false;
</script>

<div class="button-wrapper">
	<button
		class="show-combined-emoji-button"
		on:click={() => (toggled = !toggled)}
		on:click
		title="Click to {toggled ? 'collapse' : 'expand'} all emojis which are comprised of multiple characters"
	>
		<div class="icon">
			{#if toggled}
				<Minus />
			{:else}
				<Plus />
			{/if}
		</div>
		<span>{toggled ? 'Collapse All' : 'Expand All'}</span>
	</button>
</div>

<style lang="postcss">
	.button-wrapper {
		border-top-left-radius: 6px;
		background-color: inherit;
	}
	.show-combined-emoji-button {
		display: flex;
		gap: 0.25rem;
		align-items: center;
		align-self: center;
		font-size: 0.7rem;
		font-weight: 700;
		height: auto;
		color: var(--black2);
		background-color: var(--nav-button-bg-color);
		border: none;
		border-radius: 6px;
		padding: 3px 4px;
	}
	.show-combined-emoji-button:hover,
	.show-combined-emoji-button:focus,
	.show-combined-emoji-button:active,
	.show-combined-emoji-button:active:focus {
		color: var(--black2);
		background-color: var(--nav-button-active-bg-color);
	}
	.icon {
		width: 0.8rem;
		height: 0.8rem;
		color: var(--black2);
		background-color: transparent;
		border: none;
		padding: 0;
	}
</style>
