<script lang="ts">
	export let tooltip: string;
	export let name: string;
	export let disabled = false;
	export let margin = '0';
	export let style = '';
</script>

<button type="button" title={tooltip} {name} {disabled} on:click style="margin: {margin};{style}"><slot /></button>

<style lang="postcss">
	button {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		text-align: left;
		gap: 1rem;
		border: none;
		font-size: inherit;
		font-weight: 500;
		letter-spacing: inherit;
		background-color: inherit;
		color: var(--nav-button-autoplay-bg-color);
		padding: 0;
		height: auto;

		cursor: pointer;
		line-height: inherit;
	}

	button:focus,
	button:hover,
	button:active,
	button:active:focus {
		color: var(--sec-color);
		background-color: inherit;
	}
</style>
