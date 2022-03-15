import type { AppMode } from '$lib/types';
import { writable } from 'svelte/store';

export const appMode = writable<AppMode>('encode');
