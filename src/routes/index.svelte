<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import MainForm from '$lib/components/AlgorithmDemo/MainForm.svelte';
	import { appMode } from '$lib/stores/appMode';
</script>

<svelte:head>
	<title>Base64 Visualizer</title>
</svelte:head>

<Alert />
<main class:encode={$appMode === 'encode'} class:decode={$appMode === 'decode'}>
	<MainForm />
</main>

<style lang="postcss">
	main {
		margin: 0 auto;
	}
</style>
