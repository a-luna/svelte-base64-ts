<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	let modal: Modal;

	export const toggleModel = () => modal.toggleModal();
</script>

<Modal bind:this={modal} title={'How Does this Work?'}>This is a test</Modal>

<style lang="postcss">
</style>
