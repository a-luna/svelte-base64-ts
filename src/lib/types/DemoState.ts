import type { AppMode } from './Literals';

export interface DemoState {
	mode: AppMode;
	inputText: string;
	modalOpen: boolean;
	welcomeDetailsOpen: boolean;
	appNavDetailsOpen: boolean;
}
