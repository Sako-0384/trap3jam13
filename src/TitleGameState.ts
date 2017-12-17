import {State} from "./State";
import {Game} from "./Game";
import * as pixi from "pixi.js"
import {MainGameState} from "./MainGameState";

export class TitleGameState extends State<Game> {
    private titleButton: pixi.Text;
    private jamVersionButton: pixi.Text;

    onLeave() {
        this.obj.app.stage.removeChild(this.titleButton);
        this.obj.app.stage.removeChild(this.jamVersionButton);
    }

    onEnter() {
        this.titleButton = new pixi.Text(
            "start", {
                fontFamily: "Futura",
                fontSize: this.obj.app.renderer.width * 0.1,
                fill: 0xf9f9f9,
                align: 'center'
            }
        );
        this.jamVersionButton = new pixi.Text(
            'Play (fxxkin\' buggy) "#traP3jam" version.', {
                fontFamily: "Futura",
                fontSize: this.obj.app.renderer.width * 0.03,
                fill: 0xf9f9f9,
                align: 'center'
            }
        );

        this.titleButton.anchor.x = 0.5;
        this.titleButton.anchor.y = 0.5;
        this.titleButton.position.x = this.obj.app.renderer.width * 0.5;
        this.titleButton.position.y = this.obj.app.renderer.height * 0.5;
        this.titleButton.interactive = true;
        this.titleButton.on("click", this.onTitleButtonClicked.bind(this));
        this.titleButton.on("touchstart", this.onTitleButtonClicked.bind(this));

        this.obj.app.stage.addChild(this.titleButton);
        
        this.jamVersionButton.anchor.x = 0.5;
        this.jamVersionButton.anchor.y = 0.5;
        this.jamVersionButton.position.x = this.obj.app.renderer.width * 0.5;
        this.jamVersionButton.position.y = this.obj.app.renderer.height * 0.75;
        this.jamVersionButton.interactive = true;
        this.jamVersionButton.on("click", this.onJamVersionButtonClicked.bind(this));
        this.jamVersionButton.on("touchstart", this.onJamVersionButtonClicked.bind(this));

        this.obj.app.stage.addChild(this.jamVersionButton);
    }

    onJamVersionButtonClicked() {
        window.open("jam/index.html", "_self");
    }

    onTitleButtonClicked() {
        this.obj.state = new MainGameState(this.obj);
    }

    update(delta: number) {
    }

    constructor(game: Game) {
        super(game);
    }
}
