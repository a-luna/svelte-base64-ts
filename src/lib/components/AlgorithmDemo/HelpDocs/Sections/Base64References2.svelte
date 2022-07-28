<script lang="ts">
	import { references } from '$lib/components/AlgorithmDemo/HelpDocs/Sections/_helpText';
	const thisRef = references[1];
	const { title, url, description } = thisRef;
</script>

<div class="help-module">
	<div class="base64-help">
		<div class="b64-reference">
			<div class="b64-ref-heading">
				<h4>{title}</h4>
			</div>
			<div class="b64-ref-url"><span class="b64-ref-label">src:</span><a href={url}>{url}</a></div>
			<div class="b64-ref-content">
				{#each description as text}
					<p>{@html text}</p>
				{/each}
			</div>
		</div>
	</div>
</div>
