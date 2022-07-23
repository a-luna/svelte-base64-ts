export type MappedLiteral<T extends string> = {
	[K in T]: boolean;
};

export type MappedStringLiteralPick<
	T extends string,
	K extends keyof MappedLiteral<T> = keyof MappedLiteral<T>,
> = keyof Pick<MappedLiteral<T>, K>;
