/**
* Clase contenedora de un lobby
*/
class Lobby {
    constructor(name, ID) {
        this.Nombre = name;
        this.integrantes = [];
        this.id = ID;
    }
    addUser(user) {
        this.integrantes.push(user);
    }
    deleteUser(user) {
        this.integrantes.splice(this.integrantes.indexOf(user));
    }
}
//# sourceMappingURL=lobby.js.map