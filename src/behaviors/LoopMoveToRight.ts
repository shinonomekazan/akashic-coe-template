export default class {
	target: g.E;

	speed: number;

	constructor(target: g.E, speed?: number) {
		this.target = target;
		this.speed = speed ?? 1;
	}

	activate() {
		this.target.onUpdate.add(this.onUpdateHandler, this);
	}

	destroy() {
		this.target.onUpdate.remove(this.onUpdateHandler, this);
		this.target = undefined;
	}

	get targetWidth() {
		if (this.target.parent instanceof g.Scene) {
			return this.target.parent.game.width;
		}
		return this.target.parent.width;
	}

	onUpdateHandler() {
		const t = this.target;
		t.x += this.speed;
		if (t.x > this.targetWidth) t.x %= this.targetWidth;
		t.modified();
	}
}
