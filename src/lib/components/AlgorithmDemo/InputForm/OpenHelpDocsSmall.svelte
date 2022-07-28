<script lang="ts">
	import OpenHelpDocsButton from '$lib/components/AlgorithmDemo/Buttons/OpenHelpDocsButton.svelte';
</script>

<div class="help-docs-button-wrapper">
	<OpenHelpDocsButton label={'Help Docs'} name="help-docs-button-input-form" on:openHelpModal />
</div>

<style lang="postcss">
	.help-docs-button-wrapper {
		font-size: 0.75rem;

		justify-self: center;
		grid-column: 3 / span 1;
		grid-row: 1 / span 1;
	}

	@media screen and (min-width: 762px) {
		.help-docs-button-wrapper {
			justify-self: flex-end;
		}
	}
</style>
