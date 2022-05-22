import type { EncodingContext, EncodingEvent, EncodingTypeStates } from '$lib/xstate/b64Encode';
import type { DispatchOptions } from 'svelte/internal';
import type { Readable } from 'svelte/store';
import type { BaseActionObject, EventData, ResolveTypegenMeta, ServiceMap, State, TypegenDisabled } from 'xstate';

export type EncodingMachineState = State<
	EncodingContext,
	EncodingEvent,
	any,
	EncodingTypeStates,
	ResolveTypegenMeta<TypegenDisabled, EncodingEvent, BaseActionObject, ServiceMap>
>;
export type EncodingMachineStateStore = Readable<EncodingMachineState>;
export type XStateSendEvent = (event: EncodingEvent, payload?: EventData) => EncodingMachineState;
export type NavButtonEventDispatcher = <EventKey extends 'navButtonEvent'>(
	type: EventKey,
	detail?: {
		navButtonEvent: {
			action: EncodingEvent;
		};
	}[EventKey],
	options?: DispatchOptions,
) => boolean;

export type EncodingStateToEventMap = { requiredState: EncodingTypeStates; navAction: () => EncodingEvent }[];
