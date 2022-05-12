<script lang="ts">
	import Base64EncodeDemo from '$lib/components/AlgorithmDemo/Base64EncodeDemo/Base64EncodeDemo.svelte';
	import { createDemoStateStore, demoStateOld } from '$lib/stores/demoState';
	import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
	import { encodingMachine } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';
	import { setContext } from 'svelte';

	const { state, send } = useMachine<EncodingContext, EncodingEvent, EncodingTypeState>(encodingMachine);
	const demoState = createDemoStateStore(state);
	setContext('demo', { demoState });
	let pageWidth: number;

	$: height = pageWidth < 730 ? 'auto' : '100vh';
	$: gridStyles =
		pageWidth < 730 ? 'auto auto auto 1fr' : $state.matches('inactive') ? 'auto auto 1fr auto' : 'auto auto 1fr 265px';
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div class="base64-algo-demo" style="height: {height}; grid-template-rows: {gridStyles};">
	{#if $demoStateOld.mode === 'encode'}
		<Base64EncodeDemo {state} {send} />
		<!-- {:else if $demoState === 'decode'} -->
	{/if}
</div>

<style lang="postcss">
	.base64-algo-demo {
		display: grid;
		grid-template-columns: auto;
		position: relative;
		background-color: var(--page-bg-color);
		padding: 1rem;
		margin: 0 auto;
		width: 343px;
		min-height: 100vh;
	}
	@media screen and (min-width: 730px) {
		.base64-algo-demo {
			box-sizing: border-box;
			grid-template-columns: auto;
			width: 764px;
			padding: 1rem 2rem;
			column-gap: 1rem;
		}
	}
</style>
