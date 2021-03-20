import * as coe from "@akashic-extension/coe";
import * as types from "../types";
import * as utils from "../utils";
import * as resolvers from "../resolvers";

export interface SecretParameters {}

export interface GameControllerSecretParams {
	clearPoint: number;
	resolvers: {
		parameters: types.ResolversParameters;
		pointResolver: resolvers.point.PointResolverType;
		sourceResolver?: resolvers.source.SourceResolverType;
	};
}

export interface GameControllerParams {
	display: string;
	inputType: types.InputType;
	secret: GameControllerSecretParams;
}

export default class extends coe.COEController<
	types.GameCommand,
	types.GameActionData
> {
	readonly params: GameControllerParams;

	readonly state: types.GeneralControllerState;

	constructor(params: GameControllerParams) {
		super();
		this.params = params;
		this.state = {
			solved: false,
			histories: [],
			currentPoint: 0,
		};
		this.broadcast({
			type: "init",
			inputType: this.params.inputType,
			display: params.display,
		});
		this.actionReceived.add(this.onActionReceived, this);
	}

	onActionReceived(action: types.Action) {
		if (action.data == null) return;
		if (action.data.type !== "answer") return;
		if (this.state.solved) return;
		const answer = action.data as types.AnswerEventData;
		if (action.data.answerType === "text") {
			if (this.params.secret.resolvers.sourceResolver != null) {
				action.data.source = resolvers.source.resolve(
					this.params.secret.resolvers.sourceResolver,
					this.params.secret.resolvers.parameters,
					action
				);
			}
		}
		const point = resolvers.point.resolve(
			this.params.secret.resolvers.pointResolver,
			this.params.secret.resolvers.parameters,
			action
		);
		if (point > 0) {
			const history: types.PlayHistory = {
				playerId: action.player.id ?? "",
				point,
			};
			if (answer.playerName != null) {
				history.playerName = answer.playerName;
			}
			this.state.currentPoint += history.point;
			this.generatePlayHistory(history);
			this.checkAndSetSolved(history);
		}
	}

	generatePlayHistory(history: types.PlayHistory) {
		this.state.histories.push(history);
		this.broadcast({
			type: "history",
			history,
		});
	}

	checkAndSetSolved(history: types.PlayHistory) {
		if (this.state.currentPoint >= this.params.secret.clearPoint) {
			this.state.solved = true;
			this.broadcast({
				type: "solved",
				finalHistory: history,
			});
			// 最終的な解決をはたした場合、結果を外部に送信する
			utils.sendToExternal("solved", {
				finalHistory: history,
			});
		}
		return this.state.solved;
	}
}
