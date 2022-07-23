<script lang="ts">
	export let toggled = false;

	$: buttonText = toggled ? 'Collapse All Emojis' : 'Expand All Emojis';
</script>

<button on:click={() => (toggled = !toggled)} on:click>{buttonText}</button>

<style lang="postcss">
	button,
	button:active,
	button:focus,
	button:active:focus {
		display: inline-flex;
		background-color: inherit;
		color: var(--pri-color);
		border: none;
		flex: 0 1 auto;
		margin: 0.5rem 0 0 0;
		font-size: 0.8rem;
	}
	button:hover {
		text-decoration: underline;
		background-color: inherit;
		color: var(--pri-color);
	}
</style>
