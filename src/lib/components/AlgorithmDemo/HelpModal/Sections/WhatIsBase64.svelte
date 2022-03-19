<script lang="ts">
	import { whatIsBase64 } from '$lib/components/AlgorithmDemo/_demoText';

	export let title: string;
</script>

<div class="help-module">
	<div class="help-docs-section-title"><h2><span>{title}</span></h2></div>
	<div class="base64-help">
		{#each whatIsBase64 as paragraph}
			<p>{@html paragraph}</p>
		{/each}
	</div>
</div>

<style lang="postcss">
	.base64-help {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
</style>
