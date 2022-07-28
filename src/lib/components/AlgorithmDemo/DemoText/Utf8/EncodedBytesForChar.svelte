<svelte:options accessors />

<script lang="ts">
	import ToggleExpandCharacters from '$lib/components/AlgorithmDemo/DemoText/Utf8/ToggleExpandCharacters.svelte';
	import type { Utf8StandardCharacterMap } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let anyCharsAreCombined: boolean;
	export let anyCharsAreExpanded: boolean;
	export let char: string;
	export let isASCII: boolean;
	export let encoded: string;
	export let hexBytes: string[];
	export let isCombined: boolean;
	export let charMap: Utf8StandardCharacterMap[];
	export let expanded = false;
	const dispatch = createEventDispatcher<{ toggled: never }>();

	const isVS16 = (encoded: string): boolean => encoded === '%EF%B8%8F';
	const isZWJ = (encoded: string): boolean => encoded === '%E2%80%8D';
	const isWhiteSpace = (encoded: string): boolean => encoded === '%20';

	const getCharType = (encoded: string): string =>
		isVS16(encoded)
			? 'variation'
			: isZWJ(encoded)
			? 'zwj'
			: isWhiteSpace(encoded)
			? 'whitespace'
			: isASCII
			? 'ascii'
			: 'char';

	const getCharToDisplay = (char: string, encoded: string): string =>
		isVS16(encoded) ? 'VS16' : isZWJ(encoded) ? 'ZWJ' : isWhiteSpace(encoded) ? 'SP' : char;

	export function expand() {
		if (isCombined && expanded) {
			expanded = false;
		}
	}
</script>

{#if isCombined}
	<div class="utf8-bytes-for-char {getCharType(encoded)}">
		<ToggleExpandCharacters bind:toggled={expanded} on:click={() => dispatch('toggled')} />
		<div class="utf8-char">{getCharToDisplay(char, encoded)}</div>
		{#if expanded}
			<div class="combined-utf8-char-map">
				{#each charMap as { char: singleChar, encoded: singleCharEncoded, hexBytes: singleCharHexBytes }}
					<div class="utf8-bytes-for-char {getCharType(singleCharEncoded)}">
						<div class="utf8-char">{getCharToDisplay(singleChar, singleCharEncoded)}</div>
						<div class="hex-bytes">
							{#each singleCharHexBytes as hex}
								<code>{hex}</code>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			{#if anyCharsAreCombined && anyCharsAreExpanded}
				<div class="placeholder" />
			{/if}
			<div class="hex-bytes">
				{#each hexBytes as hex}
					<code>{hex}</code>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="utf8-bytes-for-char {getCharType(encoded)}">
		<div class="button-placeholder" />
		<div class="utf8-char">{getCharToDisplay(char, encoded)}</div>
		{#if anyCharsAreCombined && anyCharsAreExpanded}
			<div class="placeholder" />
		{/if}
		<div class="hex-bytes">
			{#each hexBytes as hex}
				<code>{hex}</code>
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	.combined-utf8-char-map {
		line-height: 1;
		display: flex;
		flex-flow: column nowrap;
	}
	.utf8-bytes-for-char {
		display: flex;
		flex-flow: row nowrap;
		background-color: inherit;
		padding: 0;
	}
	.combined-utf8-char-map .utf8-bytes-for-char {
		padding: 1px 0;
		align-items: center;
	}
	:global(#demo-text) .utf8-bytes-for-char code {
		color: var(--pri-color);
		font-size: 0.75rem;
		border-radius: 0px;
		align-self: center;
		height: 16px;
	}
	.button-placeholder {
		width: 14.4px;
	}
	.utf8-char,
	.placeholder {
		flex: 0 0 25px;
		text-align: center;
		background-color: inherit;
	}
	.utf8-bytes-for-char > .utf8-char {
		color: var(--pri-color);
		margin: 3.5px 0 0 0;
	}
	.zwj .utf8-char,
	.variation .utf8-char,
	.whitespace .utf8-char {
		font-size: 0.6rem;
	}
	.whitespace .utf8-char {
		align-self: center;
		margin: auto 0;
	}

	.combined-utf8-char-map .utf8-char {
		margin: auto 0;
	}
	.hex-bytes {
		display: flex;
		gap: 2px;
	}
	.hex-bytes code {
		flex: 0;
	}
	:global(#demo-text) .whitespace .utf8-char,
	:global(#demo-text) .whitespace .hex-bytes code,
	:global(#demo-text) .zwj .utf8-char,
	:global(#demo-text) .zwj .hex-bytes code,
	:global(#demo-text) .variation .utf8-char,
	:global(#demo-text) .variation .hex-bytes code {
		color: var(--sec-color);
	}
</style>
