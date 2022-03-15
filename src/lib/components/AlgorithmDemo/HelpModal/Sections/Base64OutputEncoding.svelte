<script lang="ts">
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/SelectBase64Encoding.svelte';
	import { base64OutputEncoding } from '../../_demoText';
</script>

<div class="settings-help help-module">
	<div class="encoding-wrapper">
		<div class="b64-encoding">
			<SelectBase64Encoding disabled={false} dropdownShown={true} />
		</div>
		<div class="encoding-description">
			{#each base64OutputEncoding as paragraph}
				<p>{@html paragraph}</p>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.settings-help,
	.encoding-description {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.encoding-wrapper {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	.encoding-description {
		flex: 1;
	}
	.b64-encoding {
		padding: 0 0.5rem;
	}
</style>
