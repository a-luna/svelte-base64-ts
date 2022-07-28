<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import MainForm from '$lib/components/AlgorithmDemo/MainForm.svelte';
	import { demoUIState } from '$lib/stores/demoState';

	// $: if (typeof window !== 'undefined') inspect({ iframe: false });
</script>

<svelte:head>
	<title>Base64 Visualizer</title>
</svelte:head>

<Alert />
<main class:encode={$demoUIState.mode === 'encode'} class:decode={$demoUIState.mode === 'decode'}>
	<MainForm />
</main>

<style lang="postcss">
	main {
		margin: 0 auto;
	}
</style>
