<script lang="ts">
	import Help from '$lib/components/Icons/Help.svelte';
</script>

<div id="help" on:click title="Click to view instructions/keyboard shortcuts">
	<Help />
</div>

<style lang="postcss">
	#help {
		cursor: pointer;
		width: 10px;
	}
</style>
