<script lang="ts">
	import Base64EncodeDemo from '$lib/components/AlgorithmDemo/Base64EncodeDemo/Base64EncodeDemo.svelte';
	import { demoState } from '$lib/stores/demoState';
	let pageWidth: number;

	$: height = pageWidth < 830 ? 'auto' : '100vh';
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
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		gap: 1.5rem;
		position: relative;
		background-color: var(--page-bg-color);
		padding: 1rem 1.5rem;
		box-sizing: border-box;
		max-width: 832px;
		margin: 0 auto;
	}
</style>
