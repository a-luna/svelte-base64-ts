<script lang="ts">
	import Base64EncodeDemo from '$lib/components/AlgorithmDemo/Base64EncodeDemo/Base64EncodeDemo.svelte';
	import { demoState } from '$lib/stores/demoState';
	let pageWidth: number;

	$: height = pageWidth < 785 ? 'auto' : '100vh';
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div class="base64-algo-demo" style="height: {height};">
	{#if $demoState.mode === 'encode'}
		<Base64EncodeDemo />
		<!-- {:else if $demoState === 'decode'} -->
	{/if}
</div>

<style lang="postcss">
	.base64-algo-demo {
		display: grid;
		grid-template-columns: 378px 1fr;
		grid-template-rows: auto auto auto 1fr auto;
		gap: 0.5rem;
		position: relative;
		background-color: var(--page-bg-color);
		padding: 1rem 1.5rem;
		box-sizing: border-box;
		margin: 0 auto;
		width: 426px;
	}
	@media screen and (min-width: 785px) {
		.base64-algo-demo {
			grid-template-columns: auto;
			grid-template-rows: auto auto auto auto 1fr;
			width: 100%;
			max-width: 790px;
			gap: 1.5rem;
		}
	}
</style>
