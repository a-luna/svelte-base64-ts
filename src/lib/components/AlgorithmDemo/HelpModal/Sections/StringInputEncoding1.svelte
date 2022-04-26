<script lang="ts">
	import { stringInputEncoding1 } from '$lib/components/AlgorithmDemo/HelpModal/Sections/_helpText';
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/SelectStringEncoding.svelte';
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
	.encoding-wrapper {
		min-height: 150px;
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
		gap: 0.5rem;
		flex: 1;
	}
</style>
