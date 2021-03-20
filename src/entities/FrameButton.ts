export interface FrameButtonParameters {
	src: g.ImageAsset | g.Surface;
	width: number;
	height: number;
	local?: boolean;
	x?: number;
	y?: number;
	frameNumber?: number;
	frames?: number[];
	parent?: g.E | g.Scene;
}

export default class extends g.FrameSprite {
	constructor(scene: g.Scene, p: FrameButtonParameters) {
		super({
			scene,
			src: p.src,
			width: p.width,
			height: p.height,
			frames: p.frames ?? [0, 1, 2],
			frameNumber: p.frameNumber ?? 0,
			x: p.x,
			y: p.y,
			local: p.local,
			parent: p.parent,
		});
	}
}
