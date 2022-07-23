<script lang="ts">
	import Close from '$lib/components/Icons/Close.svelte';

	let hovering = false;
</script>

<div class="close-button-wrapper" class:hovering>
	<button
		type="button"
		class="btn-close"
		aria-label="Close"
		title="Close Help Docs"
		on:click
		on:mouseenter={() => (hovering = true)}
		on:mouseleave={() => (hovering = false)}><Close /></button
	>
</div>

<style lang="postcss">
	.close-button-wrapper {
		padding: 0.25rem;
		border-top-right-radius: 5px;
		background-color: var(--help-docs-border-color);
	}
	button {
		cursor: pointer;
		box-sizing: content-box;
		color: var(--black2);
		background-color: transparent;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 0;
		border-style: none;
		padding: 0;
		margin: 0;
		align-self: flex-start;
	}

	.hovering button {
		background-color: transparent;
	}

	.close-button-wrapper.hovering {
		background-color: var(--nav-button-active-bg-color);
	}

	@media screen and (min-width: 762px) {
		.close-button-wrapper,
		.close-button-wrapper.hovering {
			padding: 0;
			border-top-left-radius: 0px;
			background-color: inherit;
		}
		button {
			color: var(--light-gray4);
			width: 1rem;
			height: 1rem;
		}
		button:hover {
			color: var(--nav-button-avtive-bg-color);
		}
	}
</style>
