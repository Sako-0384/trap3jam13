import {Game} from "./Game";
import {State} from "./State";
import {NumberButton} from "./NumberButton";
import * as pixi from "pixi.js"
import {GameoverGameState} from "./GameoverGameState";

export class MainGameState extends State<Game> {
    get numbers(): Array<NumberButton> {
        return this._numbers;
    }

    private _numbers: Array<NumberButton>;

    private _scoreText: pixi.Text;

    constructor(game: Game) {
        super(game);
        this._numbers = [];
    }

    private _addCountDown: number;
    private _currentNumber: number;
    private _sumTick: number;

    onLeave() {

    }

    onEnter() {
        this._currentNumber = 0;
        this._sumTick = 0;
        this._addCountDown = 100;
        var number = new NumberButton(this, this._currentNumber, Math.random() * (this.obj.app.renderer.width - 48), Math.random() * (this.obj.app.renderer.height - 48));
        this._currentNumber += 1;
        this._currentNumber %= 10;
        this.obj.score = 0;
        this.numbers.push(number);
        this.obj.app.stage.addChild(number.sprite());

        this._scoreText = new pixi.Text(
            `${this.obj.score}`, {
                fontFamily: "Futura",
                fontSize: this.obj.app.renderer.width / 2,
                fill: 0x999999,
                align: 'center'
            }
        );
        this._scoreText.alpha = 0.3;
        this._scoreText.anchor.x = 0.5;
        this._scoreText.anchor.y = 0.5;
        this._scoreText.position.x = this.obj.app.renderer.width * 0.5;
        this._scoreText.position.y = this.obj.app.renderer.height * 0.5;
        this.obj.app.stage.addChild(this._scoreText);
    }

    update(delta: number) {
        this._addCountDown -= delta;
        this._sumTick += delta;
        if (this._addCountDown <= 0) {
            this.resetCountDown();
            var number = new NumberButton(this, this._currentNumber, Math.random() * (this.obj.app.renderer.width - 48), Math.random() * (this.obj.app.renderer.height - 48));
            this._currentNumber += 1;
            this._currentNumber %= 10;
            this.numbers.push(number);
            this.obj.app.stage.addChild(number.sprite());
        }
    }

    public deleteTopButton() {
        this.obj.score = this.obj.score + 1;
        var number = this._numbers.shift();
        this.obj.app.stage.removeChild(number.sprite());
        this._scoreText.text = `${this.obj.score}`;
        if (this._numbers.length <= 0) {
            this.resetCountDown();
            var newNumber = new NumberButton(this, this._currentNumber, Math.random() * (this.obj.app.renderer.width - 48), Math.random() * (this.obj.app.renderer.height - 48));
            this._currentNumber += 1;
            this._currentNumber %= 10;
            this.numbers.push(newNumber);
            this.obj.app.stage.addChild(newNumber.sprite());
        }
    }

    public gameOver() {
        console.log(this._numbers);
        this.obj.state = new GameoverGameState(this.obj, this._numbers, this._scoreText);
    }

    private resetCountDown() {
        this._addCountDown = 100 * Math.exp(-0.0005 * this._sumTick / Math.max(this._numbers.length, 1));
    }
}
