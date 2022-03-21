<script lang="ts">
</script>

<div class="keyboard-help help-module">
	<div class="keyboard-shortcuts">
		<kbd title="Space Bar">Space</kbd><span>Start/Stop auto-play</span>
		<kbd class="arrow" title="Right Arrow Key">→</kbd><span>Go to previous step</span>
		<kbd class="arrow" title="Left Arrow Key">←</kbd><span>Go to next step</span>
	</div>
</div>

<style lang="postcss">
	.keyboard-help {
		margin: 0 auto;
	}
	.keyboard-shortcuts {
		display: grid;
		grid-template-columns: 43px auto;
		gap: 0.5rem;
		margin: 0 auto;
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
		text-align: center;
	}
	.arrow {
		font-size: 1.1rem;
		padding: 0 4px;
	}
</style>
