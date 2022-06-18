<script lang="ts">
	import DetailsSummary from '$lib/components/AlgorithmDemo/Base64EncodeDemo/DetailsSummary.svelte';
	import {
		getInactive_AppNavDemoText,
		getInactive_WelcomeDemoText,
	} from '$lib/components/AlgorithmDemo/Base64EncodeDemo/_demoText';
	import ArrowKey from '$lib/components/Icons/KeyboardIcons/ArrowKey.svelte';
	import type { DemoStore } from '$lib/types/DemoStore';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	let arrowSize: 'sm' | 'md' | 'lg';
	let welcomeDetailsElement: HTMLDetailsElement;
	let encodingDetailsElement: HTMLDetailsElement;
	let appNavDetailsElement: HTMLDetailsElement;
	let openSection: 'none' | 'welcome' | 'settings' | 'navigation' = 'welcome';
	let demoState: Readable<DemoStore>;
	({ demoState } = getContext('demo'));

	$: arrowSize = $demoState.isMobileDisplay ? 'sm' : 'md';

	function toggleWelcomeDetails() {
		if (welcomeDetailsElement.open) {
			appNavDetailsElement.open = false;
			encodingDetailsElement.open = false;
			openSection = 'welcome';
		} else if (!welcomeDetailsElement?.open && !encodingDetailsElement?.open && !appNavDetailsElement?.open) {
			openSection = 'none';
		}
	}

	function toggleEncodingDetails() {
		if (encodingDetailsElement.open) {
			appNavDetailsElement.open = false;
			welcomeDetailsElement.open = false;
			openSection = 'settings';
		} else if (!welcomeDetailsElement?.open && !encodingDetailsElement?.open && !appNavDetailsElement?.open) {
			openSection = 'none';
		}
	}

	function toggleAppNavDetails() {
		if (appNavDetailsElement.open) {
			welcomeDetailsElement.open = false;
			encodingDetailsElement.open = false;
			openSection = 'navigation';
		} else if (!welcomeDetailsElement?.open && !encodingDetailsElement?.open && !appNavDetailsElement?.open) {
			openSection = 'none';
		}
	}
</script>

<details bind:this={welcomeDetailsElement} on:toggle={() => toggleWelcomeDetails()} open>
	<DetailsSummary sectionName={'Welcome!'} thisSection={'welcome'} {openSection} />
	{#if welcomeDetailsElement?.open}
		<div transition:slide class="details-content">
			<p>
				Welcome to the <strong>Base64 Algorithm Demo</strong> app! Enter a string value in the text box above to get started.
			</p>
		</div>
	{/if}
</details>
<details bind:this={encodingDetailsElement} on:toggle={() => toggleEncodingDetails()}>
	<DetailsSummary sectionName={'Settings'} thisSection={'settings'} {openSection} />
	{#if encodingDetailsElement?.open}
		<div transition:slide class="details-content">
			{#each getInactive_WelcomeDemoText() as text}
				<p>{@html text}</p>
			{/each}
			<p>
				When ready, click the <strong>Next Step</strong> button (or press the <ArrowKey
					arrow="right"
					size={arrowSize}
				/> arrow key).
			</p>
		</div>
	{/if}
</details>
<details bind:this={appNavDetailsElement} on:toggle={() => toggleAppNavDetails()}>
	<DetailsSummary sectionName={'Navigation'} thisSection={'navigation'} {openSection} />
	{#if appNavDetailsElement?.open}
		<div transition:slide class="details-content">
			<p>
				You can proceed through the encoding process step-by-step (forward or backward) using the
				<strong>Prev. Step</strong> and <strong>Next Step</strong> buttons (<ArrowKey arrow="left" size={arrowSize} />
				and <ArrowKey arrow="right" size={arrowSize} /> arrow keys will perform the same function).
			</p>
			{#each getInactive_AppNavDemoText() as text}
				<p>{@html text}</p>
			{/each}
		</div>
	{/if}
</details>

<style lang="postcss">
	.details-content {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.75rem;
	}
</style>
