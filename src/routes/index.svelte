<script>
	import Alert from '$lib/components/Alert.svelte';
	import AlgorithmDemo from '$lib/components/AlgorithmDemo/Base64EncodeDemo/Base64EncodeDemo.svelte';
	import { app } from '$lib/stores/app';
</script>

<svelte:head>
	<title>Base64 Visualizer</title>
</svelte:head>

<Alert />
<main class:encode={$app.encoderMode} class:decode={$app.decoderMode}>
	<AlgorithmDemo />
</main>

<style lang="postcss">
	main {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		gap: 1rem;
		position: relative;
		background-color: var(--page-bg-color);
		padding: 1rem 1.5rem;
		margin: 0 auto;
		box-sizing: border-box;
		height: 100vh;
	}
</style>
