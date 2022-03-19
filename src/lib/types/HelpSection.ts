import type { SvelteComponent } from 'svelte';

export interface HelpSection {
	id: string;
	title: string;
	component: typeof SvelteComponent;
}

export type HelpSectionMap = Record<string, HelpSection>;
