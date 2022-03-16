<script lang="ts">
	import Base64OutputEncoding from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64OutputEncoding.svelte';
	import Base64StandardAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64StandardAlphabet.svelte';
	import Base64UrlAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64UrlAlphabet.svelte';
	import KeyboardShortcuts from '$lib/components/AlgorithmDemo/HelpModal/Sections/KeyboardShortcuts.svelte';
	import NavButtons from '$lib/components/AlgorithmDemo/HelpModal/Sections/NavButtons.svelte';
	import StringInputEncoding1 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncoding1.svelte';
	import StringInputEncoding2 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncoding2.svelte';
	import StringInputEncoding3 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncoding3.svelte';
	import WhatIsBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsBase64.svelte';
	import WhatIsntBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsntBase64.svelte';
	import WhyBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhyBase64.svelte';
	import SelectHelpTopic from '$lib/components/AlgorithmDemo/HelpModal/SelectHelpTopic.svelte';
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { demoState } from '$lib/stores/demoState';

	let index = 0;
	let modal: Modal;
	let closed: boolean;
	let pageWidth: number;
	let sectionNames: string[];
	const helpSections = [
		{ name: 'Why Base64?', comp: WhyBase64 },
		{ name: 'What Is Base64?', comp: WhatIsBase64 },
		{ name: "What Isn't Base64?", comp: WhatIsntBase64 },
		{ name: 'Base64 Standard Alphabet', comp: Base64StandardAlphabet },
		{ name: 'Base64 Url-Safe Alphabet', comp: Base64UrlAlphabet },
		{ name: 'Input Encoding (ASCII)', comp: StringInputEncoding1 },
		{ name: 'Input Encoding (Hex)', comp: StringInputEncoding2 },
		{ name: 'Input Encoding (Binary)', comp: StringInputEncoding3 },
		{ name: 'Output Encoding', comp: Base64OutputEncoding },
		{ name: 'Navigational Buttons', comp: NavButtons },
		{ name: 'Keyboard Shortcuts', comp: KeyboardShortcuts },
	];

	$: $demoState.modalOpen = !closed;
	$: showContentsPanel = pageWidth > 670;
	$: showContentsDropDown = pageWidth <= 670;
	$: navButtonsStyle = showContentsDropDown ? 'justify-content: space-evenly;' : 'justify-content: space-between;';
	$: sectionNames = helpSections.map((h) => h.name);

	export const toggleModal = () => modal.toggleModal();
	const next = () => (index = (index + 1) % helpSections.length);
	const prev = () => {
		if (index > 0) {
			index = (index - 1) % helpSections.length;
		} else {
			index = helpSections.length - 1;
		}
	};

	function handleKeyPress(key: string) {
		if (key === 'ArrowRight') {
			next();
		}
		if (key === 'ArrowLeft') {
			prev();
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} bind:outerWidth={pageWidth} />

<Modal bind:this={modal} bind:closed title={'Base64 Encoding Help Docs'}>
	<div class="help-docs">
		{#if showContentsPanel}
			<div class="help-docs-nav">
				<h3><span>Contents</span></h3>
				<ul>
					{#each helpSections as { name }, i}
						<li>
							<span class="nav-link" class:current-section={index === i} on:click={() => (index = i)}>{name}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		<div class="help-docs-wrapper">
			<div class="help-docs-section-title"><h2><span>{helpSections[index].name}</span></h2></div>
			<div class="help-docs-content">
				<svelte:component this={helpSections[index].comp} />
			</div>
			<div class="nav-buttons" style={navButtonsStyle}>
				{#if index > 0}
					<div class="nav nav-prev" on:click={() => prev()}>
						<div class="nav-icon"><ChevronLeft /></div>
						<span>Prev</span>
					</div>
				{:else}
					<div class="placeholder" />
				{/if}
				{#if showContentsDropDown}
					<SelectHelpTopic {sectionNames} bind:value={index} />
				{/if}
				{#if index < helpSections.length - 1}
					<div class="nav nav-next" on:click={() => next()}>
						<span>Next</span>
						<div class="nav-icon"><ChevronRight /></div>
					</div>
				{:else}
					<div class="placeholder" />
				{/if}
			</div>
		</div>
	</div>
</Modal>
