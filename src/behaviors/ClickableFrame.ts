export interface Frame {
	frameNumber: number;
	modifed: () => void;
}

export default class {
	readonly target: g.FrameSprite;

	readonly normalFrame: number;

	readonly clickFrame: number;

	constructor(
		target: g.FrameSprite,
		normalFrame: number,
		clickFrame: number
	) {
		this.target = target;
		this.normalFrame = normalFrame;
		this.clickFrame = clickFrame;
	}

	onPointDown() {
		this.target.frameNumber = this.clickFrame;
		this.target.modified();
	}

	onPointUp() {
		this.target.frameNumber = this.normalFrame;
		this.target.modified();
	}

	activate() {
		this.target.onPointDown.add(this.onPointDown, this);
		this.target.onPointUp.add(this.onPointUp, this);
	}

	deactivate() {
		this.target.onPointDown.remove(this.onPointDown, this);
		this.target.onPointUp.remove(this.onPointUp, this);
	}
}
