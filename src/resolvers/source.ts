import * as types from "../types";

export type SourceResolver = (
	params: types.ResolversParameters,
	action: types.Action
) => string | undefined;

export type SourceResolverType = "fullwidth" | "lowerCase";

function fullwidth(
	params: types.CorrectWordResolverParameters,
	action: types.Action
) {
	if (action.data.answerType !== "text") {
		return undefined;
	}
	return action.data.text.replace(/[A-Za-z0-9]/g, (s) =>
		String.fromCharCode(s.charCodeAt(0) + 0xfee0)
	);
}

function lowerCase(
	params: types.CorrectWordResolverParameters,
	action: types.Action
) {
	if (action.data.answerType !== "text") {
		return undefined;
	}
	return action.data.text.toLowerCase();
}

export function get(type: SourceResolverType): SourceResolver {
	switch (type) {
		case "fullwidth":
			return fullwidth;
		case "lowerCase":
			return lowerCase;
		default:
			throw new Error(`Invalid source resolver type: ${type}`);
	}
}

export function resolve(
	type: SourceResolverType,
	params: types.ResolversParameters,
	action: types.Action
) {
	return get(type)(params, action);
}
