import * as pixi from "pixi.js"
import {MainGameState} from "./MainGameState";

export class NumberButton {
    private x: number;
    private y: number;
    private n: number;
    private state: MainGameState;
    private cascadeCount: number;
    private e: pixi.Text;

    constructor(state: MainGameState, n: number, buttonSize: number, x: number, y: number) {
        this.n = n;
        this.x = x;
        this.y = y;
        this.e = new pixi.Text(`${this.n}`, {
            fontFamily: "Futura",
            fontSize: buttonSize,
            fill: 0xf9f9f9,
            align: 'center'
        });
        this.e.position.x = x;
        this.e.position.y = y;
        this.state = state;
        this.cascadeCount = 0;
    }

    public sprite() {
        return this.e;
    }
}