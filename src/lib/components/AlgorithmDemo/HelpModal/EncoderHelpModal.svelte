<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { demoState } from '$lib/stores/demoState';
	import EncoderHelpCarousel from './EncoderHelpCarousel.svelte';

	let modal: Modal;
	let carousel: EncoderHelpCarousel;
	let closed = true;
	let currentSlideIndex = 0;

	$: $demoState.modalOpen = !closed;

	export function toggleModal() {
		carousel.initialize();
		modal.toggleModal();
	}
</script>

<Modal bind:this={modal} bind:closed title={'Base64 Encoding Help Docs'} noButtons={true} noHeader={true}>
	<EncoderHelpCarousel bind:this={carousel} />
	<!-- <div class="help-docs" style="font-size: {fontSize}">
		{#if showContentsPanel}
			<div class="help-docs-nav">
				<h3><span>Contents</span></h3>
				<ul>
					{#each encodingHelpSections as { id, title }}
						<li>
							<span
								class="nav-link"
								class:current-section={id === currentSectionId}
								on:click={() => changeHelpSection(id)}>{title}</span
							>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if showContentsDropDown}
			<SelectHelpTopic {sectionNames} bind:value={currentSlideIndex} />
		{/if}
		
	</div> -->
</Modal>
