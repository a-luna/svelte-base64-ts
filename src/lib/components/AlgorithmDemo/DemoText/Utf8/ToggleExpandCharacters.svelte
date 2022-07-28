<script lang="ts">
	import Minus from '$lib/components/Icons/Minus.svelte';
	import Plus from '$lib/components/Icons/Plus.svelte';

	export let toggled = false;

	$: tooltip = toggled
		? 'Click to hide the individual characters that create this emoji'
		: 'Click to show all characters that comprise this emoji';
</script>

<div class="button-wrapper">
	<button class="show-combined-emoji-button" on:click={() => (toggled = !toggled)} on:click title={tooltip}>
		{#if toggled}
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
	.show-combined-emoji-button {
		width: 0.9rem;
		height: 0.9rem;
		color: var(--pri-color);
		background-color: transparent;
		border: none;
		padding: 0;
		align-self: flex-start;
	}
	.show-combined-emoji-button:hover,
	.show-combined-emoji-button:focus,
	.show-combined-emoji-button:active,
	.show-combined-emoji-button:active:focus {
		color: var(--pri-color);
		background-color: transparent;
	}
</style>
