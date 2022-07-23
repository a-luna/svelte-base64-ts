<script lang="ts">
	import ReturnRight from '$lib/components/Icons/ReturnRight.svelte';
</script>

<kbd title="Return Key"><ReturnRight /><span>Return</span></kbd>

<style lang="postcss">
	kbd {
		display: inline-flex;
		flex-flow: row nowrap;
		gap: 2px;
		height: 11px;
		width: 55px;
		line-height: 11px;
		margin: auto;
		padding: 0 2px;
	}
	@media screen and (min-width: 762px) {
		kbd {
			height: 13px;
			line-height: 13px;
		}
	}
</style>
