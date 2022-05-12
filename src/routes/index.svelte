<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import MainForm from '$lib/components/AlgorithmDemo/MainForm.svelte';
	import { demoStateOld } from '$lib/stores/demoState';
</script>

<svelte:head>
	<title>Base64 Visualizer</title>
</svelte:head>

<Alert />
<main class:encode={$demoStateOld.mode === 'encode'} class:decode={$demoStateOld.mode === 'decode'}>
	<MainForm />
</main>

<style lang="postcss">
	main {
		margin: 0 auto;
	}
</style>
