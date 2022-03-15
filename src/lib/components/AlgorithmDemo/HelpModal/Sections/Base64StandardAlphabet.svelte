<script lang="ts">
	import { whatIsBase64Standard } from '$lib/components/AlgorithmDemo/_demoText';
</script>

<div class="base64-help help-module">
	<h2><span>Base64 Standard Alphabet</span></h2>
	{#each whatIsBase64Standard as paragraph}
		<p>{@html paragraph}</p>
	{/each}
</div>

<style lang="postcss">
	.base64-help {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		width: 75%;
	}
	p {
		margin: 0;
	}
</style>
