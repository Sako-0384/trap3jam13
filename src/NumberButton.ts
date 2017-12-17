import * as pixi from "pixi.js"
import {MainGameState} from "./MainGameState";

export class NumberButton {
    private x: number;
    private y: number;
    private n: number;
    private state: MainGameState;
    private cascadeCount: number;
    private e: pixi.Text;

    constructor(state: MainGameState, n: number, x: number, y: number) {
        this.n = n;
        this.x = x;
        this.y = y;
        this.e = new pixi.Text(`${this.n}`, {
            fontFamily: "Futura",
            fontSize: 48,
            fill: 0xf9f9f9,
            align: 'center'
        });
        this.e.position.x = x;
        this.e.position.y = y;
        this.e.interactive = true;
        this.e.on('click',this.onClick.bind(this));
        this.state = state;
        this.cascadeCount = 0;
    }

    public sprite() {
        return this.e;
    }

    private onClick() {
        if (this.state.numbers[0] === this) {
            this.state.deleteTopButton();
        } else {
            this.state.gameOver();
        }
    }
}