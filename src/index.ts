import * as pixi from "pixi.js";
import {Game} from "./Game";

const app = new pixi.Application({
    width: window.innerWidth,
    height: window.innerHeight,
});

document.body.appendChild(app.view);

const game = new Game(app);

game.run();

