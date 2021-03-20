export function mergeAssetIds<T extends g.SceneParameterObject>(
	param: T,
	assetIds: (string | g.DynamicAssetConfiguration)[]
) {
	param.assetIds = assetIds;
	return param;
}

export function mergeAssetPaths<T extends g.SceneParameterObject>(
	param: T,
	assetPaths: string[]
) {
	param.assetPaths = assetPaths;
	return param;
}

export function sendToExternal(type: string, data: any) {
	if (g.game.external == null || g.game.external.send == null) {
		return;
	}
	return g.game.external.send({
		type,
		data,
	});
}
