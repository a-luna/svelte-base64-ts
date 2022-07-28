<script lang="ts">
	import Close from '$lib/components/Icons/Close.svelte';
	import { getRandomHexString } from '$lib/util';

	export let modalId = `modal-${getRandomHexString(4)}`;
	export let title: string = '';
	export let closed = true;
	export let noHeader = false;
	export let noFooter = false;
	export const toggleModal = () => (closed = !closed);

	$: modelLabel = `${modalId}-label`;

	function handleKeyPress(key: string) {
		if (key === 'Escape') {
			closed = true;
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} />

<div
	class="modal fade"
	class:hidden={closed}
	class:shown={!closed}
	id={modalId}
	tabindex="-1"
	aria-labelledby={modelLabel}
	aria-hidden="true"
	on:click|self={() => toggleModal()}
>
	<div class="modal-dialog">
		<div class="modal-content">
			{#if !noHeader}
				<div class="modal-header">
					{#if title}
						<h5 id={modelLabel}>{title}</h5>
					{/if}
					<button type="button" class="btn-close" aria-label="Close" on:click={() => toggleModal()}><Close /></button>
				</div>
			{/if}
			<div class="modal-body">
				<slot />
			</div>
			{#if !noFooter}
				<div class="modal-footer">
					<button type="button" class="modal-button" on:click={() => toggleModal()}>Close</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.modal {
		overflow-y: auto;
		overflow-x: hidden;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		outline: 0;
	}

	.fade {
		transition: background-color 0.15s linear;
	}

	.hidden {
		display: none;
	}

	.shown {
		display: block;
		background-color: var(--modal-outer-bg-color);
	}

	.modal-dialog {
		position: relative;
		min-width: 314px;
		max-width: 450px;
		width: calc(100% - 4rem);
		margin: 2rem auto 0 auto;
		background-clip: padding-box;
		background-color: var(--modal-dialog-bg-color);
		border-radius: 6px;
		border-style: none;
		outline: 0;
		pointer-events: auto;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	.modal-content {
		display: flex;
		flex-direction: column;
		position: relative;
		color: currentColor;
		width: 100%;
		gap: 1rem;
		border-radius: 6px;
	}

	.modal-header {
		display: flex;
		padding: 0;
		flex-shrink: 0;
		justify-content: flex-ed;
		align-items: flex-end;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}

	.modal-header h5 {
		color: var(--nav-button-active-bg-color);
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.4px;
		line-height: 1;
		margin: 0;
		flex: 1;
	}

	.btn-close {
		cursor: pointer;
		box-sizing: content-box;
		color: var(--nav-button-active-bg-color);
		background-color: inherit;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0;
		border-style: none;
		opacity: 0.75;
		padding: 0;
		margin: 0 0 0 auto;
	}

	.btn-close:hover {
		opacity: 1;
	}

	.btn-close:focus,
	.btn-close:active,
	.btn-close:active:focus {
		opacity: 1;
		outline: 0;
		box-shadow: none;
	}

	.modal-body {
		position: relative;
	}

	.modal-footer {
		display: flex;
		flex-wrap: wrap;
		flex-shrink: 0;
		justify-content: flex-end;
		align-items: center;
		border-bottom-right-radius: 0.375rem;
		border-bottom-left-radius: 0.375rem;
		border-top-width: 1px;
		border-color: #e5e7eb;
		padding: 0;
	}
	@media screen and (min-width: 762px) {
		.modal-dialog {
			max-width: 650px;
			margin: 2rem auto 0 auto;
		}
		.modal-content {
			border-radius: 0;
		}
	}
</style>
