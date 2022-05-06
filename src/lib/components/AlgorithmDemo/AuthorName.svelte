<script lang="ts">
	import Github from '$lib/components/Icons/Github.svelte';
</script>

<div class="author-name-wrapper">
	<span class="author-text">Created by <a href="https://github.com/a-luna" class="author-name">@a-luna</a></span>
	<a href="https://github.com/a-luna/svelte-base64-ts" class="author-github"><Github /></a>
</div>

<style lang="postcss">
	.author-name-wrapper {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		gap: 0.5rem;
		font-family: menlo, monospace;
	}
	.author-text {
		color: var(--nav-button-hover-bg-color);
		border-right: 1px solid var(--nav-button-bg-color);
		padding: 0 0.5rem 0 0;
		font-size: 0.75rem;
	}
	a {
		text-decoration: none;
	}
	.author-name,
	.author-github {
		color: var(--nav-button-active-bg-color);
		font-weight: 700;
		height: 16px;
	}
	/* .author-github {
		margin: 4px 0 0 0;
	} */
</style>
