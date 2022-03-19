<script lang="ts">
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/SelectBase64Encoding.svelte';

	export let title: string;
</script>

<div class="settings-help help-module">
	<div class="help-docs-section-title"><h2><span>{title}</span></h2></div>
	<div class="b64-encoding">
		<SelectBase64Encoding disabled={false} dropdownShown={true} />
	</div>
</div>

<style lang="postcss">
	.b64-encoding {
		align-items: center;
		height: 188px;
		pointer-events: none;
	}
</style>
