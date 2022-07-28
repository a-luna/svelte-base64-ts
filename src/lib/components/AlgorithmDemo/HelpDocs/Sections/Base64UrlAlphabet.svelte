<script lang="ts">
	import { whatIsBase64Url } from '$lib/components/AlgorithmDemo/HelpDocs/Sections/_helpText';
</script>

<div class="base64-help help-module">
	<div class="base64-help help-module">
		{#each whatIsBase64Url as paragraph}
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
