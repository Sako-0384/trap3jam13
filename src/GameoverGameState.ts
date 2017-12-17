import {State} from "./State";
import {Game} from "./Game";
import * as pixi from "pixi.js"
import {MainGameState} from "./MainGameState";
import {NumberButton} from "./NumberButton";

export class GameoverGameState extends State<Game> {
    private retryButton: pixi.Text;
    private tweetButton: pixi.Text;
    private _gameField: pixi.Container;
    private _scoreText: pixi.Text;

    onLeave() {
        this.obj.app.stage.removeChild(this.retryButton);
        this.obj.app.stage.removeChild(this.tweetButton);
        this._gameField.removeChildren();
        this.obj.app.stage.removeChild(this._gameField);
        this.obj.app.stage.removeChild(this._scoreText);
    }

    onEnter() {
        this.retryButton = new pixi.Text(
            "retry", {
                fontFamily: "Futura",
                fontSize: 72,
                fill: 0xf9f9f9,
                align: 'center'
            }
        );

        this.retryButton.anchor.x = 0.5;
        this.retryButton.anchor.y = 0.5;
        this.retryButton.position.x = this.obj.app.renderer.width * 0.25;
        this.retryButton.position.y = this.obj.app.renderer.height * 0.5;
        this.retryButton.interactive = true;
        this.retryButton.on("click", this.onRetryButtonClicked.bind(this));
        this.retryButton.on("touchstart", this.onRetryButtonClicked.bind(this));

        this.obj.app.stage.addChild(this.retryButton);

        this.tweetButton = new pixi.Text(
            "tweet", {
                fontFamily: "Futura",
                fontSize: 72,
                fill: 0xf9f9f9,
                align: 'center'
            }
        );

        this.tweetButton.anchor.x = 0.5;
        this.tweetButton.anchor.y = 0.5;
        this.tweetButton.position.x = this.obj.app.renderer.width * 0.75;
        this.tweetButton.position.y = this.obj.app.renderer.height * 0.5;
        this.tweetButton.interactive = true;
        this.tweetButton.on("click", this.onTweetButtonClicked.bind(this));
        this.tweetButton.on("touchstart", this.onTweetButtonClicked.bind(this));

        this.obj.app.stage.addChild(this.tweetButton);
    }

    onRetryButtonClicked() {
        this.obj.state = new MainGameState(this.obj);
    }

    onTweetButtonClicked() {
        const text = `あなたの実験のスコアは"${this.obj.score}"でした。 #さるのじっけん #traP3jam`;
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
        const win = window.open(url, '_blank');
        win.focus();
    }

    update(delta: number) {
    }

    constructor(game: Game, gameField: pixi.Container, scoreText: pixi.Text) {
        super(game);
        this._gameField = gameField;
        this._scoreText = scoreText;
    }
}
