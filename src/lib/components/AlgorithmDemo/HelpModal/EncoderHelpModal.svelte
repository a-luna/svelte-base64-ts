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
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { demoState } from '$lib/stores/demoState';

	let index = 0;
	let modal: Modal;
	let closed: boolean;
	const helpSections = [
		['What Is Base64?', WhatIsBase64],
		['Why Base64?', WhyBase64],
		["What Isn't Base64?", WhatIsntBase64],
		['Base64 Standard Alphabet', Base64StandardAlphabet],
		['Base64 Url-Safe Alphabet', Base64UrlAlphabet],
		['Input Encoding (ASCII)', StringInputEncoding1],
		['Input Encoding (Hex)', StringInputEncoding2],
		['Input Encoding (Binary)', StringInputEncoding3],
		['Output Encoding', Base64OutputEncoding],
		['Navigational Buttons', NavButtons],
		['Keyboard Shortcuts', KeyboardShortcuts],
	];

	$: $demoState.modalOpen = !closed;

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

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} />

<Modal bind:this={modal} bind:closed title={'Base64 Encoding Help Docs'}>
	<div class="help-docs">
		<div class="help-docs-nav">
			<h3><span>Contents</span></h3>
			<ul>
				{#each helpSections as [section, _], i}
					<li>
						<span class="nav-link" class:current-section={index === i} on:click={() => (index = i)}>{section}</span>
					</li>
				{/each}
			</ul>
		</div>
		<div class="help-docs-wrapper">
			<div class="help-docs-section-title"><h2><span>{helpSections[index][0]}</span></h2></div>
			<div class="help-docs-content">
				{#if index === 0}
					<WhatIsBase64 />
				{:else if index === 1}
					<WhyBase64 />
				{:else if index === 2}
					<WhatIsntBase64 />
				{:else if index === 3}
					<Base64StandardAlphabet />
				{:else if index === 4}
					<Base64UrlAlphabet />
				{:else if index === 5}
					<StringInputEncoding1 />
				{:else if index === 6}
					<StringInputEncoding2 />
				{:else if index === 7}
					<StringInputEncoding3 />
				{:else if index === 8}
					<Base64OutputEncoding />
				{:else if index === 9}
					<NavButtons />
				{:else if index === 10}
					<KeyboardShortcuts />
				{/if}
			</div>
			<div class="nav-buttons">
				{#if index > 0}
					<div class="nav nav-prev" on:click={() => prev()}>
						<div class="nav-icon"><ChevronLeft /></div>
						<span>Prev</span>
					</div>
				{:else}
					<div class="placeholder" />
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
