<script lang="ts">
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/SelectBase64Encoding.svelte';
</script>

<div class="settings-help help-module">
	<div class="b64-encoding">
		<SelectBase64Encoding disabled={false} dropdownShown={true} />
	</div>
</div>

<style lang="postcss">
	.settings-help {
		display: flex;
		flex-flow: row nowrap;
		gap: 1.5rem;
		height: 188px;
	}
	.b64-encoding {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		align-items: center;
	}
</style>
