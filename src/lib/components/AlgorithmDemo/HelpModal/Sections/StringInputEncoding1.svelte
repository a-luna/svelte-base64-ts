<script lang="ts">
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/SelectStringEncoding.svelte';
	import { stringInputEncoding1 } from '$lib/components/AlgorithmDemo/_demoText';
</script>

<div class="settings-help help-module">
	<div class="encoding-wrapper">
		<div class="string-encoding">
			<SelectStringEncoding disabled={false} dropdownShown={true} />
		</div>
		<div class="encoding-description">
			{#each stringInputEncoding1 as paragraph}
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
	.string-encoding {
		padding: 0 0.5rem;
	}
</style>
