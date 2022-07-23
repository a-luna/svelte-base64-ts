<script lang="ts">
	import { decomposeUtf8String } from '$lib/utf8';
	import { fade } from 'svelte/transition';
	import ToggleAllCharactersButton from './ToggleAllCharactersButton.svelte';
	import Utf8BytesForChar from './Utf8BytesForChar.svelte';

	export let input: string = '';
	let charByteMapComponents: Record<number, Utf8BytesForChar> = {};
	let anyCharsAreExpanded = false;
	let allCharsAreExpanded = false;
	let hasVarSelector = false;
	let hasZeroWidthJoiner = false;
	let hasWhiteSpace = false;

	$: utf8ByteMap = decomposeUtf8String(input);
	$: anyCharsAreCombined = utf8ByteMap.hasCombinedChars;
	$: inputEncoded = utf8ByteMap.encoded;
	$: inputHasWhiteSpace = inputEncoded.includes('%20');
	$: showLegend =
		(anyCharsAreExpanded && (hasVarSelector || hasZeroWidthJoiner || hasWhiteSpace)) || inputHasWhiteSpace;

	const zwjUrl = 'https://en.wikipedia.org/wiki/Zero-width_joiner';
	const varUrl = 'https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)';

	const zwj1 = " (pronounced 'zwidge') Stands for ";
	const zwj2 = 'Zero-Width Joiner';
	const zwj3 = ' which itself is a non-printing character that joins a set of characters into a single emoji.';

	const vs1 = ' Stands for ';
	const vs2 = 'Variation Selector-16';
	const vs3 = ' which is a non-printing character that requests that a character should be displayed as an emoji.';

	function handleShowCombinedEmojiToggled() {
		const expandableCharMaps = Object.values(charByteMapComponents).filter((charMap) => charMap.isCombined);
		const expandedCharMaps = expandableCharMaps.filter((charMap) => charMap.expanded);
		anyCharsAreExpanded = expandableCharMaps.some((charMap) => charMap.expanded);
		hasVarSelector = expandedCharMaps.some((charMap) => charMap.encoded.includes('%EF%B8%8F'));
		hasZeroWidthJoiner = expandedCharMaps.some((charMap) => charMap.encoded.includes('%E2%80%8D'));
		hasWhiteSpace = expandedCharMaps.some((charMap) => charMap.encoded.includes('%20'));
		if (expandableCharMaps.every((charMap) => charMap.expanded)) {
			allCharsAreExpanded = true;
		}
		if (expandableCharMaps.every((charMap) => !charMap.expanded)) {
			allCharsAreExpanded = false;
		}
	}

	function toggleAllChars() {
		const expandableCharMaps = Object.values(charByteMapComponents).filter((charMap) => charMap.isCombined);
		expandableCharMaps.forEach((charMap) => (charMap.expanded = allCharsAreExpanded));
		handleShowCombinedEmojiToggled();
	}
</script>

{#if anyCharsAreCombined}
	<ToggleAllCharactersButton bind:toggled={allCharsAreExpanded} on:click={() => toggleAllChars()} />
{/if}
<div class="utf8-byte-map">
	{#each utf8ByteMap.charMap as { char, isASCII, encoded, hexBytes, isCombined, charMap }, i}
		<Utf8BytesForChar
			bind:this={charByteMapComponents[i]}
			bind:anyCharsAreExpanded
			{anyCharsAreCombined}
			{char}
			{isASCII}
			{encoded}
			{hexBytes}
			{isCombined}
			{charMap}
			on:toggled={() => handleShowCombinedEmojiToggled()}
		/>
	{/each}
</div>
{#if showLegend}
	<div transition:fade class="legend">
		<ul>
			{#if hasZeroWidthJoiner}
				<li class="zwj">
					<strong>ZWJ:</strong>{zwj1}<strong><a href={zwjUrl} target="_blank">{zwj2}</a></strong>{zwj3}
				</li>
			{/if}
			{#if hasVarSelector}
				<li class="variation">
					<strong>VS16:</strong>{vs1}<strong><a href={varUrl} target="_blank">{vs2}</a></strong>{vs3}
				</li>
			{/if}
			{#if hasWhiteSpace || inputHasWhiteSpace}
				<li class="whitespace"><strong>SP:</strong> 0x20 is the hex value of the space character</li>
			{/if}
		</ul>
	</div>
{/if}

<style lang="postcss">
	.utf8-byte-map {
		line-height: 1;
		display: flex;
		flex-flow: column nowrap;
		margin: 0.5rem 0;
		gap: 2px;
	}
	.legend {
		font-size: 0.7rem;
		padding: 0.5rem;
		margin: 0 0.5rem;
		background-color: var(--black4);
		color: var(--sec-color);
	}
	.legend ul {
		list-style: none;
		margin: 0.25rem;
		padding: 0;
	}
	.legend li {
		margin: 0 0 0.5rem 0;
	}
	.legend li:last-child {
		margin: 0;
	}
	:global(#demo-text .legend code) {
		background-color: var(--black4);
		color: var(--sec-color);
		padding: 0;
		white-space: normal;
	}
	:global(#demo-text) .legend strong {
		color: var(--sec-color);
	}
	:global(#demo-text .legend .whitespace code),
	:global(#demo-text .legend .zwj code),
	:global(#demo-text .legend .variation code) {
		background-color: inherit;
		padding: 0;
	}
</style>
