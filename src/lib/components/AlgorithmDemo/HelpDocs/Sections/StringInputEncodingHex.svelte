<script lang="ts">
	import {
		hexStringFormats,
		stringInputEncodingHex1,
		stringInputEncodingHex2,
	} from '$lib/components/AlgorithmDemo/HelpDocs/Sections/_helpText';
</script>

<div class="settings-help help-module">
	<div class="encoding-description">
		{#each stringInputEncodingHex1 as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<div class="valid-hex-format">
			{#each hexStringFormats as [example, format]}
				<span class="example"><code>{@html example}</code></span>
				<span class="format">{@html format}</span>
			{/each}
		</div>
		{#each stringInputEncodingHex2 as paragraph}
			<p>{@html paragraph}</p>
		{/each}
	</div>
</div>

<style lang="postcss">
	.encoding-description {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		gap: 0.75rem;
		flex: 1;
	}
	.valid-hex-format {
		display: grid;
		grid-template-columns: 87px auto;
		gap: 0.25rem;
		padding: 0 0 0 1rem;
		white-space: nowrap;
	}
	.valid-hex-format .format {
		color: var(--nav-button-autoplay-border-color);
		font-style: italic;
	}
</style>
