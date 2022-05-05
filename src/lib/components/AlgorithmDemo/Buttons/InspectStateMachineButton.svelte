<script lang="ts">
	import BezierCurve from '$lib/components/Icons/BezierCurve.svelte';
</script>

<button id="inspect-state-machine-button" on:click title="Click to view the state machine in the XState visualizer">
	<BezierCurve />
</button>

<style lang="postcss">
	#inspect-state-machine-button {
		position: absolute;
		z-index: 2;
		right: 0;
		height: 30px;
		line-height: 1;
		background-color: var(--nav-button-stop-autoplay-bg-color);
		border: 1px solid var(--nav-button-autoplay-bg-color);
		border-radius: 99px;
		padding: 6px;
		margin: 0;
		width: 30px;
		cursor: pointer;
		opacity: 0.6;
	}

	#inspect-state-machine-button:hover,
	#inspect-state-machine-button:focus,
	#inspect-state-machine-button:active,
	#inspect-state-machine-button:active:focus {
		background-color: var(--nav-button-autoplay-bg-color);
		opacity: 0.9;
	}
</style>
