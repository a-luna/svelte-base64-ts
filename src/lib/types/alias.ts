import type { EncodingContext, EncodingEvent, EncodingTypeState } from '$lib/xstate/b64Encode';
import type { Readable } from 'svelte/store';
import type { EventData, State, StateSchema, TypegenDisabled } from 'xstate';

export type XStateMachineState = Readable<State<EncodingContext, EncodingEvent, StateSchema<EncodingContext>, EncodingTypeState, TypegenDisabled>>;
export type XStateSendEvent = (event: EncodingEvent, payload?: EventData) => State<EncodingContext, EncodingEvent, StateSchema<EncodingContext>, EncodingTypeState, TypegenDisabled>;