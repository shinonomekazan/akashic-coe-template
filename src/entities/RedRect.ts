export interface RedRectParameters {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	local?: boolean;
}

export default class extends g.FilledRect {
	constructor(scene: g.Scene, p?: RedRectParameters) {
		super({
			scene,
			width: p?.width ?? 32,
			height: p?.height ?? 32,
			cssColor: "#ff0000",
			x: p?.x,
			y: p?.y,
			local: p?.local,
		});
	}
}
