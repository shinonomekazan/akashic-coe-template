import * as coe from "@akashic-extension/coe";
import * as components from "../components";
import * as types from "../types";
import * as utils from "../utils";
import * as al from "@akashic-extension/akashic-label";
import BaseScene from "./BaseScene";

declare function prompt(message?: string, _default?: string): string | null;

export default class extends BaseScene {
	font?: g.DynamicFont;

	globalState?: al.Label;

	localState?: al.Label;

	inputType?: string;

	constructor(params: types.GameSceneParameters) {
		super(utils.mergeAssetPaths(params, ["/assets/parts/buttons.png"]));
		this.globalState = undefined;
		this.localState = undefined;
	}

	handleLoad() {
		super.handleLoad();
		this.font = new g.DynamicFont({
			game: g.game,
			fontFamily: "sans-serif",
			size: 24,
		});
	}

	handleInitGameCommand(command: types.InitGameCommand) {
		super.handleInitGameCommand(command);

		while (this.histories.length > 0) {
			this.histories.pop();
		}

		this.inputType = command.inputType;

		const font = this.font;

		this.globalState = new al.Label({
			scene: this,
			font,
			fontSize: 24,
			textColor: "black",
			text: command.display,
			width: this.game.width - 16,
			parent: this,
			x: 8,
			y: 8,
		});

		this.localState = new al.Label({
			scene: this,
			font,
			fontSize: 18,
			textColor: "black",
			text: "",
			width: this.game.width,
			parent: this,
			x: 8,
			y: this.globalState.height + this.globalState.y + 8,
		});

		const button = new components.BasicButton({
			scene: this,
			src: this.asset.getImage("/assets/parts/buttons.png"),
			width: 34,
			height: 34,
			x: g.game.width / 2 - 34 / 2,
			y: g.game.height - 34 - 34 / 2,
			parent: this,
			quick: true,
		});
		button.clicked.add(this.hanldeInput, this);
	}

	updateLocalState(message: string) {
		this.localState.text = message;
		this.localState.invalidate();
	}

	getPlayerNameByHistory(history: types.PlayHistory) {
		return history.playerName ?? `p${history.playerId}`;
	}

	handleAddHistoryCommand(command: types.AddHistoryCommand) {
		super.handleAddHistoryCommand(command);
		const history = command.history;
		this.updateLocalState(
			`${this.getPlayerNameByHistory(history)} got ${
				history.point
			} point!`
		);
	}

	handleSolvedCommand(command: types.SolvedCommand) {
		super.handleSolvedCommand(command);
		this.updateLocalState(
			`Game solved by ${this.getPlayerNameByHistory(
				command.finalHistory
			)}!`
		);
	}

	hanldeInput() {
		switch (this.inputType) {
			case "text":
				return this.handleTextInput();
			case "button":
				return this.handleButtonInput();
			default:
				throw new Error(`Invalid input type: ${this.inputType}`);
		}
	}

	handleTextInput() {
		// Note: 仮
		if (typeof prompt === "undefined") {
			this.updateLocalState("Can not input text in this browser.");
			return;
		}
		const text = prompt("Please input text");
		if (!text) return;
		const action: types.TextAnswerEventData = {
			type: "answer",
			answerType: "text",
			text,
		};
		this.send(action);
	}

	handleButtonInput() {
		const action: types.EmptyAnswerEventData = {
			type: "answer",
			answerType: "empty",
		};
		this.send(action);
	}
}
