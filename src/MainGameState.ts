import {Game} from "./Game";
import {State} from "./State";
import {NumberButton} from "./NumberButton";
import * as pixi from "pixi.js"
import {GameoverGameState} from "./GameoverGameState";

export class MainGameState extends State<Game> {
    get numbers(): Array<NumberButton> {
        return this._numbers;
    }

    private _gameField: pixi.Container;

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
        this.obj.score = 0;

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

        this._gameField = new pixi.Container();
        this._gameField.interactive = true;
        this._gameField.on("click", this.onFieldClicked.bind(this));
        this._gameField.on("touchstart", this.onFieldClicked.bind(this));
        this._gameField.hitArea = new pixi.Rectangle(0, 0, this.obj.app.renderer.width, this.obj.app.renderer.height);

        const number = this.generateNewNumberButton();
        this.numbers.push(number);
        this._gameField.addChild(number.sprite());

        this.obj.app.stage.addChild(this._gameField);
    }

    update(delta: number) {
        this._addCountDown -= delta;
        this._sumTick += delta;
        if (this._addCountDown <= 0) {
            this.resetCountDown();
            const number = this.generateNewNumberButton();
            this.numbers.push(number);
            this._gameField.addChild(number.sprite());
        }
    }

    public deleteTopButton() {
        this.obj.score = this.obj.score + 1;
        var number = this._numbers.shift();
        this._gameField.removeChild(number.sprite());
        this._scoreText.text = `${this.obj.score}`;
        if (this._numbers.length <= 0) {
            this.resetCountDown();
            var newNumber = this.generateNewNumberButton();
            this.numbers.push(newNumber);
            this._gameField.addChild(newNumber.sprite());
        }
    }

    public gameOver() {
        this._gameField.interactive = false;
        this.obj.state = new GameoverGameState(this.obj, this._gameField, this._scoreText);
    }

    private resetCountDown() {
        this._addCountDown = 100 * Math.exp(-0.0005 * this._sumTick / Math.max(this._numbers.length, 1));
    }

    onFieldClicked(e) {
        const p = e.data.global;

        this._numbers.some((value, index) => {
            if (value.sprite().containsPoint(p)) {
                if (index === 0) {
                    this.deleteTopButton();
                } else {
                    this.gameOver();
                }

                return true;
            }

            return false;
        });
    }

    generateNewNumberButton() {
        const number = new NumberButton(
            this,
            this._currentNumber,
            this.buttonSize(),
            Math.random() * (this.obj.app.renderer.width - this.buttonSize()),
            Math.random() * (this.obj.app.renderer.height - this.buttonSize())
        );
        this._currentNumber += 1;
        this._currentNumber %= 10;
        return number;
    }

    buttonSize() {
        return Math.min(this.obj.app.renderer.width, this.obj.app.renderer.height) * 0.16;
    }
}
