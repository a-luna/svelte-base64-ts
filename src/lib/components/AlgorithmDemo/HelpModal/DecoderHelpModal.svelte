<script lang="ts">
	import Base64InputEncoding from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64InputEncoding.svelte';
	import Base64StandardAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64StandardAlphabet.svelte';
	import Base64UrlAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64UrlAlphabet.svelte';
	import KeyboardShortcuts from '$lib/components/AlgorithmDemo/HelpModal/Sections/KeyboardShortcuts.svelte';
	import NavButtons from '$lib/components/AlgorithmDemo/HelpModal/Sections/NavButtons.svelte';
	import WhatIsBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsBase64.svelte';
	import WhatIsntBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsntBase64.svelte';
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let index = 0;
	let modal: Modal;
	const helpSections = [
		['What Is Base64?', WhatIsBase64],
		["What Isn't Base64?", WhatIsntBase64],
		['Base64 Standard Alphabet', Base64StandardAlphabet],
		['Base64 Url/Filename-Safe Alphabet', Base64UrlAlphabet],
		['Input Encoding', Base64InputEncoding],
		['Navigational Buttons', NavButtons],
		['Keyboard Shortcuts', KeyboardShortcuts],
	];

	export const toggleModal = () => modal.toggleModal();
	const next = () => (index = (index + 1) % helpSections.length);
	const prev = () => {
		if (index > 0) {
			index = (index - 1) % helpSections.length;
		} else {
			index = helpSections.length - 1;
		}
	};
</script>

<Modal bind:this={modal} title={'Help Documentation'}>
	<div class="help-docs">
		<div class="help-left">
			<ul>
				{#each helpSections as [section, _], i}
					<li><span class="nav-link" on:click={() => (index = i)}>{section}</span></li>
				{/each}
			</ul>
		</div>
		<div class="help-right">
			{#if index === 0}
				<WhatIsBase64 />
			{:else if index === 1}
				<WhatIsntBase64 />
			{:else if index === 2}
				<Base64StandardAlphabet />
			{:else if index === 3}
				<Base64UrlAlphabet />
			{:else if index === 4}
				<Base64InputEncoding />
			{:else if index === 5}
				<NavButtons />
			{:else if index === 6}
				<KeyboardShortcuts />
			{/if}
			<div class="nav-buttons">
				<div class="nav nav-prev" on:click={() => prev()}><ChevronLeft /></div>
				<div class="nav nav-next" on:click={() => next()}><ChevronRight /></div>
			</div>
		</div>
	</div>
</Modal>

<style lang="postcss">
	.help-docs {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0 0 0 1rem;
		white-space: nowrap;
	}
	li {
		margin: 0 0 0.25rem 0;
	}
	.nav-link {
		pointer: cursor;
	}
	.help-left,
	.help-right {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.nav-buttons {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}
	.nav {
		cursor: pointer;
		width: 15px;
		flex: 0 1 auto;
	}
</style>
