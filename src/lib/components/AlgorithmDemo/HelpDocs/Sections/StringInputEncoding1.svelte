<script lang="ts">
	import { stringInputEncoding1 } from '$lib/components/AlgorithmDemo/HelpDocs/Sections/_helpText';
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/InputForm/SelectStringEncoding.svelte';
</script>

<div class="settings-help help-module">
	<div class="encoding-wrapper">
		<div class="string-encoding">
			<span class="form-label">Text Encoding</span>
			<SelectStringEncoding />
			<div
				class="dropdown"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="select-string-encoding-open-list-button"
				tabindex="-1"
				style="width: 86px"
			>
				<div
					class="menu-item active"
					data-value="ASCII"
					role="menuitem"
					tabindex="-1"
					id="select-string-encoding-option-1"
					data-testid="select-string-encoding-option-1"
					style="font-size: 0.875rem;"
				>
					ASCII
				</div>
				<!--<Option>-->
				<div
					class="menu-item"
					data-value="UTF-8"
					role="menuitem"
					tabindex="-1"
					id="select-string-encoding-option-2"
					data-testid="select-string-encoding-option-2"
					style="font-size: 0.875rem;"
				>
					UTF-8
				</div>
				<!--<Option>-->
				<div
					class="menu-item"
					data-value="hex"
					role="menuitem"
					tabindex="-1"
					id="select-string-encoding-option-3"
					data-testid="select-string-encoding-option-3"
					style="font-size: 0.875rem;"
				>
					hex
				</div>
				<!--<Option>-->
				<div
					class="menu-item"
					data-value="bin"
					role="menuitem"
					tabindex="-1"
					id="select-string-encoding-option-4"
					data-testid="select-string-encoding-option-4"
					style="font-size: 0.875rem;"
				>
					bin
				</div>
				<!--<Option>-->
			</div>
		</div>
		<div class="encoding-description">
			{#each stringInputEncoding1 as paragraph}
				<p>{@html paragraph}</p>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.encoding-wrapper {
		min-height: 210px;
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	.string-encoding {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		gap: 0.5rem;
		padding: 0 0.5rem;
		pointer-events: none;
	}
	.dropdown {
		background-color: var(--dropdown-bg-color, var(--white2));
		color: var(--dropdown-text-color, var(--black2));
		border: 1px solid var(--dropdown-border-color, var(--light-gray2));
		transform-origin: top right;
		width: 100%;
		border-radius: 0.375rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
	}
	.menu-item {
		display: block;
		color: var(--select-text-color);
		line-height: 1.25rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
	.menu-item:first-child {
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
	}
	.menu-item.active {
		background-color: var(--selected-item-bg-color);
	}
	.encoding-description {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		gap: 0.5rem;
		flex: 1;
		margin: 20px 0 0 0;
	}
</style>
