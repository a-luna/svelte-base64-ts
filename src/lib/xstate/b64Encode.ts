/* eslint-disable @typescript-eslint/no-unused-vars */
import { b64Encode } from '$lib/base64';
import {
	defaultBase64ByteMap,
	defaultEncoderInput,
	defaultEncoderInputChunk,
	defaultEncoderOutput,
	defaultHexByteMap,
	defaultOutputChunk,
} from '$lib/constants';
import { validateEncoderInput } from '$lib/dataPrep';
import { isTextEncoding } from '$lib/typeguards';
import type {
	Base64ByteMap,
	Base64Encoding,
	EncoderInput,
	EncoderInputChunk,
	EncoderOutput,
	HexByteMap,
	OutputChunk,
	StringEncoding,
} from '$lib/types';
import { assign, createMachine } from 'xstate';

export interface EncodingContext {
	resetForm: boolean;
	autoplay: boolean;
	skipDemo: boolean;
	byteMaps: HexByteMap[];
	byteIndex: number;
	updatedByteMaps: HexByteMap[];
	currentByte: HexByteMap;
	remainingBytes: number;
	updatedInputChunks: EncoderInputChunk[];
	inputChunkIndex: number;
	currentInputChunk: EncoderInputChunk;
	remainingInputChunks: number;
	updatedOutputChunks: OutputChunk[];
	outputChunkIndex: number;
	currentOutputChunk: OutputChunk;
	remainingOutputChunks: number;
	base64Maps: Base64ByteMap[];
	updatedBase64Maps: Base64ByteMap[];
	base64CharIndex: number;
	currentBase64Char: Base64ByteMap;
	remainingBase64Chars: number;
	input: EncoderInput;
	output: EncoderOutput;
}

export const initialEncodingContext: EncodingContext = {
	resetForm: false,
	autoplay: false,
	skipDemo: false,
	byteMaps: [defaultHexByteMap],
	byteIndex: 0,
	currentByte: defaultHexByteMap,
	updatedByteMaps: [],
	remainingBytes: 0,
	updatedInputChunks: [],
	inputChunkIndex: 0,
	currentInputChunk: defaultEncoderInputChunk,
	remainingInputChunks: 0,
	updatedOutputChunks: [],
	outputChunkIndex: 0,
	currentOutputChunk: defaultOutputChunk,
	remainingOutputChunks: 0,
	base64Maps: [defaultBase64ByteMap],
	updatedBase64Maps: [],
	base64CharIndex: 0,
	currentBase64Char: defaultBase64ByteMap,
	remainingBase64Chars: 0,
	input: defaultEncoderInput,
	output: defaultEncoderOutput,
};

export interface EncodingSchema {
	states: {
		inactive: Record<string, unknown>;
		validateInputText: {
			states: {
				validate: Record<string, unknown>;
				error: Record<string, unknown>;
				success: Record<string, unknown>;
				validationComplete: Record<string, unknown>;
			};
		};
		encodeInput: {
			states: {
				idle: Record<string, unknown>;
				autoPlayEncodeByte: Record<string, unknown>;
				encodeByte: Record<string, unknown>;
				explainByteMapping: Record<string, unknown>;
				encodingComplete: Record<string, unknown>;
			};
		};
		createInputChunks: {
			states: {
				idle: Record<string, unknown>;
				autoPlayIdle: Record<string, unknown>;
				regularIdle: Record<string, unknown>;
				autoPlayCreateInputChunk: Record<string, unknown>;
				createInputChunk: Record<string, unknown>;
				explainLastPaddedChunk: Record<string, unknown>;
				createLastPaddedChunk: Record<string, unknown>;
				createdAllInputChunks: Record<string, unknown>;
			};
		};
		createOutputChunks: {
			states: {
				idle: Record<string, unknown>;
				autoPlayIdle: Record<string, unknown>;
				regularIdle: Record<string, unknown>;
				autoPlayCreateOutputChunk: Record<string, unknown>;
				createOutputChunk: Record<string, unknown>;
				explainLastPaddedChunk: Record<string, unknown>;
				explainPadCharacter: Record<string, unknown>;
				createLastPaddedChunk: Record<string, unknown>;
				createdAllOutputChunks: Record<string, unknown>;
			};
		};
		encodeOutput: {
			states: {
				idle: Record<string, unknown>;
				autoPlayEncodeBase64: Record<string, unknown>;
				encodeBase64: Record<string, unknown>;
				encodingComplete: Record<string, unknown>;
			};
		};
		verifyResults: Record<string, unknown>;
		finished: Record<string, unknown>;
	};
}

export type EncodingEvent =
	| { type: 'RESET' }
	| { type: 'UPDATE_TEXT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'VALIDATE_TEXT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'START_AUTOPLAY'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'SKIP_DEMO'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'GO_TO_FIRST_STEP' }
	| { type: 'GO_TO_PREV_STEP' }
	| { type: 'GO_TO_NEXT_STEP' }
	| { type: 'GO_TO_LAST_STEP' }
	| { type: 'RESUME_AUTO_PLAY' }
	| { type: 'STOP_AUTO_PLAY' };

export type EncodingTypeStates = {
	value:
		| 'inactive'
		| 'validateInputText'
		| { validateInputText: 'validate' }
		| { validateInputText: 'error' }
		| { validateInputText: 'success' }
		| { validateInputText: 'validationComplete' }
		| 'encodeInput'
		| { encodeInput: 'idle' }
		| { encodeInput: 'autoPlayEncodeByte' }
		| { encodeInput: 'encodeByte' }
		| { encodeInput: 'explainByteMapping' }
		| { encodeInput: 'encodingComplete' }
		| 'createInputChunks'
		| { createInputChunks: 'idle' }
		| { createInputChunks: 'regularIdle' }
		| { createInputChunks: 'autoPlayIdle' }
		| { createInputChunks: 'autoPlayCreateInputChunk' }
		| { createInputChunks: 'createInputChunk' }
		| { createInputChunks: 'explainLastPaddedChunk' }
		| { createInputChunks: 'createLastPaddedChunk' }
		| { createInputChunks: 'createdAllInputChunks' }
		| 'createOutputChunks'
		| { createOutputChunks: 'idle' }
		| { createOutputChunks: 'regularIdle' }
		| { createOutputChunks: 'autoPlayIdle' }
		| { createOutputChunks: 'autoPlayCreateOutputChunk' }
		| { createOutputChunks: 'createOutputChunk' }
		| { createOutputChunks: 'explainLastPaddedChunk' }
		| { createOutputChunks: 'explainPadCharacter' }
		| { createOutputChunks: 'createLastPaddedChunk' }
		| { createOutputChunks: 'createdAllOutputChunks' }
		| 'encodeOutput'
		| { encodeOutput: 'idle' }
		| { encodeOutput: 'autoPlayEncodeBase64' }
		| { encodeOutput: 'encodeBase64' }
		| { encodeOutput: 'encodingComplete' }
		| 'verifyResults'
		| 'finished';
	context: EncodingContext;
};

export const encodingMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QCMBsAWAogOwMYHsIwA6AS2wENcAXUgNzAGIBlAFQEEAlVgfXYFVWAeQAKAGXYBNRKAAO+WKVr5sMkAA9EADgCcWgMzEArAAYATDv1mtRrea0AaEAE9E+-ZeIBGKxiNetAHYdI1R9AF9wpzQsPEIScipaBkYANXYxAEkAEXZWTB58gA1WNXlFZVUkDW0dT1MLKxs7aydXBH10O2ITZpMTHTNAwK0vQMjojBwCIjJKGnomfhFc-MLMErKFJVIVNU0ELzMTVEDiQOOBg110WzbEH1tiHXQTI30vMYMdVDMJkBi03icySixYAGlMiIeNlMABZIRbCq7KqgA46fqGBqWay2ez3DpGaw9IzDEz6EzoLzodDuf6AuKzRILFKcTDMTClarlHZ7aoHT51LTEKxeVCoLSoDFEnQEo7mHofT6mH7DLR-KIAqaMhLzZJMdSwagUagkCgAM1NACcABReEwASkYDJmutBDCRvNRNUOlx053Qent+nFJ1QcspRm8ZjFdRMXn8qHM9O1ruIdAoABtSBATWBMthZABXaisMDqajprM5vOMT2VfaIQaBQxBsPuWNeAm3ExnQLkr76LQ2GMp2JpjPZ3OmgvF0vlytgK1W-BWxhsjlcuTbBv8ptadCoYy00Kko7oMxmbuoUnEKk0gJUzERTUu4GTmszwslssV4hLlc1wAcSEQpQIAMUyTg2B4NhMBEesUUbBA9EPY99FPQJz0vbtAhpEVTlJe89CMHQxyBWYP2nfNv3nP8ANXRgQLAngRDZVJYPyBDuR3JC9xQgwjyME8bywswLyvFxEC6X5iAsIj+luKVUHInUqynPNZx-Bd-2XRjDWNU1iAta07X6R1nVTd9q2orS6MXPSrUQvk0X3MwhJEs9xJwqSEEDbpLw8N4XgTOlXysyibM02jf0rWAi1wXA4Fgdd2X4OECgEYRWIkaQeORFyfWbVtRnbD4pS7Xyh1kkJUACckLBpMjwvHayNK-OdYuIeLEuS1LN2c710VGDyMNE7DJPaENTkVC87B0T4xtUicoo67S-x6pLYBS5jssg6DeDg7jtwKoa3NGzCJoJIczFbWllLqCw8OWtrPxozqdM2vrdtAtjMA4o7BuQvQQ3Qy7vMmtwQuIIIAl+Ydh0+F7Iva971rihKtp20DsoAOQ2Q6uKB-jiueUrxQ7Cru3jf1JSMUiME+E5xhaiiSCo6KPo2zHvpx0CJBgwH8q9YGhhK+0KfKhbux8PtLECX4KSlN5kfZ1a0fs7qee2xgDLzYzLSXMz+idN8Ubeuyuq+7bidclCxbJiWwilyqprwqN7HjGl3DqjVJla83bJihdGAgFQSCNfWzbV1HLYXW2ipGsHxohgkMClEUAjFFtaTedBVf-HU7LICBMyYDd0sywRftyhODkCUizgsPQ7CsHR+3QbtXkMTF0AVyVvKMAuwCL2iS7LlhhGhLKa6kOvEAuD5nn84JPklXQCSJIZzjGKUPhefoVNZtSR9dYucwnjdOXnhAgnc85FdpdVyXp67ei8c5SOpOrbAvYfR7nOPJgP0eD7UFkTYWu47ZBFBgrW6T9jgYSMNdW6wpxQ2F+OJTEIx-5nzHhfYBfNWLsU4vBG+QQ0JwM6DdF+yCqoK0MK8MMCYLh1XFLg+I59S6EJYvjEopDjogB5FAn0Dd25ySFK3J6lJN4DDOKROo+g1Q+D9lqAOJBT6cPwdwpiRCBaEzIZAvidsxFN0kQ1duMjfLCUpN4UwiYBhJkpBwogXCJ56yMiZI29oTaWXUYXPBgCCE31MRIluFiO7dnpv6Ba1hBgvFeH-Y+aZNGuLHhQEs+ARCZgoM4NmAAhZwppJ6iD4NXHKc8jGFQOKMIk3gDyXlCIGRMdD2h92pCKBW7dbALR+F4FxGtjKZOybkgpRSDSR08YbW0PiLLRwCVowBGTqBZJyXknUhTTTkNeEeIYYx4yfCGOYKJt07wVXtI3emLN-ZswWWkwBqSwCbPLmlDKZTsriEqSdEW-FRiBmMEqeUDdzCyl8l0LCclJQeC8O3DCODknAkecXR5zz+rXyqWdW+rCH7wJoUg2Rtw5JUlmdSIcDcBnIo2eM3RLEwEGMEcI4xPo75HioQg2hm9jhmDsW8MUjjFIUrHii6lIC-oAwgd8kR9cDBRiHPaDED5dCgvaKYN40Yfh9z3lKa5ajblIqFVS4pIC+H0pCQYdAPRElapbArXCPw5LCSTBYCUWEXw3JPgAksdynkir0ewcBhjJVMpqdSf07xPhAuxJyik3gQh2DsPTGFR93UpM9YudQsgcnkGeXCCgshZDkCgP1Su7zZ55SDdUhejcwnDgiVYlVpxhThL0L2ToybdUesCV68smaKDZvGbm-NhaSnT3KZ88tQjeKVoQBcPucksLDE6PJOqad4xHlqocqFMpBUPIzVm7AOa80FuwEWq+W5J2nWQiynF1Dn74usVYEwPQRgShhQtA8-SEWzH1bu3t-bTSDuPUWkBdKBHkOxWyvFr9fIXDqb2JMNrQiDB3d2vdfaD0DqPcO0VJChYVsxaE5uta26ROsTGKMRJSohmGCwlD6a-0YYA1hk9NK8YEzAxi5ChHzEkfrYgWwGEYbdOpAmUwCs6P-jQ-+sAgHsN+oDQyqdBHq1EakZYzu1iQiGHVKEOwbwBg+Akz2-dh6h0sY8WaaZxs5kRQ0WmyTDHTNAZCSpnj0iNMqtCB-YKOIxhULo6HcO3VDIkHmT+ks4HYGPyg60xA4p-kK3sYugIugC64CtGATmJYADCAALIs2AADWsAgF1k4-xE8tMdkhnBTSAkB4Zq9McV0sTaWMtZeoHlgrxWhkrJGc4TIOi2ClJnhUidjLp1dC6D0UTFCfCjEhrfJWsaBghheGYexbXMtrU6-lorJXlmrNyYN9xkzLOmVmabWzxB0vbY1l1-bvWjsDe4TfKbwp4z0zm3KxbB4FY9D+3544Yx85fpILdjrD2esZagEWHJVoTsvOYCW0b463sHg+7NvC82jgEguPGGGt1SIKX8Ko+ZEOdtQ5KzDuHFAEdDanqWsbb3SKtmsBGkIJx3J496Bau+-hyQYFpFtyHe3odgFh-DxHaLz0TcxRVKMOyfAYDbrcAkFheww0pE-T4CtPig5TcCCn92xfU4l7T+nE8QNQQUzfZWiuTjK9pI1WLCAhi6BhnAi4l4-PC7Bzd9rlPTfEBp1LnROH-ocfw8hKUG27yO5q6r13vsP6vCCKTuqtJmqG9mMbuyVOQ-m7D1bohJqo8Xp+Xbd7M2vvY5+-V5XEisJeYwDKoe-u8+0QL6Hun0uQH6PL3L5C1fPu2DrwtvH7d-Rkrwv0AwMZs8drTJ3ucBfDv9ey4Hk33WR1M7R+Vu29NQhyUd3oH47x3h49umcVvXkMLxpF0H7rB3hlrM33d-PYvdZnYNhd8yV3-EV8ctg91838t9P9usb5-B3AH56YJRYUxpk95Yzk+4hwTgt4tBH9t9HsgDdsd8K43lUda4D8fRTxuUhxaRRRehscedugWwFpE1hIYUVYO9wCu9g9cCocZc7dBgHc6pE8Xc8ciQLVDx593JD54Uc9wc2DV8OCZDgCd9rcDpB8lMY9eD49+CVdBCYMdljxPtThKQP0sCICcD5C8CitWNfpcMJUK8pV+MXhhRhwx97EUtXYF4fdvAMJc5MEbxF9yczCC9OCv9jV2M8NbDg17CYVoxAwYxv4qR9A05BgP4PgMJewTgRxMDWCP92Dn8A9sjZDFD5NTUSCDhnYP5TxE15tXhlUF4E07x3AGpKRxJP0pC8jRdcjjN0MxAKAjQRAKAIAiAIAuCCCq4PliDo9+Ij9dlT9dAbwMIEjfJJRXhP56D0DXghhjCcjHtOjyBujej+jBiuDhtR0xivlwjp0iQjhl4YxDxr89d6t3BDBZZbp+DbBSJNiCjtipNsA9jqA+iBjIBhj2R0UJi7ZY8+Cnck88dX1OlF115LwQgPiFCviGNfj-jDjgiiFQMwih9+IFcNDITtD2gRghxIVm9NVoU3Ul8jcAjg8difiei-iDjATMSWIxUVDL1Ji4CT86oz85jL8YMPALUrk9AWwQd3IkTzCet6S0TmShjWS2N+EcTVCuTj9jheTZiL8Fj2gghxFxQJRmYxoaRJSC8ZTGT0SWTCiWIB9lTOTD9uT1SYVNT5iHifBngmD5YXhnosj2iUT91ZSAT5Sd8LNf9vF-8-FbkgiOjviAyMTICSj+MHSZjz8XTFiGDjAXh253IPgugqT-D8jkSetjdYzLSLCRi99xjzj5cOxjAbxKiKCBh6sukAdhwSTQgDkTS5C7sSygyLDjiKyzjcTD86h-Qwh1R087iPNah75ukKRzB-AFodV8zfSiyt8eygSBoEyEBwSCSBCXhXd25ghPDc5NVSQLhOzcjizzS5SuClDbctydylc9y1cYNao5JQp1TLkLzTDuzrzAzbyiF2TbTK9SCkyNSUyBSdS+4n0oUkxRSwhQhvzVzfz9j-yFTQIy9gK7DtyayKj-AqjGy0y48hRGpaQGEydrsoyfy8x1z0KeAbSbChyfQyjayj9FoDxCL2gFU2d05yR3BDwlzKLaTLy1y-y4yLCQyvEZlwzlyn9qLTRaL4zQTmLcK6z8KGyajb4bwP4+UxJDx4xxMfS5LitAtsAI4QtiBZLsDiseCExdytD9y04DAn1YiHCgUNssChASxPiesCEytlKDgLwjx0FWEbAhRHhuwQhnhRQKQnpOhyQDdqTc8t8vLqAfKX8+s1lpd+yiDByVS7YFo+d7phgX0MIhhrpOgT8PBicG5V4XhPLvLCyMrntpdJKrNLsIy1JjdUr0qnt+tEcb5CqYZiq1QELyrrFbE5FZ95jDwxQ8yhK7seqmrC9Jde8dFyzcrxt8qioOkDxqNRqyrAh1d+xDAkx3ADAGEQhBLACUrGqpSzdVrLcmAcqx1KymLSikxP5fhzArByojrfIhh7VaQYUxNVQ10Gq0rlqe8nruCtylEOl5j5QmFjg8J1cf5nhyNGZ5oMBrrIzbrIb7qVqLc+8sSbdiiAq3AO4RRw1jhkbewpy3dAwzhFEPBxzSdDLWjuq7ru8i81qS82TrDA0qzkIQwDxqaPhab+gUaGaMQ1UBhAwp8iQTqIberoaSbeFQjGLtr0RdqRrSqla04WxngGDYilQUiVaobeaYb+9-VybhaSZdb9r9bxr2gxgAgRQ1sP0aR7pEqrKlrCbQDcl388x-ajjGdNqb45qowgwQafANUMBjqPA7xrB1iLqaQNijKwBQ6QDX8g78afLv8LKpLrMAC8bFruac7Mq87y6CaodI7LgMyQxWdbhdARh1cs8iUaQdN7Rcz29Ob87lquba6v8NrXq8q7SfQQcowJZ4FecX0GaNt1RjAAg9BCJbBxJcauqB7Cah6C6z0b5RaLVEbJbzB6b1dAo7FbA5r4MWwLad7t6ALaUyaOSQKDg1sj6abKQpaz6Aa0CegbxbpUF4kWD+6a7erd7CzLDiFI8sKIi3cBxiAEMSrzBggXbEANtlifqBxn5FFMjQGQ6K6RKwHIGQilStaJ6DhLgP4Gt1QJbxJbBHAAasET8mZ1R0EwhN7l8H6uyCHh6rTsoGKhb3r0GLwm5qEekxRpa5RdBuULBYwYwRxbhfaFreHeqzTULxLCti1CCx6tqKGHgELHZY6PB04GaJI7wEwwhGoEq6g+6krpDiHCb1GmS0Kd8XrTi9HX6HhrBdl7pdB8KxhpYH1vMs86oJZ6aKKbrHHTSYyxLSytH964aJQP6Jav7T7UaAawwiUMApbxD6Y76YnUS4neytG7y7bhGOhZ1xakbv6MnXbWbEHc4TqG4lZOGaTom6TYmNH4moGgLyGvHDhDGY6Qg47TH1clFTqs8LxyRedewCnOminumSmoHML+nsKo6jGRmTHDwGbSRp8NtKQMQF8JR5nozFmXHNGoHBHFN9HBnBNhnoD46GaEx8Ibohg6pBchhlGonVHlrnGLTlm2q-9fE-bCG-Sujim66tyNmHnRmdnEim53gbjFyE1TnwXyB-i8s6ckglxtHRiy0b5vIxGTxdBJGf72hThuVLAQUfAfBsG0XpTvjMXctsWaBcX3GCWtzjh7VOd4DKQ8IFVN5j92515F1RIqQGWSt6TmXWXrRYaKbKmEbP66a6mHhExjAxIQw9lqRvmy7fmnGmX+isWrQcXgJSblDYHp0lFbFj60mpHfJs5GE7AAHDrfhJWHN90ZWTW2WzWBaYG1m4Gp7vAud4q-sli34RCKEDCaRSddWt6OmznPWjWWXvW5XSHyntaRHt5cUJHvrVXb4LAYYPB+x6Cdm9B3XpXk3ZXcWbb7yFWiW5JxHSW83nnrXk6G4DT4ZHwK3DX5Tq21wgWwyQWVHTRs7E30MvXTXCXRHG2SWFoW2CQvSH4RgWwNcZI-CR2s6wXkKaLIWR7Xl8Xmc4bqDWKf5hJUFwxfIkjEHDq7AY2mD3Wrylmw6RtdHCXn5zhdAThOhSW3Db5bFkndcfg5ykl8HR3t2Ssn2LmenEmFX37qmT77XXbV549EZ1QugFF5qfnwO+H5KwBFKLCymX7sLD6EO7XyWHgHDM5aHKDzAQdH3RLn26K+mhHM3Gbs2m352kP+NyRFRtK3h5jfhqQGOULoPln03iO4GKQghT3RMLxqoIwRhjxDwQp3IxhIm9WcPwHGOxPH6BHbbJOrWT3Twz35PJQ5Qk07wLhJRcn+h6rM6x28OCOtHB3pLh3sOt3cOd2FK92lL7a7ZpP5EbxTOL36teOS3DlqRYY2nkqE39tTLzKo5N3HObK4aqnbWVWGb4ZHCxIWsLwAgBl-bStR6PHBqlEqXPJeUghF2BP495t3g8I1RCu7rSsOWj2FXpQdLgh8LAoxpF2uURQuhF6kEhgNPO14giu-LYP-PJ7goPtSo5F06bwIxOgowbBNVmZRTmuCbSsiPLXMUJZ3b347O8IgrXd7RLxmb3JSI+4OLOhtuglw9ALBabmBnHyE8HKXyuL-ALVAGxTRIf2HuvU-KJP9vgZyvl5ECqv-qdSljzgRhOdT6migfKwQeijDPMV5YKuof-BqvFiV7EGxT4bm5boUfStXOS7OrU1XRJvXstysfIfTxof+v7RM5egvZQhi2yfA71lXR8keiwAMBd8I76eW1EGbwmEsz6ZtTtBvcAVWEjgiQMJufc7ef4h+fYBBf0BC79Zi6OqwsdQiueeCkBeMBI7zBxJP5rAFYTx83hwMBjb79hJTyN3-FHkiuUVTfteSvOWOuRWZtLwYEW1Th6tdS7xDxTgWx3Afg8H7HvUPeNkvf5WZuBQud5ufF24lvzv+gIUDKvh+xmi43qeJuWvPfNehe9uA3p0JZptjvFuzvF2tMAcMQjhnXSRY+DeafS-E-y-teI9xVWPbm+lvNGpG1oLjlFiJeRQ72GYrA8IO-rt3fu++ek-Qeq-Me4LEGP0bF-GLx6sY3jA85Q1ewbeyey+termDOweSZ-f4xA-6DnWYftAQxTr3dbh9kxSUeEvgsku3fDe7rzeY5AHBn1O7XcecrPG8MOCHAqhEK-uc0OQFICwBcskAZPhU0OT+BjApUYIAAxsDJ4PgZwB8AzECj0c4BCApASgMr6D8Bm6A8olgPPy4hk8fcD+vaCOAUg+4C0AuPAOwCIDkBEAXpi90AGkk6+mfBvjBjeBoIKQs+RWD7k4FkDeBOvKZH-lLpqQuBPAyAJHSZhHhKQBhWPIfEYYUsQa3gOqJKAWi9BdSkQTUNgHiDwBqg8yZkPqA0FhBaYY5U4O4B9xygewQmUWhVHVAL4C4HMHbF1ACFgBBq5IYUNiCaB4hWgYKUMMGzFAwoRgfcUkP4PVhxx6IjkQasYP-oXJxQ5GSCtJAlAUZBgG2RaIVSL6vQg4XMDGL1Btj09W0n7fSs7C6AwproqDAiCMBGiFCLAKQ2OMHD-ABCUQ2WfAAAFtM0YALZPT3eCOF2yuZL+uqGujzsYYPgVmmYLmJjcVovQqoaEI6QRDcQLQfQW4EpazRbua2NgRJmCRbkLgEAmBO8GtbmcH0HuX4FhAGBDBQgpPf3OFkrDG9DUIQrcg0n9CuoEYCFMMLhCUSDcqQ0vRpBKw+H2ZhUEwhViMFvBDdguw4WFJpUuL+hFIseKkOvBaJx9PhHrdDE5kLQhJxI0+XMpcDcFSg04XwGGHWTiTv8+4RmRkIWiGGjCy48IlPtoAvAAj5s9vVIuKE3iLxMBgwDDucgX5-8u01AEJHDC34thbh-Ye4W0gaI9BFu-FNdBKM07WUSsFwhVt3CeIBAFYYQyQU-1vhM1OkB4N4s0KOBIVmq-VOnnqMwRGCXhVgGkMMF+xbw6RsSbwo8VtFE1i8vwx0YW0qwgo3gjSK-JQlGCDAhcSYLoH6J57B1jKUBAIBRlzI3BeUl7Ykt5EhT6l4hlgd4pnRMLedrKUBSxM8BP4QiRgMYU0XhEEzxh+W7wTVCeD9H-MbyYuZMTYGPDXAD4iYfflFW0EANqxfcGLg4xXKQcdOALKFgq1IiShl4SRVbIfRq7DgYYgOZ2IJz9HG4IA7ATMJmCLE2CFWuQwwErGpAGUkwtSGrhcE8KnBRM2A8obFzHFvY7O3gQ0WdWcrDAnK02feIukdRix3WuorkVik5SypCqgwXsDdywjuseeA1B8suLPzxgQwYwCWqaPpgwV1QzBfwCMAjTus1aDogCcpDkhOCcQJVcUH+3kjChOgyuF1AYCTSQTVeiYzzj5Xrp1IlEONQ8mSDGDHV8IYYHZCcFmp3jRxWnQetwz84VNjg7wRBs6hPDnsnhx1cSboDsCJZbgIrHtuc0nHtjoWG2cgjb2CAlV+wHE3yLHndLuAaMQQWPOsPab6tCmSbPtqmyXCEs5EAYBuGRXiySC8c7tBGMGFGBRjRwDnCDm0R85McRJbHawL0B6Ajl14cYJ0ou3FCN1Gx2uTBOZPvGCT76d2LcTuJS77iAJ51afFzkjB6Zf4coXpJ-BhQwoxYwQOZr5K86ZSKmYQcZqnnljuAt4G2N1jCK747d-xFTWWliBBSRD9hi7GrA6gVindRalgFXlXTV5EANeWvc3uJGFDyg3g14rTDLV7COEJQYQAyu5D9ytEl+O3c-mb3p7OwSQywsio8UzHaB14DqFCbb1XZn8WRJ6NkWMM5FoDzA02eaaECwhLT9+vHXoOKFFGwpQO+I--gTXIRT5D+jQPYfiHx5ihCeB8EMPBnYSkDuB5AiAOb0sDCkhQjiUwBHzThwpn0rfBcocxHEH1NKCYcIRYPCBAA */
	createMachine(
		{
			context: initialEncodingContext,
			tsTypes: {} as import('./b64Encode.typegen').Typegen0,
			schema: { context: {} as EncodingContext, events: {} as EncodingEvent },
			id: 'b64Encode',
			initial: 'inactive',
			states: {
				inactive: {
					entry: ['stopAutoPlay', 'resetContext'],
					after: {
						'10': {
							actions: 'clearResetFlag',
							cond: 'formResetRequested',
						},
					},
					on: {
						START_AUTOPLAY: {
							actions: 'startAutoPlay',
							target: 'validateInputText',
						},
						VALIDATE_TEXT: {
							target: 'validateInputText',
						},
						UPDATE_TEXT: {
							actions: 'validate',
						},
						SKIP_DEMO: {
							actions: 'setFlagSkipDemo',
							target: 'validateInputText',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'defaultSettingsChanged',
							target: 'inactive',
							internal: false,
						},
					},
				},
				validateInputText: {
					initial: 'validate',
					states: {
						validate: {
							entry: 'validate',
							always: [
								{
									cond: 'inputTextIsInvalid',
									target: 'error',
								},
								{
									actions: ['encode', 'generateBase64Maps', 'generateByteMaps'],
									cond: 'yesSkipDemo',
									target: 'validationComplete',
								},
								{
									actions: ['encode', 'generateBase64Maps', 'generateByteMaps'],
									target: 'success',
								},
							],
						},
						error: {
							after: {
								'1000': {
									target: '#b64Encode.inactive',
								},
							},
							on: {
								RESET: {
									actions: 'resetInput',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
							},
						},
						success: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'validationComplete',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'validationComplete',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'validationComplete',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'validationComplete',
								},
							},
						},
						validationComplete: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'encodeInput',
						},
					],
				},
				encodeInput: {
					initial: 'idle',
					states: {
						idle: {
							entry: 'resetRemainingBytes',
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'autoPlayEncodeByte',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayEncodeByte',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.validateInputText.success',
								},
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'encodeByte',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						autoPlayEncodeByte: {
							entry: 'getCurrentByte',
							after: {
								'1000': [
									{
										actions: 'mapNextByte',
										cond: 'bytesRemaining',
										target: 'autoPlayEncodeByte',
										internal: false,
									},
									{
										cond: 'noBytesRemaining',
										target: 'explainByteMapping',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
									target: 'encodeByte',
								},
							},
						},
						encodeByte: {
							entry: 'getCurrentByte',
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayEncodeByte',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousByte',
										cond: 'hasPreviousByte',
										target: 'encodeByte',
										internal: false,
									},
									{
										cond: 'allBytesRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										actions: 'mapNextByte',
										cond: 'bytesRemaining',
										target: 'encodeByte',
										internal: false,
									},
									{
										cond: 'noBytesRemaining',
										target: 'explainByteMapping',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						explainByteMapping: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'encodingComplete',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: 'encodeByte',
								},
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						encodingComplete: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'createInputChunks',
						},
					],
				},
				createInputChunks: {
					initial: 'idle',
					states: {
						idle: {
							entry: 'resetRemainingInputChunks',
							always: [
								{
									cond: 'autoPlayEnabled',
									target: 'autoPlayIdle',
								},
								{
									target: 'regularIdle',
								},
							],
						},
						autoPlayIdle: {
							after: {
								'1000': [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										target: 'autoPlayCreateInputChunk',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										target: 'createInputChunk',
									},
								],
							},
						},
						regularIdle: {
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayCreateInputChunk',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									actions: 'resetNoBytesRemaining',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.encodeInput.explainByteMapping',
								},
								GO_TO_NEXT_STEP: [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'autoPlayDisabled',
										target: 'createInputChunk',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
							},
						},
						autoPlayCreateInputChunk: {
							entry: 'getCurrentInputChunk',
							after: {
								'1000': [
									{
										actions: 'mapNextInputChunk',
										cond: 'inputChunksRemaining',
										target: 'autoPlayCreateInputChunk',
										internal: false,
									},
									{
										actions: 'mapNextInputChunk',
										cond: 'finalPaddedInputChunkRemaining',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'noInputChunksRemaining',
										target: 'createdAllInputChunks',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
									target: 'createInputChunk',
								},
							},
						},
						createInputChunk: {
							entry: 'getCurrentInputChunk',
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayCreateInputChunk',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousInputChunk',
										cond: 'hasPreviousInputChunk',
										target: 'createInputChunk',
										internal: false,
									},
									{
										cond: 'allInputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										actions: 'mapNextInputChunk',
										cond: 'inputChunksRemaining',
										target: 'createInputChunk',
										internal: false,
									},
									{
										actions: 'mapNextInputChunk',
										cond: 'finalPaddedInputChunkRemaining',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'noInputChunksRemaining',
										target: 'createdAllInputChunks',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
							},
						},
						explainLastPaddedChunk: {
							entry: 'getCurrentInputChunk',
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'createLastPaddedChunk',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'createLastPaddedChunk',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousInputChunk',
										cond: 'hasPreviousInputChunk',
										target: 'createInputChunk',
									},
									{
										cond: 'allInputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'createLastPaddedChunk',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
							},
						},
						createLastPaddedChunk: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'createdAllInputChunks',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										cond: 'lastChunkIsPadded',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'allInputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
							},
						},
						createdAllInputChunks: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'createOutputChunks',
						},
					],
				},
				createOutputChunks: {
					initial: 'idle',
					states: {
						idle: {
							entry: 'resetRemainingOutputChunks',
							always: [
								{
									cond: 'autoPlayEnabled',
									target: 'autoPlayIdle',
								},
								{
									target: 'regularIdle',
								},
							],
						},
						autoPlayIdle: {
							after: {
								'1000': [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										target: 'autoPlayCreateOutputChunk',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										target: 'createOutputChunk',
									},
								],
							},
						},
						regularIdle: {
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayCreateOutputChunk',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'resetNoInputChunksRemaining',
										cond: 'currentInputChunkIsPadded',
										target: '#b64Encode.createInputChunks.createLastPaddedChunk',
									},
									{
										actions: 'resetNoInputChunksRemaining',
										cond: 'autoPlayDisabled',
										target: '#b64Encode.createInputChunks.createInputChunk',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'autoPlayDisabled',
										target: 'createOutputChunk',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						autoPlayCreateOutputChunk: {
							entry: 'getCurrentOutputChunk',
							after: {
								'1000': [
									{
										actions: 'mapNextOutputChunk',
										cond: 'outputChunksRemaining',
										target: 'autoPlayCreateOutputChunk',
										internal: false,
									},
									{
										actions: 'mapNextOutputChunk',
										cond: 'finalPaddedOutputChunkRemaining',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'noOutputChunksRemaining',
										target: 'createdAllOutputChunks',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
									target: 'createOutputChunk',
								},
							},
						},
						createOutputChunk: {
							entry: 'getCurrentOutputChunk',
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayCreateOutputChunk',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousOutputChunk',
										cond: 'hasPreviousOutputChunk',
										target: 'createOutputChunk',
										internal: false,
									},
									{
										cond: 'allOutputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										actions: 'mapNextOutputChunk',
										cond: 'outputChunksRemaining',
										target: 'createOutputChunk',
										internal: false,
									},
									{
										actions: 'mapNextOutputChunk',
										cond: 'finalPaddedOutputChunkRemaining',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'noOutputChunksRemaining',
										target: 'createdAllOutputChunks',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						explainLastPaddedChunk: {
							entry: 'getCurrentOutputChunk',
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'explainPadCharacter',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'explainPadCharacter',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousOutputChunk',
										cond: 'hasPreviousOutputChunk',
										target: 'createOutputChunk',
									},
									{
										cond: 'allOutputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'explainPadCharacter',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						explainPadCharacter: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'createLastPaddedChunk',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'createLastPaddedChunk',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: 'explainLastPaddedChunk',
								},
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'createLastPaddedChunk',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						createLastPaddedChunk: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'createdAllOutputChunks',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										cond: 'lastChunkIsPadded',
										target: 'explainPadCharacter',
									},
									{
										cond: 'allOutputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						createdAllOutputChunks: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'encodeOutput',
						},
					],
				},
				encodeOutput: {
					initial: 'idle',
					states: {
						idle: {
							entry: 'resetRemainingBase64Chars',
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'autoPlayEncodeBase64',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayEncodeBase64',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'resetNoOutputChunksRemaining',
										cond: 'currentOutputChunkIsPadded',
										target: '#b64Encode.createOutputChunks.createLastPaddedChunk',
									},
									{
										actions: 'resetNoOutputChunksRemaining',
										cond: 'autoPlayDisabled',
										target: '#b64Encode.createOutputChunks.createOutputChunk',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'encodeBase64',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						autoPlayEncodeBase64: {
							entry: 'getCurrentBase64Char',
							after: {
								'1000': [
									{
										actions: 'mapNextBase64Char',
										cond: 'base64CharsRemaining',
										target: 'autoPlayEncodeBase64',
										internal: false,
									},
									{
										cond: 'noBase64CharsRemaining',
										target: 'encodingComplete',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
									target: 'encodeBase64',
								},
							},
						},
						encodeBase64: {
							entry: 'getCurrentBase64Char',
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayEncodeBase64',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousBase64Char',
										cond: 'hasPreviousBase64Char',
										target: 'encodeBase64',
										internal: false,
									},
									{
										cond: 'allBase64CharsRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										actions: 'mapNextBase64Char',
										cond: 'base64CharsRemaining',
										target: 'encodeBase64',
										internal: false,
									},
									{
										cond: 'noBase64CharsRemaining',
										target: 'encodingComplete',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						encodingComplete: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'verifyResults',
						},
					],
				},
				verifyResults: {
					entry: 'updateContextForLastStep',
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'finished',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'finished',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: 'inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: 'inactive',
						},
						GO_TO_PREV_STEP: {
							actions: 'resetNoBase64CharsRemaining',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.encodeOutput.encodeBase64',
						},
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'finished',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'finished',
						},
					},
				},
				finished: {
					after: {
						'10': {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
					},
					on: {
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: 'inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: 'inactive',
						},
						GO_TO_PREV_STEP: {
							cond: 'autoPlayDisabled',
							target: 'verifyResults',
						},
					},
				},
			},
		},
		{
			actions: {
				resetContext: assign({
					resetForm: (context: EncodingContext) => context.resetForm,
					autoplay: false,
					skipDemo: false,
					byteMaps: [defaultHexByteMap],
					updatedByteMaps: [],
					byteIndex: 0,
					currentByte: defaultHexByteMap,
					remainingBytes: 0,
					updatedInputChunks: [],
					inputChunkIndex: 0,
					currentInputChunk: defaultEncoderInputChunk,
					remainingInputChunks: 0,
					updatedOutputChunks: [],
					outputChunkIndex: 0,
					currentOutputChunk: defaultOutputChunk,
					remainingOutputChunks: 0,
					base64Maps: [defaultBase64ByteMap],
					updatedBase64Maps: [],
					base64CharIndex: 0,
					currentBase64Char: defaultBase64ByteMap,
					remainingBase64Chars: 0,
					input: (context: EncodingContext) => context.input,
					output: defaultEncoderOutput,
				}),
				resetInput: assign({
					resetForm: (_) => true,
					input: (_) => defaultEncoderInput,
				}),
				clearResetFlag: assign({ resetForm: (_) => false }),
				startAutoPlay: assign({ autoplay: (_) => true }),
				stopAutoPlay: assign({ autoplay: (_) => false }),
				setFlagSkipDemo: assign({ skipDemo: (_) => true }),
				validate: assign({
					input: (_: EncodingContext, event: EncodingEvent) => {
						if (
							event.type === 'VALIDATE_TEXT' ||
							event.type === 'UPDATE_TEXT' ||
							event.type === 'START_AUTOPLAY' ||
							event.type === 'SKIP_DEMO'
						) {
							return validateEncoderInput(event.inputText, event.inputEncoding, event.outputEncoding);
						}
					},
				}),
				encode: assign({
					inputChunkIndex: 0,
					remainingInputChunks: (context: EncodingContext) => context.input.totalChunks,
					output: (context: EncodingContext) => {
						if (context.input.validationResult.success) {
							return b64Encode(context.input);
						}
					},
				}),
				getCurrentByte: assign({
					currentByte: (context: EncodingContext) => context.byteMaps[context.byteIndex],
					updatedByteMaps: (context: EncodingContext) => context.byteMaps.slice(0, context.byteIndex + 1),
				}),
				generateByteMaps: assign({
					byteMaps: (context: EncodingContext) => {
						if (isTextEncoding(context.input.inputEncoding)) {
							return context.output.utf8.hexMap;
						} else {
							return context.input.chunks.map((chunk) => chunk.inputMap.map((map) => map)).flat();
						}
					},
					updatedByteMaps: (_) => [],
				}),
				resetRemainingBytes: assign({
					byteIndex: (_) => 0,
					updatedByteMaps: (_) => [],
					currentByte: (_) => defaultHexByteMap,
					remainingBytes: (context: EncodingContext) => context.byteMaps.length - 1,
				}),
				resetNoBytesRemaining: assign({
					byteIndex: (context: EncodingContext) => context.byteMaps.length - 1,
					remainingBytes: (_) => 0,
				}),
				mapNextByte: assign({
					byteIndex: (context: EncodingContext) => context.byteIndex + 1,
					remainingBytes: (context: EncodingContext) => context.remainingBytes - 1,
				}),
				mapPreviousByte: assign({
					byteIndex: (context: EncodingContext) => context.byteIndex - 1,
					remainingBytes: (context: EncodingContext) => context.remainingBytes + 1,
				}),
				getCurrentInputChunk: assign({
					currentInputChunk: (context: EncodingContext) => context.input.chunks[context.inputChunkIndex],
					updatedInputChunks: (context: EncodingContext) => context.input.chunks.slice(0, context.inputChunkIndex + 1),
				}),
				resetRemainingInputChunks: assign({
					updatedInputChunks: (_) => [],
					inputChunkIndex: (_) => 0,
					currentInputChunk: (_) => defaultEncoderInputChunk,
					remainingInputChunks: (context: EncodingContext) => context.input.totalChunks - 1,
				}),
				resetNoInputChunksRemaining: assign({
					inputChunkIndex: (context: EncodingContext) => context.input.totalChunks - 1,
					remainingInputChunks: (_) => 0,
				}),
				mapNextInputChunk: assign({
					inputChunkIndex: (context: EncodingContext) => context.inputChunkIndex + 1,
					remainingInputChunks: (context: EncodingContext) => context.remainingInputChunks - 1,
				}),
				mapPreviousInputChunk: assign({
					inputChunkIndex: (context: EncodingContext) => context.inputChunkIndex - 1,
					remainingInputChunks: (context: EncodingContext) => context.remainingInputChunks + 1,
				}),
				getCurrentOutputChunk: assign({
					currentOutputChunk: (context: EncodingContext) => context.output.chunks[context.outputChunkIndex],
					updatedOutputChunks: (context: EncodingContext) =>
						context.output.chunks.slice(0, context.outputChunkIndex + 1),
				}),
				resetRemainingOutputChunks: assign({
					updatedOutputChunks: (_) => [],
					outputChunkIndex: (_) => 0,
					currentOutputChunk: (_) => defaultOutputChunk,
					remainingOutputChunks: (context: EncodingContext) => context.input.totalChunks - 1,
				}),
				resetNoOutputChunksRemaining: assign({
					outputChunkIndex: (context: EncodingContext) => context.input.totalChunks - 1,
					remainingOutputChunks: (_) => 0,
				}),
				mapNextOutputChunk: assign({
					outputChunkIndex: (context: EncodingContext) => context.outputChunkIndex + 1,
					remainingOutputChunks: (context: EncodingContext) => context.remainingOutputChunks - 1,
				}),
				mapPreviousOutputChunk: assign({
					outputChunkIndex: (context: EncodingContext) => context.outputChunkIndex - 1,
					remainingOutputChunks: (context: EncodingContext) => context.remainingOutputChunks + 1,
				}),
				getCurrentBase64Char: assign({
					currentBase64Char: (context: EncodingContext) => context.base64Maps[context.base64CharIndex],
					updatedBase64Maps: (context: EncodingContext) => context.base64Maps.slice(0, context.base64CharIndex + 1),
				}),
				generateBase64Maps: assign({
					base64Maps: (context: EncodingContext) =>
						context.output.chunks.map((chunk) => chunk.base64Map.map((map) => map)).flat(),
					updatedBase64Maps: (_) => [],
				}),
				resetRemainingBase64Chars: assign({
					base64CharIndex: (_) => 0,
					updatedBase64Maps: (_) => [],
					currentBase64Char: (_) => defaultBase64ByteMap,
					remainingBase64Chars: (context: EncodingContext) => context.base64Maps.length - 1,
				}),
				resetNoBase64CharsRemaining: assign({
					base64CharIndex: (context: EncodingContext) => context.base64Maps.length - 1,
					remainingBase64Chars: (_) => 0,
				}),
				mapNextBase64Char: assign({
					base64CharIndex: (context: EncodingContext) => context.base64CharIndex + 1,
					remainingBase64Chars: (context: EncodingContext) => context.remainingBase64Chars - 1,
				}),
				mapPreviousBase64Char: assign({
					base64CharIndex: (context: EncodingContext) => context.base64CharIndex - 1,
					remainingBase64Chars: (context: EncodingContext) => context.remainingBase64Chars + 1,
				}),
				updateContextForLastStep: assign({
					updatedByteMaps: (context: EncodingContext) => context.byteMaps.slice(0),
					updatedInputChunks: (context: EncodingContext) => context.input.chunks.slice(0),
					updatedOutputChunks: (context: EncodingContext) => context.output.chunks.slice(0),
					updatedBase64Maps: (context: EncodingContext) => context.base64Maps.slice(0),
					byteIndex: (context: EncodingContext) => context.byteMaps.length - 1,
					inputChunkIndex: (context: EncodingContext) => context.input.chunks.length - 1,
					outputChunkIndex: (context: EncodingContext) => context.output.chunks.length - 1,
					base64CharIndex: (context: EncodingContext) => context.base64Maps.length - 1,
					currentByte: (context: EncodingContext) => context.byteMaps[context.byteMaps.length - 1],
					currentInputChunk: (context: EncodingContext) => context.input.chunks[context.input.chunks.length - 1],
					currentOutputChunk: (context: EncodingContext) => context.output.chunks[context.output.chunks.length - 1],
					currentBase64Char: (context: EncodingContext) => context.base64Maps[context.base64Maps.length - 1],
					remainingInputChunks: (_) => 0,
				}),
			},
			guards: {
				defaultSettingsChanged: (context: EncodingContext) =>
					context.input.inputText !== '' ||
					context.input.inputEncoding !== 'ASCII' ||
					context.input.outputEncoding !== 'base64',
				formResetRequested: (context: EncodingContext) => context.resetForm,
				autoPlayEnabled: (context: EncodingContext) => context.autoplay,
				autoPlayDisabled: (context: EncodingContext) => !context.autoplay,
				yesSkipDemo: (context: EncodingContext) => context.skipDemo,
				inputTextIsInvalid: (context: EncodingContext) => !context.input.validationResult.success,
				bytesRemaining: (context: EncodingContext) => context.remainingBytes > 0,
				noBytesRemaining: (context: EncodingContext) => context.remainingBytes === 0,
				allBytesRemaining: (context: EncodingContext) => context.remainingBytes + 1 === context.byteMaps.length,
				hasPreviousByte: (context: EncodingContext) => context.byteIndex > 0,
				inputChunksRemaining: (context: EncodingContext) =>
					context.input.lastChunkPadded ? context.remainingInputChunks > 1 : context.remainingInputChunks > 0,
				lastChunkIsPadded: (context: EncodingContext) => !context.autoplay && context.input.lastChunkPadded,
				finalPaddedInputChunkRemaining: (context: EncodingContext) =>
					(context.remainingInputChunks === 1 && context.input.lastChunkPadded) || false,
				onlyOnePaddedChunk: (context: EncodingContext) =>
					context.input.totalChunks === 1 && context.input.lastChunkPadded,
				noInputChunksRemaining: (context: EncodingContext) => context.remainingInputChunks === 0,
				allInputChunksRemaining: (context: EncodingContext) =>
					context.remainingInputChunks + 1 === context.input.totalChunks,
				currentInputChunkIsPadded: (context: EncodingContext) =>
					!context.autoplay && context.currentInputChunk.bytes.length !== 3,
				hasPreviousInputChunk: (context: EncodingContext) => !context.autoplay && context.inputChunkIndex > 0,
				outputChunksRemaining: (context: EncodingContext) =>
					context.input.lastChunkPadded ? context.remainingOutputChunks > 1 : context.remainingOutputChunks > 0,
				finalPaddedOutputChunkRemaining: (context: EncodingContext) =>
					(context.remainingOutputChunks === 1 && context.input.lastChunkPadded) || false,
				noOutputChunksRemaining: (context: EncodingContext) => context.remainingOutputChunks === 0,
				allOutputChunksRemaining: (context: EncodingContext) =>
					!context.autoplay && context.remainingOutputChunks + 1 === context.input.totalChunks,
				currentOutputChunkIsPadded: (context: EncodingContext) =>
					!context.autoplay && context.currentOutputChunk.bytes.length !== 3,
				hasPreviousOutputChunk: (context: EncodingContext) => !context.autoplay && context.outputChunkIndex > 0,
				base64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars > 0,
				noBase64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars === 0,
				allBase64CharsRemaining: (context: EncodingContext) =>
					context.remainingBase64Chars + 1 === context.base64Maps.length,
				hasPreviousBase64Char: (context: EncodingContext) => context.base64CharIndex > 0,
			},
		},
	);
