/* c8 ignore start */
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

function syncWidth(el: HTMLElement): Writable<number> {
	return writable<number>(null, (set) => {
		if (!el) {
			return;
		}
		const ro = new ResizeObserver(() => el && set(el.offsetWidth));
		ro.observe(el);
		return () => ro.disconnect();
	});
}

export const getPageWidth = (): Writable<number> => {
	if (typeof window !== 'undefined') {
		const svelteDiv = document.getElementById('svelte');
		return svelteDiv ? syncWidth(svelteDiv) : null;
	}
};
/* c8 ignore stop */
