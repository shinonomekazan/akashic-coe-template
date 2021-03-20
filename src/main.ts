import * as coe from "@akashic-extension/coe";
import * as types from "./types";
import * as controllers from "./controllers";
import * as scenes from "./scenes";

function main(param: g.GameMainParameterObject): void {
	coe.initialize({
		game: g.game,
		args: param,
	});
	// ランダムなポイント獲得を複数人でやる
	const controller: controllers.GameController = new controllers.GameController(
		{
			display:
				"This game cannot be cleared alone. Please cooperate with you and your friends to click the button.",
			inputType: "button",
			secret: {
				clearPoint: 150,
				resolvers: {
					parameters: {
						requestMore: () => {
							return {
								state: controller.state,
							};
						},
						restrictions: [{ type: "unique" }],
						max: 100,
						min: 20,
					} as types.ResolversParameters,
					pointResolver: "random",
				},
			},
		}
	);
	// 正解を一人が入力する
	/*
	const controller: controllers.GameController = new controllers.GameController(
		{
			display:
				"What is the name of the first president of the United States?",
			inputType: "text",
			secret: {
				clearPoint: 1,
				resolvers: {
					parameters: {
						requestMore: () => {
							return {
								state: controller.state,
							};
						},
						restrictions: [],
						words: ["abraham lincoln", "lincoln", "リンカーン"],
					} as types.ResolversParameters,
					pointResolver: "correctWord",
					sourceResolver: "lowerCase",
				},
			},
		}
	);
	*/
	const initialScene = new scenes.GameScene({
		controller,
		game: g.game,
	});
	const vars = g.game.vars as types.GameVars;
	vars.gameState = {
		score: 0,
	};
	vars.config = {};
	g.game.pushScene(initialScene);
}

export = main;
