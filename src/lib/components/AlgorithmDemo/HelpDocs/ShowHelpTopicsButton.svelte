<script lang="ts">
	import Minus from '$lib/components/Icons/Minus.svelte';
	import Plus from '$lib/components/Icons/Plus.svelte';

	export let shown = false;
</script>

<div class="button-wrapper">
	<button
		id="show-help-topics-button"
		on:click={() => (shown = !shown)}
		on:click
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
	.button-wrapper,
	button,
	button:hover,
	button:active,
	button:focus,
	button:active:focus {
		background-color: transparent;
	}

	.button-wrapper {
		padding: 0.3rem 0.25rem;
		border-top-left-radius: 5px;
	}
	button {
		color: var(--black2);
		width: 1.1rem;
		height: 1.1rem;
		border: none;
		padding: 0;
		align-self: flex-start;
	}
</style>
