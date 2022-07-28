<script lang="ts">
	import {
		binStringFormats,
		stringInputEncodingBinary,
	} from '$lib/components/AlgorithmDemo/HelpDocs/Sections/_helpText';
</script>

<div class="settings-help help-module">
	<div class="encoding-description">
		{#each stringInputEncodingBinary as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<div class="valid-binary-format">
			{#each binStringFormats as format}
				<span class="format">{@html format}</span>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.encoding-description {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		flex: 1;
	}
	.valid-binary-format {
		display: grid;
		grid-template-columns: auto;
		gap: 0.5rem;
		padding: 0 0 0 1rem;
	}
	.format {
		color: var(--nav-button-autoplay-border-color);
		font-style: italic;
	}
</style>
