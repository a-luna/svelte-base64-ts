import Base64OutputEncoding from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64OutputEncoding.svelte';
import Base64References1 from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64References1.svelte';
import Base64References2 from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64References2.svelte';
import Base64StandardAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64StandardAlphabet.svelte';
import Base64UrlAlphabet from '$lib/components/AlgorithmDemo/HelpModal/Sections/Base64UrlAlphabet.svelte';
import KeyboardShortcuts from '$lib/components/AlgorithmDemo/HelpModal/Sections/KeyboardShortcuts.svelte';
import NavButtons from '$lib/components/AlgorithmDemo/HelpModal/Sections/NavButtons.svelte';
import StringInputEncoding1 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncoding1.svelte';
import StringInputEncoding2 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncoding2.svelte';
import StringInputEncodingAscii from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncodingAscii.svelte';
import StringInputEncodingBinary from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncodingBinary.svelte';
import StringInputEncodingHex from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncodingHex.svelte';
import StringInputEncodingUtf8 from '$lib/components/AlgorithmDemo/HelpModal/Sections/StringInputEncodingUTF8.svelte';
import WhatIsBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsBase64.svelte';
import WhatIsntBase64 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhatIsntBase64.svelte';
import WhyBase641 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhyBase641.svelte';
import WhyBase642 from '$lib/components/AlgorithmDemo/HelpModal/Sections/WhyBase642.svelte';
import type { HelpSection } from '$lib/types';
import { getRandomHexString } from '$lib/util';

const createEncodingHelpSections = (): HelpSection[] => [
	{ id: getRandomHexString(4), title: 'Why Base64?', component: WhyBase641 },
	{ id: getRandomHexString(4), title: 'Why Base64? (continued)', component: WhyBase642 },
	{ id: getRandomHexString(4), title: 'What Is Base64?', component: WhatIsBase64 },
	{ id: getRandomHexString(4), title: "What Isn't Base64?", component: WhatIsntBase64 },
	{ id: getRandomHexString(4), title: 'Base64 Standard Alphabet', component: Base64StandardAlphabet },
	{ id: getRandomHexString(4), title: 'Base64 Url-Safe Alphabet', component: Base64UrlAlphabet },
	{ id: getRandomHexString(4), title: 'Input Text Encoding', component: StringInputEncoding1 },
	{ id: getRandomHexString(4), title: 'Input Text Encoding (continued)', component: StringInputEncoding2 },
	{ id: getRandomHexString(4), title: 'Input Text Encoding (ASCII)', component: StringInputEncodingAscii },
	{ id: getRandomHexString(4), title: 'Input Text Encoding (UTF-8)', component: StringInputEncodingUtf8 },
	{ id: getRandomHexString(4), title: 'Input Text Encoding (Hex)', component: StringInputEncodingHex },
	{ id: getRandomHexString(4), title: 'Input Text Encoding (Binary)', component: StringInputEncodingBinary },
	{ id: getRandomHexString(4), title: 'Output Encoding', component: Base64OutputEncoding },
	{ id: getRandomHexString(4), title: 'Navigational Buttons', component: NavButtons },
	{ id: getRandomHexString(4), title: 'Keyboard Shortcuts', component: KeyboardShortcuts },
	{ id: getRandomHexString(4), title: 'References', component: Base64References1 },
	{ id: getRandomHexString(4), title: 'References (continued)', component: Base64References2 },
];

export const encodingHelpSections = createEncodingHelpSections();
