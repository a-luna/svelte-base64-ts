<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import MainForm from '$lib/components/MainForm.svelte';
	import { app } from '$lib/stores/app';
</script>

<svelte:head>
	<title>Base64 Visualizer</title>
</svelte:head>

<Alert />
<main class:encode={$app.encoderMode} class:decode={$app.decoderMode}>
	<MainForm />
</main>

<style lang="postcss">
	main {
		margin: 0 auto;
	}
</style>
