import {State} from "./State";
import * as pixi from "pixi";
import {MainGameState} from "./MainGameState";
import {TitleGameState} from "./TitleGameState";

export class Game {
    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }
    private _score: number;

    get app(): pixi.Application {
        return this._app;
    }
    private _app: pixi.Application;
    constructor(app : pixi.Application) {
        this._app = app;
    }

    public get state(): State<Game> {
        return this._state;
    }

    public set state(value: State<Game>) {
        if (this._state) {
            this._state.onLeave();
        }
        this._state = value;
        this._state.onEnter();
    }

    private update(delta: number) {
        this._state.update(delta);
    }

    public run() {
        this._app.renderer.backgroundColor = 0x000000;
        this.state = new TitleGameState(this);
        this._app.ticker.add(this.update.bind(this));
    }

    private _state: State<Game>;
}