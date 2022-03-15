<script lang="ts">
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/SelectStringEncoding.svelte';
	import {
		hexStringFormats,
		stringInputEncoding2a,
		stringInputEncoding2b,
	} from '$lib/components/AlgorithmDemo/_demoText';
</script>

<div class="settings-help help-module">
	<div class="input-encoding-wrapper">
		<div class="string-encoding">
			<SelectStringEncoding value={'hex'} disabled={false} dropdownShown={true} />
		</div>
		<div class="input-encoding-description">
			{#each stringInputEncoding2a as paragraph}
				<p>{@html paragraph}</p>
			{/each}
			<ul>
				{#each hexStringFormats as [example, format]}
					<li>
						<div class="hex-example">
							<span class="example"><code>{@html example}</code></span>
							<span class="format">{@html format}</span>
						</div>
					</li>
				{/each}
			</ul>
			{#each stringInputEncoding2b as paragraph}
				<p>{@html paragraph}</p>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.settings-help,
	.input-encoding-description {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.input-encoding-wrapper {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	.input-encoding-description {
		flex: 1;
	}
	.input-encoding-description ul {
		list-style: none;
		margin: 0;
		padding: 0 0 0 1rem;
		white-space: nowrap;
	}
	.input-encoding-description li {
		margin: 0 0 0.25rem 0;
	}
	.hex-example {
		display: flex;
		flex-flow: row nowrap;
		align-items: baseline;
		gap: 0.5rem;
	}
	.hex-example .example {
		flex: 0 1 88px;
	}
	.hex-example .format {
		color: var(--nav-button-autoplay-border-color);
		font-style: italic;
	}
	.string-encoding {
		padding: 0 0.5rem;
	}
</style>
