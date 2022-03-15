<script lang="ts">
	import Base64StandardAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64StandardAlphabet.svelte';
	import Base64UrlAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64UrlAlphabet.svelte';
	import KeyboardHelpSection from '$lib/components/AlgorithmDemo/HelpModal/Sections/KeyboardHelpSection.svelte';
	import NavButtonsHelpSection from '$lib/components/AlgorithmDemo/HelpModal/Sections/NavButtonsHelpSection.svelte';
	import SettingsHelpSection from '$lib/components/AlgorithmDemo/HelpModal/Sections/SettingsHelpSection.svelte';
	import WhatIsBase64Section from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsBase64Section.svelte';
	import WhatIsntBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsntBase64.svelte';
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let index = 0;
	let modal: Modal;
	const sections = [
		WhatIsBase64Section,
		WhatIsntBase64,
		Base64StandardAlphabet,
		Base64UrlAlphabet,
		SettingsHelpSection,
		NavButtonsHelpSection,
		KeyboardHelpSection,
	];

	export const toggleModel = () => modal.toggleModal();
	const next = () => (index = (index + 1) % sections.length);
	const prev = () => {
		if (index > 0) {
			index = (index - 1) % sections.length;
		} else {
			index = sections.length - 1;
		}
	};
</script>

<Modal bind:this={modal} title={'Help Documentation'}>
	<div class="help-docs">
		<div class="nav nav-prev" on:click={() => prev()}><ChevronLeft /></div>
		<svelte:component this={sections[index]} />
		<div class="nav nav-next" on:click={() => next()}><ChevronRight /></div>
	</div>
</Modal>

<style lang="postcss">
	.help-docs {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: row wrap;
		gap: 1.5rem;
	}
	.nav {
		cursor: pointer;
		width: 15px;
		flex: 0 1 auto;
	}
</style>
