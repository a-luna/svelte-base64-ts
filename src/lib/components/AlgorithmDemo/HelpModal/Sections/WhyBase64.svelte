<script lang="ts">
	import { whyBase64 } from '$lib/components/AlgorithmDemo/HelpModal/Sections/_helpText';
</script>

<div class="help-module">
	<div class="base64-help">
		{#each whyBase64 as paragraph}
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
