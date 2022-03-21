<script lang="ts">
	import SelectHelpTopic from '$lib/components/AlgorithmDemo/HelpModal/SelectHelpTopic.svelte';
	import { encodingHelpSections } from '$lib/components/AlgorithmDemo/HelpModal/_helpSections';
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { demoState } from '$lib/stores/demoState';

	let index = 0;
	let modal: Modal;
	let closed: boolean;
	let pageWidth: number;

	$: $demoState.modalOpen = !closed;
	$: showContentsPanel = pageWidth > 670;
	$: showContentsDropDown = pageWidth <= 670;
	$: sectionTitles = encodingHelpSections.map((section) => section.title);

	export function toggleModal() {
		index = 0;
		modal.toggleModal();
	}

	const getNextIndex = (i: number) => (i + 1) % encodingHelpSections.length;
	const getPrevIndex = (i: number) => (i > 0 ? (i - 1) % encodingHelpSections.length : encodingHelpSections.length - 1);

	function handleKeyPress(key: string) {
		if (key === 'ArrowRight') {
			next();
		}
		if (key === 'ArrowLeft') {
			prev();
		}
	}

	const next = () => (index = getNextIndex(index));
	const prev = () => (index = getPrevIndex(index));
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} bind:innerWidth={pageWidth} />

<Modal bind:this={modal} bind:closed title={'Base64 Encoding Help Docs'} noHeader={true}>
	<div class="help-docs">
		{#if showContentsPanel}
			<div class="help-docs-nav">
				<h3><span>Help Topics</span></h3>
				<ul>
					{#each encodingHelpSections as { title }, i}
						<li>
							<span class="nav-link" class:current-section={index === i} on:click={() => (index = i)}>{title}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		<div class="help-docs-wrapper">
			<div class="help-docs-section-title"><h2><span>{encodingHelpSections[index].title}</span></h2></div>
			<div class="help-docs-content">
				<svelte:component this={encodingHelpSections[index].component} />
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
				{#if showContentsDropDown}
					<SelectHelpTopic {sectionTitles} bind:value={index} />
				{/if}
				{#if index < encodingHelpSections.length - 1}
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

<style lang="postcss">
	.placeholder {
		width: 46px;
	}
</style>
