<script lang="ts">
	import NavButtons from '$lib/components/AlgorithmDemo/NavButtons.svelte';
	import type { NavAction } from '$lib/types';
	import { encodingMachine } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';

	const { state, send } = useMachine(encodingMachine);

	function handleNavButtonEvent(e: CustomEvent<{ action: NavAction }>) {
		const { action } = e.detail;
		if (action === 'reset') {
			send('RESET');
		}
		if (action === 'first') {
			send('GO_TO_FIRST_STEP');
		}
		if (action === 'previous') {
			send('GO_TO_PREV_STEP');
		}
		if (action === 'next') {
			if ($state.value === 'inactive') {
				send({ type: 'VALIDATE_INPUT', inputText: 'test string', inputEncoding: 'ASCII', outputEncoding: 'base64' });
			} else {
				send('GO_TO_NEXT_STEP');
			}
		}
		if (action === 'last') {
			send('GO_TO_LAST_STEP');
		}
		if (action === 'start-autoplay') {
			if ($state.value === 'inactive') {
				send({ type: 'START_AUTO_PLAY', inputText: 'test string', inputEncoding: 'ASCII', outputEncoding: 'base64' });
			} else {
				send('START_AUTO_PLAY');
			}
		}
		if (action === 'stop-autoplay') {
			send('STOP_AUTO_PLAY');
		}
	}
</script>

<NavButtons on:navButtonEvent={handleNavButtonEvent} />
<div class="state-name">{$state.value}</div>

<style lang="postcss">
	.state-name {
		font-size: 3rem;
		font-weight: 700;
		color: var(--blue4);
	}
</style>
