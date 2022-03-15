<script lang="ts">
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/SelectStringEncoding.svelte';
	import { binStringFormats, stringInputEncoding3 } from '$lib/components/AlgorithmDemo/_demoText';
</script>

<div class="settings-help help-module">
	<div class="string-encoding">
		<SelectStringEncoding value={'bin'} disabled={false} dropdownShown={true} />
	</div>
	<div class="input-encoding-description">
		{#each stringInputEncoding3 as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<ul>
			{#each binStringFormats as format}
				<li><span class="format">{@html format}</span></li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	.settings-help,
	.input-encoding-description {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	.input-encoding-description {
		flex: 1;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.input-encoding-description ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.input-encoding-description li {
		margin: 0 0 0.25rem 0;
	}
	.format {
		color: var(--nav-button-autoplay-border-color);
		font-style: italic;
	}
	.string-encoding {
		padding: 0 0.5rem;
		height: 158px;
	}
</style>
