<script lang="ts">
	import Base64EncodeDemo from '$lib/components/AlgorithmDemo/Base64EncodeDemo/Base64EncodeDemo.svelte';
	import { demoState } from '$lib/stores/demoState';
	let pageWidth: number;

	$: height = pageWidth < 730 ? 'auto' : '100vh';
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
		grid-template-columns: auto;
		grid-template-rows: auto auto auto 1fr;
		position: relative;
		background-color: var(--page-bg-color);
		padding: 1rem;
		margin: 0 auto;
		width: 343px;
		min-height: 100vh;
	}
	@media screen and (min-width: 730px) {
		.base64-algo-demo {
			grid-template-columns: auto;
			grid-template-rows: auto auto auto 1fr;
			width: 700px;
			gap: 1rem;
		}
	}
</style>
