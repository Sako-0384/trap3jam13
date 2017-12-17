import {State} from "./State";
import {Game} from "./Game";
import * as pixi from "pixi.js"
import {MainGameState} from "./MainGameState";
import {NumberButton} from "./NumberButton";

export class GameoverGameState extends State<Game> {
    private retryButton: pixi.Text;
    private tweetButton: pixi.Text;
    private _numbers: Array<NumberButton>;

    onLeave() {
        this.obj.app.stage.removeChild(this.retryButton);
        this.obj.app.stage.removeChild(this.tweetButton);
        this._numbers.forEach((v)=> {
            this.obj.app.stage.removeChild(v);
        })
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
        this.retryButton.on("click", () => {
            this.obj.state = new MainGameState(this.obj);
        });
        this.retryButton.on("touchstart", () => {
            this.obj.state = new MainGameState(this.obj);
        });

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
        this.tweetButton.on("click", () => {
            const text = `あなたの実験のスコアは"${this.obj.score}"でした。 #さるのじっけん #traP3jam`;
            const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
            const win = window.open(url, '_blank');
            win.focus();
        });
        this.tweetButton.on("touchstart", () => {
            const text = `あなたの実験のスコアは"${this.obj.score}"でした。 #さるのじっけん #traP3jam`;
            const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
            const win = window.open(url, '_blank');
            win.focus();
        });

        this.obj.app.stage.addChild(this.tweetButton);
    }

    update(delta: number) {
    }
    constructor(game: Game, numbers: Array<NumberButton>) {
        super(game);
    }
}
