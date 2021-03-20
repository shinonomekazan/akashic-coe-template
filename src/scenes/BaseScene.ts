import * as coe from "@akashic-extension/coe";
import * as types from "../types";

export default class extends coe.Scene<
	types.GameCommand,
	types.GameActionData
> {
	readonly histories: types.PlayHistory[];

	constructor(params: types.GameSceneParameters) {
		super(params);

		this.histories = [];

		this.onLoad.addOnce(this.handleLoad, this);
		this.commandReceived.add(this.handleCommandReceived, this);
	}

	handleLoad() {}

	handleCommandReceived(command: types.GameCommand) {
		switch (command.type) {
			case "init":
				this.handleInitGameCommand(command);
				break;
			case "history":
				this.handleAddHistoryCommand(command);
				break;
			case "solved":
				this.handleSolvedCommand(command);
				break;
		}
	}

	handleInitGameCommand(command: types.InitGameCommand) {}

	handleAddHistoryCommand(command: types.AddHistoryCommand) {
		const history = command.history;
		this.histories.push(history);
	}

	handleSolvedCommand(command: types.SolvedCommand) {}
}
