<script lang="ts">
</script>

<div class="keyboard-help help-module">
	<div class="keyboard-shortcuts">
		<div class="help-row"><kbd>Space</kbd><span>Start/Stop auto-play</span></div>
		<div class="help-row"><kbd>Right Arrow</kbd><span>Go to previous step</span></div>
		<div class="help-row"><kbd>Left Arrow</kbd><span>Go to next step</span></div>
	</div>
</div>

<style lang="postcss">
	.keyboard-help,
	.keyboard-shortcuts {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.keyboard-help {
		margin: 0 auto;
		padding: 0.5rem 0;
	}
	.help-row {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	kbd {
		background-color: var(--light-gray2);
		border-radius: 3px;
		border: 1px solid var(--white1);
		color: var(--black1);
		display: inline-block;
		font-size: 0.85em;
		font-weight: 700;
		line-height: 1;
		padding: 2px 4px;
		white-space: nowrap;
		width: 90px;
		text-align: center;
	}
</style>
