<script lang="ts">
	import {
		stringInputEncodingUTF81,
		stringInputEncodingUTF82,
	} from '$lib/components/AlgorithmDemo/HelpDocs/Sections/_helpText';
</script>

<div class="settings-help help-module">
	<div class="encoding-description">
		{#each stringInputEncodingUTF81 as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<ul>
			{#each stringInputEncodingUTF82 as utf8}
				<li><code>{utf8}</code></li>
			{/each}
		</ul>
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
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		margin: 0 0 0.5rem 0;
	}
</style>
