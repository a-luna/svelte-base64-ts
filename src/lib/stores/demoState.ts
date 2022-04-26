import type { DemoState } from '$lib/types';
import { writable } from 'svelte/store';

export const demoState = writable<DemoState>({ mode: 'encode', modalOpen: false, welcomeDetailsOpen: true, appNavDetailsOpen: false });
