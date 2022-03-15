<script lang="ts">
	import { whatIsBase64 } from '$lib/components/AlgorithmDemo/_demoText';
</script>

<div class="base64-help help-module">
	{#each whatIsBase64 as paragraph}
		<p>{@html paragraph}</p>
	{/each}
</div>

<style lang="postcss">
	.base64-help {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
</style>
