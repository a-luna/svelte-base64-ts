/* c8 ignore start */
import { testScriptEvents } from '$lib/xstate/b64Encode.test/testEvents';
import { createTestScript } from '$lib/xstate/b64Encode.test/testScriptGenerator';
import type { TestFunctionInputData } from '$lib/xstate/b64Encode.test/types';

const generateJSDomTestCaseCode = (test: TestFunctionInputData): string =>
	`{ description: '${test.description}', testFunction: ${test.scriptName} },`;

export function createTestSet() {
	const imports = `/* c8 ignore start */
    import type { JSDomTestCase, JSDomTestFunction } from '$lib/xstate/b64Encode.test/types';
    import type { Screen } from '@testing-library/svelte';
    import type { UserEvent } from '@testing-library/user-event/dist/types/setup';`;

	const testFunctions = testScriptEvents.map(({ scriptName, events }) => createTestScript(events, scriptName, true));
	const fastTests = testScriptEvents.filter((test) => test.type === 'fast').map(generateJSDomTestCaseCode);
	const slowTests = testScriptEvents.filter((test) => test.type === 'slow').map(generateJSDomTestCaseCode);

	const fastExportDeclarations = [`const fastTests: JSDomTestCase[] = [`, ...fastTests, `];`].join('\n');
	const slowExportDeclarations = [`const slowTests: JSDomTestCase[] = [`, ...slowTests, `];`].join('\n');
	const finalExports = [
		`export const testPaths = import.meta.env.DEV ? fastTests : [...fastTests, ...slowTests];`,
		`/* c8 ignore stop */`,
	].join('\n');

	const exports = [fastExportDeclarations, slowExportDeclarations, finalExports];

	return [imports, ...testFunctions, ...exports].join('\n\n');
}
/* c8 ignore stop */
