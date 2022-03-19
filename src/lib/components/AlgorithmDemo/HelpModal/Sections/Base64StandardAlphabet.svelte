<script lang="ts">
	import { whatIsBase64Standard } from '$lib/components/AlgorithmDemo/_demoText';

	export let title: string;
</script>

<div class="settings-help help-module">
	<div class="help-docs-section-title"><h2><span>{title}</span></h2></div>
	<div class="base64-help help-module">
		{#each whatIsBase64Standard as paragraph}
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
