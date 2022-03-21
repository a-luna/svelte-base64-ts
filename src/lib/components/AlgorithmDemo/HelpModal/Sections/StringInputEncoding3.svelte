<script lang="ts">
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/SelectStringEncoding.svelte';
	import { binStringFormats, stringInputEncoding3 } from '$lib/components/AlgorithmDemo/_demoText';
</script>

<div class="settings-help help-module">
	<div class="binary-string-docs">
		<div class="string-encoding">
			<SelectStringEncoding value={'bin'} disabled={false} dropdownShown={true} />
		</div>
		<div class="encoding-description">
			{#each stringInputEncoding3 as paragraph}
				<p>{@html paragraph}</p>
			{/each}
			<div class="valid-binary-format">
				{#each binStringFormats as format}
					<span class="format">{@html format}</span>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.binary-string-docs {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	.string-encoding {
		padding: 0 0.5rem;
		height: 158px;
		pointer-events: none;
	}
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
