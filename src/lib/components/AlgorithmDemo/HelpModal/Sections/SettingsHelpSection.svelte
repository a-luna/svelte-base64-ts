<script lang="ts">
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/SelectBase64Encoding.svelte';
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/SelectStringEncoding.svelte';
	import { appMode } from '$lib/stores/appMode';
</script>

<div class="settings-help help-module">
	{#if $appMode === 'encode'}
		<div class="string-encoding">
			<h2><span>Input string encoding</span></h2>
			<SelectStringEncoding disabled={false} dropdownShown={true} />
		</div>
		<div class="b64-encoding">
			<h2><span>Output string encoding</span></h2>
			<SelectBase64Encoding disabled={false} dropdownShown={true} />
		</div>
	{:else}
		<div class="b64-encoding">
			<h2><span>Input string encoding</span></h2>
			<SelectBase64Encoding disabled={false} dropdownShown={true} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.settings-help {
		display: flex;
		flex-flow: row nowrap;
		gap: 1.5rem;
		height: 188px;
	}
	.string-encoding,
	.b64-encoding {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		align-items: center;
	}
</style>
