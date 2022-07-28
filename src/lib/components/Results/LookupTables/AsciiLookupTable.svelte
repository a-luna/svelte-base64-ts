<script lang="ts">
	import { getChunkedAsciiMap } from '$lib/maps';
	import type { AsciiCharacterMap } from '$lib/types';

	export let asciiTableChunkSize: number;
	export let highlightHexByte: number;
	export let fontSize: string;
	let asciiMapChunked: AsciiCharacterMap[][];

	$: asciiMapChunked = getChunkedAsciiMap({ chunkSize: asciiTableChunkSize });
</script>

<div class="table-wrapper" style="font-size: {fontSize}">
	<h2>ASCII Map (Printable Characters)</h2>
	<div class="ascii-lookup-table">
		{#each asciiMapChunked as asciiMap}
			<div class="ascii-lookup-chunk">
				{#each asciiMap as ascii}
					<div
						class="ascii-lookup"
						class:highlight-hex-byte={ascii.dec === highlightHexByte}
						data-ascii={ascii.ascii}
						data-hex-byte={ascii.hex}
						data-eight-bit={ascii.bin}
						data-decimal={ascii.dec}
					>
						<code>{ascii.ascii}</code>
						<code>{ascii.hex}</code>
						<code>{ascii.binWord1} {ascii.binWord2}</code>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.table-wrapper h2 {
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.8px;
		text-align: center;
		margin: 0 0 0.5rem 0;
	}

	.ascii-lookup-table {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		border: 1px solid var(--default-border-color);
		border-radius: 0.375rem;
		margin: 0 auto;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.ascii-lookup-chunk {
		border-right: 1px solid var(--default-border-color);
		padding: 0 0.25rem;
		margin: 0.375rem 0;
	}

	.ascii-lookup-chunk:last-child {
		border: none;
	}

	.ascii-lookup {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
	}

	.ascii-lookup code {
		color: var(--pri-color);
	}

	.ascii-lookup code {
		margin: 0 0.25rem;
		white-space: nowrap;
		text-transform: none;
	}
</style>
