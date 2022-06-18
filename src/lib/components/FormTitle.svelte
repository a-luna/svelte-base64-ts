<script lang="ts">
	export let title: string;
	export let fontSize = '1.8rem';
	export let letterSpacing = '1.5px';
</script>

<span class="form-title" style="font-size: {fontSize}; letter-spacing: {letterSpacing};">
	{title}
</span>

<style lang="postcss">
	.form-title {
		color: var(--form-title-text-color);
		font-weight: 400;
		text-align: center;
		margin: 0;
		line-height: 1;
		text-shadow: 2px 2px var(--form-title-text-shadow-color), 1.75px 1.75px var(--form-title-text-shadow-color),
			1.5px 1.5px var(--form-title-text-shadow-color), 1.25px 1.25px var(--form-title-text-shadow-color),
			1px 1px var(--form-title-text-shadow-color), 0.75px 0.75px var(--form-title-text-shadow-color),
			0.5px 0.5px var(--form-title-text-shadow-color), 0.25px 0.25px var(--form-title-text-shadow-color);

		grid-column: 1 / span 2;
		grid-row: 1 / span 1;
	}
	@media screen and (min-width: 525px) {
		.form-title {
			grid-column: 1 / span 1;
			grid-row: 1 / span 1;
		}
	}
</style>
