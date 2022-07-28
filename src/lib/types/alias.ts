import type { EncodingContext, EncodingEvent, EncodingSchema, EncodingTypeStates } from '$lib/xstate/b64Encode';
import type { Typegen0 } from '$lib/xstate/b64Encode.typegen';
import type { DispatchOptions } from 'svelte/internal';
import type { Readable } from 'svelte/store';
import type {
	BaseActionObject,
	EventData,
	Interpreter,
	MachineConfig,
	MachineOptions,
	ResolveTypegenMeta,
	ServiceMap,
	State,
	StateMachine,
	TypegenDisabled,
} from 'xstate';

export type EncodingMachineConfig = MachineConfig<EncodingContext, EncodingSchema, EncodingEvent>;

export type EncodingMachineOptions = MachineOptions<
	EncodingContext,
	EncodingEvent,
	BaseActionObject,
	ServiceMap,
	ResolveTypegenMeta<TypegenDisabled, EncodingEvent, BaseActionObject, ServiceMap>
>;

export type EncodingMachineState = State<
	EncodingContext,
	EncodingEvent,
	EncodingSchema,
	EncodingTypeStates,
	ResolveTypegenMeta<Typegen0, EncodingEvent, BaseActionObject, ServiceMap>
>;

export type EncodingMachineStateStore = Readable<EncodingMachineState>;

export type EncodingMachine = StateMachine<
	EncodingContext,
	EncodingSchema,
	EncodingEvent,
	EncodingTypeStates,
	BaseActionObject,
	ServiceMap,
	ResolveTypegenMeta<TypegenDisabled, EncodingEvent, BaseActionObject, ServiceMap>
>;

export type EncodingMachineService = Interpreter<
	EncodingContext,
	EncodingSchema,
	EncodingEvent,
	EncodingTypeStates,
	ResolveTypegenMeta<TypegenDisabled, EncodingEvent, BaseActionObject, ServiceMap>
>;

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
