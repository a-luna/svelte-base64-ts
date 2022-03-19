<script lang="ts">
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import { demoState } from '$lib/stores/demoState';
	import Carousel from '@beyonk/svelte-carousel';
	import { encodingHelpSections } from './_helpSections';

	let currentSlideIndex: number;
	let currentSectionId: string;
	let closed: boolean;
	let pageWidth: number;
	let encodingHelpMap: Record<string, number> = {};
	let carousel: Carousel;

	$: $demoState.modalOpen = !closed;
	$: if (encodingHelpSections) encodingHelpSections.forEach((section, i) => (encodingHelpMap[section.id] = i));
	$: if (carousel) changeHelpSection(0);
	$: fontSize = pageWidth > 670 ? '0.8rem' : '0.75rem';

	export function initialize() {
		changeHelpSection(0);
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

	function next() {
		changeHelpSection(getNextIndex(currentSlideIndex));
	}

	function prev() {
		changeHelpSection(getPrevIndex(currentSlideIndex));
	}

	function handleHelpSectionChanged(detail: { currentSlide: number; slideCount: number }) {
		changeHelpSection(detail.currentSlide);
	}

	function changeHelpSection(index: number) {
		currentSlideIndex = index;
		currentSectionId = encodingHelpSections[index].id;
		carousel.go(index);
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} bind:outerWidth={pageWidth} />

<div id="help-docs" class="help-docs-wrapper" style="font-size: {fontSize}">
	<Carousel
		bind:this={carousel}
		perPage={1}
		on:change={({ detail: { currentSlide, slideCount } }) => handleHelpSectionChanged({ currentSlide, slideCount })}
	>
		<span class="control" slot="left-control">
			<ChevronLeft />
		</span>
		{#each encodingHelpSections as { id, title, component }}
			<div id="help-topic-{id}" class="slide-content">
				<svelte:component this={component} {...{ title }} />
			</div>
		{/each}
		<span class="control" slot="right-control">
			<ChevronRight />
		</span>
	</Carousel>
</div>

<style lang="postcss">
	#help-docs :global(.left),
	#help-docs :global(.right) {
		color: hsla(0, 0%, 13%, 0.9);
		background-color: hsla(0, 0%, 34%, 0.5);
		width: 20px;
		height: 100%;
		margin-top: -120px;
		padding: 0 5px;
	}
	#help-docs :global(.left:hover),
	#help-docs :global(.right:hover) {
		background-color: hsla(0, 0%, 34%, 0.8);
	}
	#help-docs :global(.left) {
		left: 0;
		border-top-left-radius: 6px;
		border-top-right-radius: 0;
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 0;
	}
	#help-docs :global(.right) {
		right: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 6px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 6px;
	}
	#help-docs :global(ul li) {
		background-color: var(--button-disabled-bg-color);
		width: 6px;
		height: 6px;
	}
	#help-docs :global(ul li.active) {
		background-color: var(--nav-button-active-bg-color);
	}
	#help-docs :global(.carousel ul) {
		margin-top: 5px;
	}
</style>
