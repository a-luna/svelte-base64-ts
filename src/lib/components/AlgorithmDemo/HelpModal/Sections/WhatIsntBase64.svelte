<script lang="ts">
	import { whatIsntBase64 } from '$lib/components/AlgorithmDemo/_demoText';
</script>

<div class="base64-help help-module">
	<h2><span>What isn't Base64?</span></h2>
	{#each whatIsntBase64 as paragraph}
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
</style>
