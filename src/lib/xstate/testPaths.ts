export const asciiHappyPath = [
	{
		type: 'VALIDATE_TEXT',
		inputText: 'test',
		inputEncoding: 'ASCII',
		outputEncoding: 'base64url',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
];

export const hexHappyPath = [
	{
		type: 'VALIDATE_TEXT',
		inputText: '128ab4602a8114',
		inputEncoding: 'hex',
		outputEncoding: 'base64',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
];

export const binHappyPath = [
	{
		type: 'VALIDATE_TEXT',
		inputText: '0101110010110100',
		inputEncoding: 'bin',
		outputEncoding: 'base64',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
	{
		type: 'GO_TO_NEXT_STEP',
	},
];

export const asciiValidationErrorThenAutoPlay = [
	{
		type: 'VALIDATE_TEXT',
		inputText: 'do§',
		inputEncoding: 'ASCII',
		outputEncoding: 'base64url',
	},
	{
		type: 'GO_TO_PREV_STEP',
	},
	{
		type: 'START_AUTOPLAY',
		inputText: 'dog',
		inputEncoding: 'ASCII',
		outputEncoding: 'base64url',
	},
];

export const hexValidationErrorThenAutoPlay = [
	{
		type: 'VALIDATE_TEXT',
		inputText: '11 AB 60 3C W2',
		inputEncoding: 'hex',
		outputEncoding: 'base64',
	},
	{
		type: 'GO_TO_PREV_STEP',
	},
	{
		type: 'START_AUTOPLAY',
		inputText: '11 AB 60 3C E2',
		inputEncoding: 'hex',
		outputEncoding: 'base64',
	},
];

export const hexSkipDemo = [
	{
		type: 'SKIP_DEMO',
		inputText: '11 AB 60 3C E2',
		inputEncoding: 'hex',
		outputEncoding: 'base64',
	},
];

export const testPaths = [asciiHappyPath, hexHappyPath, binHappyPath];
