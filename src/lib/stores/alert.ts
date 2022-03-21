import { writable, type Writable } from 'svelte/store';

export const alert: Writable<string> = writable<string>('');
