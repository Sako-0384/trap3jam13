import {State} from "./State";
import {Game} from "./Game";
import * as pixi from "pixi.js"
import {MainGameState} from "./MainGameState";

export class TitleGameState extends State<Game> {
    private titleButton: pixi.Text;

    onLeave() {
        this.obj.app.stage.removeChild(this.titleButton);
    }

    onEnter() {
        this.titleButton = new pixi.Text(
            "start", {
                fontFamily: "Futura",
                fontSize: 72,
                fill: 0xf9f9f9,
                align: 'center'
            }
        );

        this.titleButton.anchor.x = 0.5;
        this.titleButton.anchor.y = 0.5;
        this.titleButton.position.x = this.obj.app.renderer.width * 0.5;
        this.titleButton.position.y = this.obj.app.renderer.height * 0.5;
        this.titleButton.interactive = true;
        this.titleButton.on("click", () => {
            this.obj.state = new MainGameState(this.obj);
        });
        this.titleButton.on("touchstart", () => {
            this.obj.state = new MainGameState(this.obj);
        });

        this.obj.app.stage.addChild(this.titleButton);
    }

    update(delta: number) {
    }
    constructor(game: Game) {
        super(game);
    }
}
