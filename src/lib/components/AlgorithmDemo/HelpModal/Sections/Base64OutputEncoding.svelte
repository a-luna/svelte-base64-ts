<script lang="ts">
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/SelectBase64Encoding.svelte';
	import { base64OutputEncoding } from '$lib/components/AlgorithmDemo/_demoText';

	export let title: string;
</script>

<div class="settings-help help-module">
	<div class="help-docs-section-title"><h2><span>{title}</span></h2></div>
	<div class="encoding-wrapper">
		<div class="b64-encoding">
			<SelectBase64Encoding fontSize={'0.75rem'} disabled={false} dropdownShown={true} />
		</div>
		<div class="encoding-description">
			{#each base64OutputEncoding as paragraph}
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
	.encoding-description {
		display: flex;
		flex: 1;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.b64-encoding {
		padding: 0 0.5rem;
		pointer-events: none;
	}
</style>
