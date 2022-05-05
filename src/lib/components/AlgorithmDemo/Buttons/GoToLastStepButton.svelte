<script lang="ts">
	import LastStep from '$lib/components/Icons/LastStep.svelte';
	import type { XStateMachineState } from '$lib/types';
	import NavButton from './NavButton.svelte';

	export let state: XStateMachineState;

	$: autoplay = $state?.context.autoplay ?? false;
	$: actionIsAllowed = !$state?.can('GO_TO_LAST_STEP') ?? false;
	$: disabled = autoplay || actionIsAllowed;
</script>

<NavButton
	action={{ type: 'GO_TO_LAST_STEP' }}
	label={'Last Step'}
	tooltip={'Go To Last Step'}
	buttonNumber={7}
	iconWidth={'13px'}
	{disabled}
	{state}
	on:navButtonEvent
>
	<LastStep />
</NavButton>
