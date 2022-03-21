<script lang="ts">
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/SelectStringEncoding.svelte';
	import {
		hexStringFormats,
		stringInputEncoding2a,
		stringInputEncoding2b,
	} from '$lib/components/AlgorithmDemo/_demoText';
</script>

<div class="settings-help help-module">
	<div class="encoding-wrapper">
		<div class="string-encoding">
			<SelectStringEncoding value={'hex'} disabled={false} dropdownShown={true} />
		</div>
		<div class="encoding-description">
			{#each stringInputEncoding2a as paragraph}
				<p>{@html paragraph}</p>
			{/each}
			<div class="valid-hex-format">
				{#each hexStringFormats as [example, format]}
					<span class="example"><code>{@html example}</code></span>
					<span class="format">{@html format}</span>
				{/each}
			</div>
			{#each stringInputEncoding2b as paragraph}
				<p>{@html paragraph}</p>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.encoding-wrapper {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	.string-encoding {
		padding: 0 0.5rem;
		pointer-events: none;
	}
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
