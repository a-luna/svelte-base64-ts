<script lang="ts">
	import LastStep from '$lib/components/Icons/LastStep.svelte';
	import type { XStateMachineState } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { createEventDispatcher } from 'svelte';
	import NavButton from './NavButton.svelte';

	export let state: XStateMachineState;
	const navButtonEventDispatcher = createEventDispatcher<{ navButtonEvent: { action: EncodingEvent } }>();

	$: autoplay = $state?.context.autoplay ?? false;
	$: actionIsAllowed = $state?.can('GO_TO_LAST_STEP') ?? false;
	$: disabled = autoplay || !actionIsAllowed;
</script>

<NavButton
	label={'Last Step'}
	tooltip={'Go To Last Step'}
	buttonNumber={7}
	iconWidth={'13px'}
	{disabled}
	{state}
	on:click={() => navButtonEventDispatcher('navButtonEvent', { action: { type: 'GO_TO_LAST_STEP' } })}
>
	<LastStep />
</NavButton>
