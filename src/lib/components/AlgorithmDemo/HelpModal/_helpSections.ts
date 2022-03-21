import Base64OutputEncoding from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64OutputEncoding.svelte';
import Base64StandardAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64StandardAlphabet.svelte';
import Base64UrlAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64UrlAlphabet.svelte';
import KeyboardShortcuts from '$lib/components/AlgorithmDemo/HelpModal/Sections/KeyboardShortcuts.svelte';
import NavButtons from '$lib/components/AlgorithmDemo/HelpModal/Sections/NavButtons.svelte';
import StringInputEncoding1 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncoding1.svelte';
import StringInputEncoding2 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncoding2.svelte';
import StringInputEncoding3 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncoding3.svelte';
import StringInputEncoding4 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncoding4.svelte';
import WhatIsBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsBase64.svelte';
import WhatIsntBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsntBase64.svelte';
import WhyBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhyBase64.svelte';
import type { HelpSection } from '$lib/types';
import { getRandomHexString } from '$lib/util';

const createEncodingHelpSections = (): HelpSection[] => [
	{ id: getRandomHexString(4), title: 'Why Base64?', component: WhyBase64 },
	{ id: getRandomHexString(4), title: 'What Is Base64?', component: WhatIsBase64 },
	{ id: getRandomHexString(4), title: "What Isn't Base64?", component: WhatIsntBase64 },
	{ id: getRandomHexString(4), title: 'Base64 Standard Alphabet', component: Base64StandardAlphabet },
	{ id: getRandomHexString(4), title: 'Base64 Url-Safe Alphabet', component: Base64UrlAlphabet },
	{ id: getRandomHexString(4), title: 'Input Encoding', component: StringInputEncoding1 },
	{ id: getRandomHexString(4), title: 'Input Encoding (ASCII)', component: StringInputEncoding2 },
	{ id: getRandomHexString(4), title: 'Input Encoding (Hex)', component: StringInputEncoding3 },
	{ id: getRandomHexString(4), title: 'Input Encoding (Binary)', component: StringInputEncoding4 },
	{ id: getRandomHexString(4), title: 'Output Encoding', component: Base64OutputEncoding },
	{ id: getRandomHexString(4), title: 'Navigational Buttons', component: NavButtons },
	{ id: getRandomHexString(4), title: 'Keyboard Shortcuts', component: KeyboardShortcuts },
];

export const encodingHelpSections = createEncodingHelpSections();
