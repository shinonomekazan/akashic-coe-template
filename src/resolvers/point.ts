import * as coe from "@akashic-extension/coe";
import * as types from "../types";
import * as resolverUtils from "./utils";

export type PointResolver = (
	params: types.ResolversParameters,
	action: types.Action
) => number;

export type PointResolverType = "random" | "correctWord";

export function restriction(
	params: types.ResolversParameters,
	action: types.Action
) {
	if (
		params.restrictions.some((restriction) => restriction.type === "unique")
	) {
		if (resolverUtils.isDuplicateAnswer(params, action)) {
			return 0;
		}
	}
	return undefined;
}

function random(
	params: types.RandomPointResolverParamerters,
	action: types.Action
) {
	const max = params.max - params.min + 1;
	console.log(params);
	return ((max * g.game.random.generate()) | 0) + params.min;
}

function correctWord(
	params: types.CorrectWordResolverParameters,
	action: types.Action
) {
	if (action.data.answerType !== "text") {
		return 0;
	}
	// 解決文字列または入力文字列で判定
	const source = action.data.source ?? action.data.text;
	if (params.words.some((word) => source === word)) {
		return 1;
	}
	return 0;
}

export function get(type: PointResolverType): PointResolver {
	switch (type) {
		case "random":
			return random;
		case "correctWord":
			return correctWord;
		default:
			throw new Error(`Invalid point resolver type: ${type}`);
	}
}

export function resolve(
	type: PointResolverType,
	params: types.ResolversParameters,
	action: types.Action
) {
	const restrictionPoint = restriction(params, action);
	if (restrictionPoint != null) {
		return restrictionPoint;
	}
	return get(type)(params, action);
}
