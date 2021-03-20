import * as coe from "@akashic-extension/coe";

export interface AnswerEventData {
	// 回答種別
	type: "answer";
	answerType: "empty" | "text";
	playerName?: string;
}

export interface TextAnswerEventData extends AnswerEventData {
	answerType: "text";
	// 入力文字列
	text: string;
	// 解決文字列
	source?: string;
}

export interface EmptyAnswerEventData extends AnswerEventData {
	answerType: "empty";
}

export type GameActionData = TextAnswerEventData | EmptyAnswerEventData;

export type InputType = "button" | "text";

export interface InitGameCommand {
	type: "init";
	display: string;
	inputType: InputType;
}

export interface PlayHistory {
	playerId: string;
	playerName?: string | null;
	source?: string;
	point: number;
}

export interface AddHistoryCommand {
	type: "history";
	history: PlayHistory;
}

export interface SolvedCommand {
	type: "solved";
	finalHistory: PlayHistory;
}

export type GameCommand = InitGameCommand | AddHistoryCommand | SolvedCommand;

export interface GeneralControllerState {
	solved: boolean;
	currentPoint: number;
	histories: PlayHistory[];
}

export interface RequestMore {
	state: GeneralControllerState;
}

export type RestrictionType = "unique";

export interface Restriction {
	type: RestrictionType;
}

export interface ResolverParamtersBase {
	requestMore(): RequestMore;
	restrictions: Restriction[];
}

export interface CorrectWordResolverParameters extends ResolverParamtersBase {
	words: string[];
}

export interface RandomPointResolverParamerters extends ResolverParamtersBase {
	min: number;
	max: number;
}

export type ResolversParameters =
	| ResolverParamtersBase
	| CorrectWordResolverParameters
	| RandomPointResolverParamerters;

export interface Action extends coe.Action<GameActionData> {
	data: GameActionData;
}

export interface GameSceneParameters
	extends coe.SceneParameters<GameCommand, GameActionData> {}
