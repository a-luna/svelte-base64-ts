<script lang="ts">
	import Help from '$lib/components/Icons/Help.svelte';
</script>

<button id="help" on:click title="Click to view instructions/keyboard shortcuts">
	<Help />
</button>

<style lang="postcss">
	#help {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--nav-button-border-color);
		border-radius: 9999px;
		padding: 6px 5px;
	}

	#help:focus,
	#help:active,
	#help:active:focus {
		border: 1px solid var(--nav-button-active-border-color);
	}
</style>
