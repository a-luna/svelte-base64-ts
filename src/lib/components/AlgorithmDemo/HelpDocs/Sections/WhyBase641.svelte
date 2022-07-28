<script lang="ts">
	import { whyBase641 } from '$lib/components/AlgorithmDemo/HelpDocs/Sections/_helpText';
</script>

<div class="help-module">
	<div class="base64-help">
		{#each whyBase641 as paragraph}
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
