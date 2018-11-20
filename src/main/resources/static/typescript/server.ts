class SceneServer extends Phaser.Scene {

    /**
     * Objeto de texto que guarda el nombre del host de la partida
     */
    private host :Phaser.GameObjects.Text;
    /**
     * Pinta en una escena los nombres de los usuarios
     */
    private us :UsersList;
    /**
     * Escena del servidor. Esta escena es la interfaz gráfica que tendrá la instancia
     * del juego ejecutándose como servidor, al menos hasta que empiece la partida.
     */
    constructor() {
        super({key: "SceneServer"});
        // Le pasamos la propia escena del servidor para que pinte en ella los nombres de los usuarios
        this.us = new UsersList(this);
    }

    /**
     * Inicializa los recursos de la escena.
     */
    create() {
        // Esta es la primera escena que ejecuta Phaser.
        // Si no es un servidor, entonces ir al título para poder jugar.
        if(!SERVER) {
            this.scene.start("SceneTitle");
            return;
        }
        
        // Obtenemos una forma más conveniente de referirnos a las dimensiones de la pantalla
        var screen = {
            width: this.game.config.width as number,
            height: this.game.config.height as number
        }
        // Creamos el texto del nombre del host
        this.host = this.add.text(0, 0, "", {
            fontFamily: "Arial",
            fontSize: 40
        });

       // Creamos la lista de usuarios
        this.us.create();

        // Cuando la conexión haya cargado, se puede añadir también la dirección del host
        var that = this;
        Connection.onInitialized(function() {
            that.host.text = "Host disponible en " + Connection.getHostAddress();
            that.us.startUpdating();

        // Colocamos el nombre del host arriba
        that.host.setPosition(screen.width * 0.5 - that.host.width * 0.5,
            screen.height * 0.15 - that.host.height * 0.5);
        });
    }
}