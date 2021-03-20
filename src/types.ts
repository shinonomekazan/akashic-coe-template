export * from "./coeTypes";

export interface GameConfig {}

export interface GameState {
	score: number;
}

export interface GameVars {
	gameState: GameState;
	config: GameConfig;
}

export interface MessageEventData {
	type: string;
}

export interface InputTextEventData extends MessageEventData {
	type: "text";
	text: string;
}

export interface TypedMessageEvent<T extends MessageEventData>
	extends g.MessageEvent {
	data: T;
}

export interface MessageEvent extends TypedMessageEvent<MessageEventData> {}

export interface InputTextEvent extends TypedMessageEvent<InputTextEventData> {}
