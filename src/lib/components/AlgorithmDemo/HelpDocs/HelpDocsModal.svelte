<script lang="ts">
	import CloseModalButton from '$lib/components/AlgorithmDemo/HelpDocs/CloseModalButton.svelte';
	import ShowHelpTopicsButton from '$lib/components/AlgorithmDemo/HelpDocs/ShowHelpTopicsButton.svelte';
	import { encodingHelpSections } from '$lib/components/AlgorithmDemo/HelpDocs/_helpSections';
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { getAppContext } from '$lib/stores/context';
	import { slide } from 'svelte/transition';

	export let index = 0;
	export let helpTopicsExpanded = false;
	let modal: Modal;
	let closed: boolean;
	const { demoState, demoUIState } = getAppContext();

	$: $demoUIState.modalOpen = !closed;
	$: showContentsPanel = $demoState.pageWidth >= 764;
	$: displayedSectionTitle = helpTopicsExpanded ? 'Help Topics' : encodingHelpSections[index].title;

	const getNextIndex = (i: number) => (i + 1) % encodingHelpSections.length;
	const getPrevIndex = (i: number) =>
		i > 0 ? (i - 1) % encodingHelpSections.length : encodingHelpSections.length - 1;
	const next = () => (index = getNextIndex(index));
	const prev = () => (index = getPrevIndex(index));

	export function toggleModal(startIndex = 0, expanded = false) {
		index = startIndex;
		helpTopicsExpanded = expanded;
		modal.toggleModal();
	}

	function handleKeyPress(key: string) {
		if (key === 'ArrowRight') {
			next();
		}
		if (key === 'ArrowLeft') {
			prev();
		}
	}

	function handleSectionChanged(newSection: number) {
		index = newSection;
		helpTopicsExpanded = false;
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} />

<Modal bind:this={modal} bind:closed noHeader={true} noFooter={true}>
	<div class="help-docs">
		{#if showContentsPanel}
			<div class="help-docs-nav">
				<h3><span>Help Topics</span></h3>
				<ul>
					{#each encodingHelpSections as { title }, i}
						<li>
							<button
								class="nav-link"
								class:current-section={index === i}
								on:click={() => handleSectionChanged(i)}><span>{title}</span></button
							>
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
								<button
									class="nav-link"
									class:current-section={index === i}
									on:click={() => handleSectionChanged(i)}><span>{title}</span></button
								>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
			<div class="help-docs-content-wrapper">
				<div class="help-docs-content">
					<svelte:component this={encodingHelpSections[index].component} />
				</div>
			</div>
			<div class="nav-buttons">
				{#if index > 0}
					<button class="nav nav-prev" on:click={() => prev()}>
						<div class="nav-icon"><ChevronLeft /></div>
						<span class="nav-link">Prev</span>
					</button>
				{/if}
				<div class="placeholder" />
				{#if index < encodingHelpSections.length - 1}
					<button class="nav nav-next" on:click={() => next()}>
						<span class="nav-link">Next</span>
						<div class="nav-icon"><ChevronRight /></div>
					</button>
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
