<script lang="ts">
	import { getChunkedBase64Map } from '$lib/maps';
	import type { Base64CharacterMap, Base64Encoding } from '$lib/types';

	export let base64Encoding: Base64Encoding = 'base64';
	export let base64TableChunkSize: number;
	export let highlightBase64: string;
	export let fontSize: string;
	let base64MapChunked: Base64CharacterMap[][];

	$: base64MapChunked = getChunkedBase64Map({ base64Encoding, chunkSize: base64TableChunkSize });
	$: b64AlphabetDetail = base64Encoding == 'base64' ? 'Standard' : 'URL and Filename safe';
</script>

<div class="table-wrapper" style="font-size: {fontSize}">
	<h2>Base64 Alphabet ({b64AlphabetDetail})</h2>
	<div class="base64-lookup-table">
		{#each base64MapChunked as base64Map}
			<div class="base64-lookup-chunk">
				{#each base64Map as base64}
					<div
						class="base64-lookup"
						class:highlight-base64={base64.b64 === highlightBase64}
						data-base={base64.b64}
						data-six-bit={base64.bin}
						data-decimal={base64.dec}
					>
						<code>{base64.b64}</code>
						<code class="dec-value">{base64.dec}</code>
						<code>{base64.bin}</code>
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

	.base64-lookup-table {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		border: 1px solid var(--default-border-color);
		border-radius: 0.375rem;
		margin: 0 auto;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.base64-lookup-chunk {
		border-right: 1px solid var(--default-border-color);
		padding: 0 0.3125rem;
		margin: 0.375rem 0;
	}

	.base64-lookup-chunk:last-child {
		border: none;
	}

	.base64-lookup {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
	}

	.base64-lookup code {
		color: var(--sec-color);
	}

	.base64-lookup code {
		margin: 0 0.3125rem;
		white-space: nowrap;
		text-transform: none;
	}
	.dec-value {
		width: 13px;
		text-align: right;
	}
</style>
