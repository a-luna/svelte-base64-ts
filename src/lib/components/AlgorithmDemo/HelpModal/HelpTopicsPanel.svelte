<script lang="ts">
	import { encodingHelpSections } from '$lib/components/AlgorithmDemo/HelpModal/_helpSections';
	import { changeHelpTopicEvent } from '$lib/events';

	export let index = 0;
</script>

<div class="help-docs-nav">
	<ul>
		{#each encodingHelpSections as { title }, i}
			<li>
				<span
					class="nav-link"
					class:current-section={index === i}
					on:click={() => changeHelpTopicEvent('changeHelpTopic', { index: i })}>{title}</span
				>
			</li>
		{/each}
	</ul>
</div>
