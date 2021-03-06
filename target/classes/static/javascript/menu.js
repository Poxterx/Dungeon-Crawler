class SceneMenu extends Phaser.Scene {
    /**
     * Escena que representa el menú del juego
     */
    constructor() {
        super({ key: "SceneMenu" });
    }
    /**
    * Cargamos las imágenes de los botones
    */
    preload() {
        //Fondo
        this.load.image("background", "assets/images/Menu_Principal/Background.png");
        //Carteles
        //Solo
        this.load.image("singlePlayer", "assets/images/Menu_Principal/Solo_Button.png");
        this.load.image("singlePlayerOn", "assets/images/Menu_Principal/Solo_ButtonOn.png");
        //Coop
        this.load.image("multiPlayer", "assets/images/Menu_Principal/Coop_Button.png");
        this.load.image("multiPlayerOn", "assets/images/Menu_Principal/Coop_ButtonOn.png");
        //Opciones
        this.load.image("options", "assets/images/Menu_Principal/Options_Button.png");
        this.load.image("optionsOn", "assets/images/Menu_Principal/Options_ButtonOn.png");
        //Exit
        this.load.image("exit", "assets/images/Menu_Principal/Exit_Button.png");
        this.load.image("exitOn", "assets/images/Menu_Principal/LuzExit.png");
        //Sombras
        this.load.image("shadowBackground", "assets/images/Menu_Principal/SombrasFinal.png");
        //Error
        this.load.image("disconect", "assets/images/Disconect.png");
    }
    /**
     * Método que cambia de imagen a la que se le pasa si entramos o salimos de ella
     */
    buttonAnimation(button, widthPos, heightPos) {
        switch (button) {
            case "singlePlayer":
                this.singlePlayerOn.setVisible(false);
                break;
            case "singlePlayerOn":
                this.singlePlayerOn.setVisible(true);
                break;
            case "multiPlayer":
                this.multiPlayerOn.setVisible(false);
                break;
            case "multiPlayerOn":
                this.multiPlayerOn.setVisible(true);
                break;
            case "options":
                this.optionsOn.setVisible(false);
                break;
            case "optionsOn":
                this.optionsOn.setVisible(true);
                break;
            case "exit":
                this.exitOn.setVisible(false);
                break;
            case "exitOn":
                this.exitOn.setVisible(true);
                break;
            default:
                break;
        }
    }
    /**
     * Inicializa la pantalla de menú
     */
    create() {
        // Obtenemos una forma más conveniente de referirnos a las dimensiones de la pantalla
        var screen = {
            width: this.game.config.width,
            height: this.game.config.height
        };
        // Creamos el menú
        this.add.image(screen.width * 0.5, screen.height * 0.5, "background");
        // Añadimos la imagen del disconect
        SceneGameDisconect.disconect = this.add.image(screen.width * 0.5, screen.height * 0.5, "disconect");
        SceneGameDisconect.disconect.setVisible(false);
        //Se guardan las dimensiones de la pantalla
        this.sWidth = screen.width;
        this.sHeight = screen.height;
        //Colocamos los botones
        //Situamos Singleplayer
        this.singlePlayer = this.add.image(this.sWidth * 0.25, this.sHeight * 0.5, "singlePlayer");
        this.singlePlayer.setScale(0.75);
        this.singlePlayer.setRotation(0.2617993878); //15º
        this.singlePlayer.setPosition(this.sWidth * 0.30, this.sHeight * 0.37);
        //Añadimos tambien su hover
        this.singlePlayerOn = this.add.image(this.sWidth * 0.25, this.sHeight * 0.5, "singlePlayerOn");
        this.singlePlayerOn.setScale(0.75);
        this.singlePlayerOn.setRotation(0.2617993878); //15º
        this.singlePlayerOn.setPosition(this.sWidth * 0.30, this.sHeight * 0.37);
        this.singlePlayerOn.setVisible(false);
        //Situamos Multiplayer
        this.multiPlayer = this.add.image(this.sWidth * 0.75, this.sHeight * 0.5, "multiPlayer");
        this.multiPlayer.setScale(0.75);
        this.multiPlayer.setRotation(-0.2617993878); //-15º
        //Añadimos tambien su hover
        this.multiPlayerOn = this.add.image(this.sWidth * 0.75, this.sHeight * 0.5, "multiPlayerOn");
        this.multiPlayerOn.setScale(0.75);
        this.multiPlayerOn.setRotation(-0.2617993878); //-15º
        this.multiPlayerOn.setVisible(false);
        //Situamos Options
        this.options = this.add.image(this.sWidth * 0.5, this.sHeight * 0.85, "options");
        this.options.setScale(0.75);
        this.options.setRotation(-0.7853981634); //-45º
        this.options.setPosition(this.sWidth * 0.35, this.sHeight * 1.01);
        //Añadimos su hover
        this.optionsOn = this.add.image(this.sWidth * 0.5, this.sHeight * 0.85, "optionsOn");
        this.optionsOn.setScale(0.75);
        this.optionsOn.setRotation(-0.7853981634); //-45º
        this.optionsOn.setPosition(this.sWidth * 0.35, this.sHeight * 1.01);
        this.optionsOn.setVisible(false);
        //Añadimos el exit arriba a la derecha
        this.exit = this.add.image(this.sWidth * 0.80, this.sHeight * 0.10, "exit");
        this.exit.setScale(0.75);
        //Añadimos tambien su hover
        this.exitOn = this.add.image(this.sWidth * 0.50, this.sHeight * 0.50, "exitOn");
        this.exitOn.setVisible(false);
        //Añadimos los detalles
        this.add.image(screen.width * 0.5, screen.height * 0.5, "shadowBackground");
        /**
        * Ponemos los siguientes eventos asociados a la imagen singlePlayer :
        * En caso de que se pulse se empieza a jugar
        * Si entramos o salimos de la imagen, esta se cambia
        */
        this.singlePlayer.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
            multiplayer = false;
            this.destroy();
            this.scene.stop("SceneMenu");
            this.scene.start("SceneOverworld");
        })
            .on('pointerover', () => this.buttonAnimation("singlePlayerOn", 0.25, 0.5))
            .on('pointerout', () => this.buttonAnimation("singlePlayer", 0.25, 0.5));
        /**
        * Ponemos los siguientes eventos asociados a la imagen multiPlayer:
        * En caso de que se pulse se empieza a jugar
        * Si entramos o salimos de la imagen, esta se cambia
        */
        this.multiPlayer.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
            multiplayer = true;
            this.destroy();
            this.scene.stop("SceneMenu");
            this.scene.start("SceneMultiplayerMenu");
        })
            .on('pointerover', () => this.buttonAnimation("multiPlayerOn", 0.75, 0.5))
            .on('pointerout', () => this.buttonAnimation("multiPlayer", 0.75, 0.5));
        /**
        * Ponemos los siguientes eventos asociados a la imagen Options:
        */
        this.options.setInteractive({ useHandCursor: true })
            //Sin Funcionalidad
            .on('pointerover', () => this.buttonAnimation("optionsOn", 0.75, 0.5))
            .on('pointerout', () => this.buttonAnimation("options", 0.75, 0.5));
        /**
        * Ponemos los siguientes eventos asociados a la imagen exit:
        * En caso de que se sale
        * Si entramos o salimos de la imagen, esta se cambia
        */
        this.exit.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
            this.destroy();
            this.scene.stop("SceneMenu");
            this.scene.start("SceneTitle");
            console.log("Boom");
        })
            .on('pointerover', () => this.buttonAnimation("exitOn", 0.75, 0.5))
            .on('pointerout', () => this.buttonAnimation("exit", 0.75, 0.5));
    }
    destroy() {
        this.singlePlayer.destroy();
        this.singlePlayerOn.destroy();
        this.multiPlayer.destroy();
        this.multiPlayerOn.destroy();
        this.options.destroy();
        this.optionsOn.destroy();
        this.exit.destroy();
        this.exitOn.destroy();
    }
}
//# sourceMappingURL=menu.js.map