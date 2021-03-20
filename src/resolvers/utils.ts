import * as types from "../types";

export function containUserIdOnHistory(
	id: string,
	histories: types.PlayHistory[]
) {
	return histories.some((history) => history.playerId === id);
}

export function isDuplicateAnswer(
	params: types.ResolversParameters,
	action: types.Action
) {
	if (action.player.id == null) {
		// 謎のidが入った場合はduplicateとして扱う
		return true;
	}
	const histories = params.requestMore().state.histories;
	return containUserIdOnHistory(action.player.id, histories);
}
