<script lang="ts">
	import Close from '$lib/components/Icons/Close.svelte';
</script>

<button type="button" class="btn-close" aria-label="Close" title="Close Help Docs" on:click><Close /></button>

<style lang="postcss">
	button {
		cursor: pointer;
		box-sizing: content-box;
		color: var(--light-gray4);
		background-color: inherit;
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 0;
		border-style: none;
		padding: 0;
		margin: 0 0 0 auto;
	}

	button:hover {
		color: var(--nav-button-avtive-bg-color);
		background-color: inherit;
	}
</style>
