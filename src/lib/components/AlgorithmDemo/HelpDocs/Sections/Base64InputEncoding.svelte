<script lang="ts">
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/InputForm/SelectBase64Encoding.svelte';
</script>

<div class="settings-help help-module">
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
