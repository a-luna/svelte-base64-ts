<script lang="ts">
	import Github from '$lib/components/Icons/Github.svelte';
</script>

<div class="author-name-wrapper">
	<span class="author-text">Created by <a href="https://github.com/a-luna" class="author-name">@a-luna</a></span>
	<span class="author-text">|</span>
	<a href="https://github.com/a-luna/svelte-base64-ts" class="author-github"><Github /></a>
</div>

<style lang="postcss">
	.author-name-wrapper {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		font-family: menlo, monospace;
		line-height: 1;
	}
	.author-text {
		color: var(--nav-button-bg-color);
	}
	a {
		text-decoration: none;
	}
	.author-name,
	.author-github {
		color: var(--nav-button-active-bg-color);
	}
</style>
