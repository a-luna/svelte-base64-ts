<script lang="ts">
	import Close from '$lib/components/Icons/Close.svelte';
	import { getRandomHexString } from '$lib/util';

	export let modalId = `modal-${getRandomHexString(4)}`;
	export let title: string;
	export let closed = true;
	export const toggleModal = () => (closed = !closed);
</script>

<div
	class="modal fade"
	class:hidden={closed}
	class:shown={!closed}
	id={modalId}
	tabindex="-1"
	aria-labelledby="{modalId}-label"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 id="{modalId}-label">{title}</h5>
				<button type="button" class="btn-close" aria-label="Close" on:click={() => toggleModal()}><Close /></button>
			</div>
			<div class="modal-body">
				<slot />
			</div>
			<div class="modal-footer">
				<button type="button" class="modal-button" on:click={() => toggleModal()}>Close</button>
			</div>
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
		background-color: hsla(0, 0%, 0%, 0.45);
	}

	.modal-dialog {
		position: relative;
		width: auto;
		pointer-events: none;
		max-width: 70%;
		margin: 2rem auto;
	}

	.modal-content {
		display: flex;
		flex-direction: column;
		position: relative;
		background-clip: padding-box;
		background-color: var(--modal-dialog-bg-color);
		color: currentColor;
		width: 100%;
		border-radius: 0.375rem;
		border-style: none;
		outline: 0;
		pointer-events: auto;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	.modal-header {
		display: flex;
		padding: 1rem;
		flex-shrink: 0;
		justify-content: space-between;
		align-items: center;
		border-top-left-radius: 0.375rem;
		border-top-right-radius: 0.375rem;
		border-bottom-width: 1px;
		border-color: #e5e7eb;
	}

	.modal-header h5 {
		color: var(--modal-header-text-color);
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 500;
		line-height: 1.5;
		margin: 0;
	}

	.btn-close {
		box-sizing: content-box;
		color: var(--nav-button-active-bg-color);
		background-color: inherit;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0;
		border-style: none;
		opacity: 0.5;
		padding: 0.5rem;
		margin: -0.5rem -0.5rem -0.5rem auto;
	}

	.btn-close:hover {
		text-decoration: none;
		opacity: 0.75;
	}

	.btn-close:focus,
	.btn-close:active,
	.btn-close:active:focus {
		outline: 0;
		box-shadow: none;
		opacity: 1;
	}

	.modal-body {
		position: relative;
		padding: 1rem;
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
		padding: 1rem;
	}

	.modal-button {
		padding: 0.625rem 1.5rem;
		transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
		transition-duration: 150ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		color: var(--black2);
		background-color: var(--nav-button-bg-color);
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1.25;
		text-transform: uppercase;
		border-radius: 0.25rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		border: none;
		margin: 0;
	}

	.modal-button:hover {
		background-color: var(--nav-button-hover-bg-color);
	}

	.modal-button:focus,
	.modal-button:active,
	.modal-button:active:focus {
		background-color: var(--nav-button-active-bg-color);
	}
</style>
