<script lang="ts">
	import { encodingHelpSections } from '$lib/components/AlgorithmDemo/HelpModal/_helpSections';
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { demoStateOld } from '$lib/stores/demoState';
	import { slide } from 'svelte/transition';
	import CloseModalButton from '../Buttons/CloseModalButton.svelte';
	import ShowHelpTopicsButton from '../Buttons/ShowHelpTopicsButton.svelte';

	let index = 0;
	let modal: Modal;
	let closed: boolean;
	let pageWidth: number;
	let helpTopicsExpanded = false;

	$: $demoStateOld.modalOpen = !closed;
	$: title = pageWidth < 730 ? 'Base64 Encoding Help Docs' : '';
	$: showContentsPanel = pageWidth >= 730;
	$: displayedSectionTitle = helpTopicsExpanded ? 'Help Topics' : encodingHelpSections[index].title;

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

	function handleSectionChangedMobile(newSection: number) {
		index = newSection;
		helpTopicsExpanded = false;
	}

	const next = () => (index = getNextIndex(index));
	const prev = () => (index = getPrevIndex(index));
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} bind:innerWidth={pageWidth} />

<Modal bind:this={modal} bind:closed {title} noHeader={true} noFooter={true}>
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
			<div class="help-docs-section-title">
				<h2>
					{#if !showContentsPanel}
						<ShowHelpTopicsButton bind:shown={helpTopicsExpanded} />
					{/if}
					<span>{displayedSectionTitle}</span>
					<CloseModalButton on:click={() => toggleModal()} />
				</h2>
			</div>
			{#if !showContentsPanel && helpTopicsExpanded}
				<div transition:slide class="help-docs-nav mobile-help-docs-nav">
					<ul>
						{#each encodingHelpSections as { title }, i}
							<li>
								<span
									class="nav-link"
									class:current-section={index === i}
									on:click={() => handleSectionChangedMobile(i)}>{title}</span
								>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
			<div class="help-docs-content-wrapper">
				<div class="nav-prev-column" on:click={() => prev()} />
				<div class="help-docs-content">
					<svelte:component this={encodingHelpSections[index].component} />
				</div>
				<div class="nav-next-column" on:click={() => next()} />
			</div>
			<div class="nav-buttons">
				{#if index > 0}
					<div class="nav nav-prev" on:click={() => prev()}>
						<div class="nav-icon"><ChevronLeft /></div>
						<span class="nav-link">Prev</span>
					</div>
				{/if}
				<div class="placeholder" />
				{#if index < encodingHelpSections.length - 1}
					<div class="nav nav-next" on:click={() => next()}>
						<span class="nav-link">Next</span>
						<div class="nav-icon"><ChevronRight /></div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</Modal>

<style lang="postcss">
	.placeholder {
		flex: 1;
	}
	.mobile-help-docs-nav {
		background-color: var(--modal-dialog-bg-color);
		border-bottom: 1px solid var(--help-docs-border-color);
	}
</style>
