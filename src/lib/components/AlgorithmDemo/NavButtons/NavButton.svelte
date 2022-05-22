<script lang="ts">
	import type { EncodingMachineStateStore, EncodingStateToEventMap, XStateSendEvent } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	export let defaultNavAction: EncodingEvent = null;
	export let encodingStateToEventMap: EncodingStateToEventMap = null;
	export let label: string = '';
	export let tooltip: string = '';
	export let buttonNumber: number = 0;
	export let iconWidth: string = '11px';
	export let disabled = false;
	export let testId: string;
	let hovering = false;
	let state: EncodingMachineStateStore;
	let send: XStateSendEvent;
	({ state, send } = getContext('demo'));

	$: labelStyle = `grid-column: ${buttonNumber} / span 1; grid-row: 1 / span 1;`;
	$: butttonStyle = `grid-column: ${buttonNumber} / span 1; grid-row: 2 / span 1;`;
	$: validActions = encodingStateToEventMap
		? [defaultNavAction, ...encodingStateToEventMap.map((m) => m.navAction())]
		: [defaultNavAction];
	$: noActionIsPossible =
		!defaultNavAction && !encodingStateToEventMap ? false : !validActions.some((action) => $state?.can(action));

	function getNavAction(): EncodingEvent {
		if (!encodingStateToEventMap) {
			console.log({ action: defaultNavAction });
			return defaultNavAction;
		}
		for (const { requiredState, navAction } of encodingStateToEventMap) {
			if ($state.matches(requiredState.value)) {
				console.log({ action: navAction() });
				return navAction();
			}
		}
		console.log({ action: defaultNavAction });
		return defaultNavAction;
	}

	function fireNavAction() {
		const action = getNavAction();
		if ($state.can(action)) {
			send(action);
		}
	}
</script>

{#if hovering}
	<span transition:fade class="form-label" style={labelStyle}>{label}</span>
{/if}
<button
	type="button"
	title={tooltip}
	style={butttonStyle}
	disabled={disabled || noActionIsPossible}
	data-test-id={testId}
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	on:click={() => fireNavAction()}
>
	<div class="icon" style="width: {iconWidth}">
		<slot />
	</div>
</button>

<style lang="postcss">
	.form-label {
		margin: 0 0 0.5rem 0;
	}
</style>
