import * as entities from "../entities";
import * as behaviors from "../behaviors";

export interface BasicButtonParameters extends entities.FrameButtonParameters {
	scene: g.Scene;
	parent: g.E | g.Scene;
	quick?: boolean;
	disabled?: boolean;
}

export interface ClickEvent {
	player: g.Player;
	local: boolean;
}

export default class {
	readonly view: entities.FrameButton;

	readonly clicked: g.Trigger<ClickEvent>;

	readonly behavior: behaviors.ClickableFrame;

	_disabled: boolean;

	constructor(p: BasicButtonParameters) {
		this.view = new entities.FrameButton(p.scene, p);
		this.view.touchable = true;
		this.clicked = new g.Trigger();
		this.behavior = new behaviors.ClickableFrame(this.view, 0, 1);
		if (p.quick == null) {
			this.view.onPointUp.add(this.onClicked, this);
		} else {
			this.view.onPointDown.add(this.onClicked, this);
		}
		this.view.touchable = true;
		this.behavior.activate();
		this._disabled = p.disabled ?? false;
	}

	onClicked(e: g.PointEvent) {
		if (this._disabled) {
			return;
		}
		this.clicked.fire({
			local: e.local,
			player: e.player,
		});
	}

	remove() {
		this.view.remove();
	}

	set disabled(value: boolean) {
		if (this._disabled === value) {
			return;
		}
		this._disabled = value;
		if (this._disabled) {
			this.behavior.deactivate();
			this.view.frameNumber = 2;
			this.view.modified();
		} else {
			this.behavior.activate();
			this.view.frameNumber = 0;
			this.view.modified();
		}
	}

	get disabled() {
		return this._disabled;
	}
}
