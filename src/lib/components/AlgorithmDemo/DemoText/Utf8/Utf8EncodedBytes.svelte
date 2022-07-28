<script lang="ts">
	import EncodedBytesForChar from '$lib/components/AlgorithmDemo/DemoText/Utf8/EncodedBytesForChar.svelte';
	import ToggleExpandAllCharacters from '$lib/components/AlgorithmDemo/DemoText/Utf8/ToggleExpandAllCharacters.svelte';
	import { decomposeUtf8String } from '$lib/utf8';
	import { fade } from 'svelte/transition';

	export let input: string = '';
	let charByteMapComponents: Record<number, EncodedBytesForChar> = {};
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

	function handleCharacterToggled() {
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
		handleCharacterToggled();
	}
</script>

<div class="utf8-byte-map-wrapper">
	{#if anyCharsAreCombined}
		<ToggleExpandAllCharacters bind:toggled={allCharsAreExpanded} on:click={() => toggleAllChars()} />
	{/if}
	<div class="utf8-byte-map">
		{#each utf8ByteMap.charMap as { char, isASCII, encoded, hexBytes, isCombined, charMap }, i}
			<EncodedBytesForChar
				bind:this={charByteMapComponents[i]}
				bind:anyCharsAreExpanded
				{anyCharsAreCombined}
				{char}
				{isASCII}
				{encoded}
				{hexBytes}
				{isCombined}
				{charMap}
				on:toggled={() => handleCharacterToggled()}
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
</div>

<style lang="postcss">
	.utf8-byte-map-wrapper {
		line-height: 1;
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		margin: 1rem 0 0.25rem 0;
		padding: 0.75rem 0.5rem;
		width: 95%;
		overflow-y: hidden;
		overflow-x: auto;
		scrollbar-gutter: stable;
		background-color: var(--black3);
		border-radius: 6px;
	}
	.utf8-byte-map {
		display: flex;
		flex-flow: column nowrap;
		gap: 2px;
	}
	.legend {
		font-size: 0.7rem;
		padding: 0.25rem;
		margin: 0 0.5rem;
		background-color: var(--black1);
		border: 0.5px solid var(--nav-button-autoplay-disabled-border-color);
		border-radius: 4px;
		color: var(--sec-color);
	}
	.legend ul {
		list-style: none;
		margin: 0.25rem;
		padding: 0;
	}
	.legend li {
		margin: 0 0 0.5rem 0;
		line-height: 1.2;
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
