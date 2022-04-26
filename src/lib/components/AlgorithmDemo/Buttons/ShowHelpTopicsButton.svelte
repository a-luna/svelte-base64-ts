<script lang="ts">
	import Minus from '$lib/components/Icons/Minus.svelte';
	import Plus from '$lib/components/Icons/Plus.svelte';

	export let shown = false;
</script>

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

<style lang="postcss">
	#show-help-topics-button {
		width: 0.9rem;
		height: 0.9rem;
		color: var(--nav-button-hover-bg-color);
		background-color: inherit;
		border: none;
		padding: 0;
	}

	#show-help-topics-button:hover,
	#show-help-topics-button:focus,
	#show-help-topics-button:active,
	#show-help-topics-button:active:focus {
		color: var(--nav-button-active-bg-color);
	}
</style>
