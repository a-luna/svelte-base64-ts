<script lang="ts">
	import { stringInputEncoding2 } from '$lib/components/AlgorithmDemo/HelpModal/Sections/_helpText';
</script>

<div class="settings-help help-module">
	<div class="encoding-description">
		{#each stringInputEncoding2 as paragraph}
			<p>{@html paragraph}</p>
		{/each}
	</div>
</div>

<style lang="postcss">
	.encoding-description {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		gap: 0.5rem;
		flex: 1;
	}
</style>
