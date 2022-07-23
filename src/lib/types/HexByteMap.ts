import type { BitGroup } from '.';

export interface HexByteMap {
	byte: number;
	bin_word1: string;
	bin_word2: string;
	hex_word1: string;
	hex_word2: string;
	ascii: string;
	char?: string;
	isWhiteSpace?: boolean;
	groupId?: string;
	bitGroups?: BitGroup[];
	characterId?: string;
}
