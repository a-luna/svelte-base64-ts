<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import AlgorithmDemo from '$lib/components/AlgorithmDemo/Base64EncodeDemo/Base64EncodeDemo.svelte';
	import { app } from '$lib/stores/app';

	let pageWidth: number;

	$: height = pageWidth < 830 ? 'auto' : '100vh';
</script>

<svelte:head>
	<title>Base64 Visualizer</title>
</svelte:head>

<svelte:window bind:innerWidth={pageWidth} />

<Alert />
<main class:encode={$app.encoderMode} class:decode={$app.decoderMode} style="height: {height};">
	<AlgorithmDemo />
</main>

<style lang="postcss">
	main {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		gap: 1.5rem;
		position: relative;
		background-color: var(--page-bg-color);
		padding: 1rem 1.5rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
