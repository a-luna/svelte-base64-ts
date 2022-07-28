import Base64OutputEncoding from '$lib/components/AlgorithmDemo/HelpDocs/Sections/Base64OutputEncoding.svelte';
import Base64References1 from '$lib/components/AlgorithmDemo/HelpDocs/Sections/Base64References1.svelte';
import Base64References2 from '$lib/components/AlgorithmDemo/HelpDocs/Sections/Base64References2.svelte';
import Base64StandardAlphabet from '$lib/components/AlgorithmDemo/HelpDocs/Sections/Base64StandardAlphabet.svelte';
import Base64UrlAlphabet from '$lib/components/AlgorithmDemo/HelpDocs/Sections/Base64UrlAlphabet.svelte';
import KeyboardShortcuts from '$lib/components/AlgorithmDemo/HelpDocs/Sections/KeyboardShortcuts.svelte';
import NavButtons from '$lib/components/AlgorithmDemo/HelpDocs/Sections/NavButtons.svelte';
import StringInputEncoding1 from '$lib/components/AlgorithmDemo/HelpDocs/Sections/StringInputEncoding1.svelte';
import StringInputEncoding2 from '$lib/components/AlgorithmDemo/HelpDocs/Sections/StringInputEncoding2.svelte';
import StringInputEncodingAscii from '$lib/components/AlgorithmDemo/HelpDocs/Sections/StringInputEncodingAscii.svelte';
import StringInputEncodingBinary from '$lib/components/AlgorithmDemo/HelpDocs/Sections/StringInputEncodingBinary.svelte';
import StringInputEncodingHex from '$lib/components/AlgorithmDemo/HelpDocs/Sections/StringInputEncodingHex.svelte';
import StringInputEncodingUtf8 from '$lib/components/AlgorithmDemo/HelpDocs/Sections/StringInputEncodingUTF8.svelte';
import WhatIsBase64 from '$lib/components/AlgorithmDemo/HelpDocs/Sections/WhatIsBase64.svelte';
import WhatIsntBase64 from '$lib/components/AlgorithmDemo/HelpDocs/Sections/WhatIsntBase64.svelte';
import WhyBase641 from '$lib/components/AlgorithmDemo/HelpDocs/Sections/WhyBase641.svelte';
import WhyBase642 from '$lib/components/AlgorithmDemo/HelpDocs/Sections/WhyBase642.svelte';
import type { HelpSection } from '$lib/types';

const createEncodingHelpSections = (): HelpSection[] => [
	{ index: 0, id: 'why-base64-1', title: 'Why Base64?', component: WhyBase641 },
	{ index: 1, id: 'why-base64-2', title: 'Why Base64? (continued)', component: WhyBase642 },
	{ index: 2, id: 'what-is-base64', title: 'What Is Base64?', component: WhatIsBase64 },
	{ index: 3, id: 'what-isnt-base64', title: "What Isn't Base64?", component: WhatIsntBase64 },
	{ index: 4, id: 'base64-alphabet', title: 'Base64 Standard Alphabet', component: Base64StandardAlphabet },
	{ index: 5, id: 'base64url-alphabet', title: 'Base64 Url-Safe Alphabet', component: Base64UrlAlphabet },
	{ index: 6, id: 'text-encoding-1', title: 'Input Text Encoding', component: StringInputEncoding1 },
	{ index: 7, id: 'text-encoding-2', title: 'Input Text Encoding (continued)', component: StringInputEncoding2 },
	{ index: 8, id: 'text-encoding-ascii', title: 'Input Text Encoding (ASCII)', component: StringInputEncodingAscii },
	{ index: 9, id: 'text-encoding-utf8', title: 'Input Text Encoding (UTF-8)', component: StringInputEncodingUtf8 },
	{ index: 10, id: 'text-encoding-hex', title: 'Input Text Encoding (Hex)', component: StringInputEncodingHex },
	{ index: 11, id: 'text-encoding-bin', title: 'Input Text Encoding (Binary)', component: StringInputEncodingBinary },
	{ index: 12, id: 'output-encoding', title: 'Output Encoding', component: Base64OutputEncoding },
	{ index: 13, id: 'nav-buttons', title: 'Navigational Buttons', component: NavButtons },
	{ index: 14, id: 'keyboard', title: 'Keyboard Shortcuts', component: KeyboardShortcuts },
	{ index: 15, id: 'ref-1', title: 'References', component: Base64References1 },
	{ index: 16, id: 'ref-2', title: 'References (continued)', component: Base64References2 },
];

export const encodingHelpSections = createEncodingHelpSections();

export const getHelpTopicIndex = (id: string): number =>
	encodingHelpSections.find((section) => section.id === id).index ?? 0;
