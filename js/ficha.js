class ficha {

    /** Variables
     * @param {Number} valor Valor de la ficha
     * @param {String} img Src de la imagen
     * @param {Number} idTabla Tabla a la que pertenece la ficha
     * @param {Number} posX Posición en el eje X (-2 a 1)
     * @param {Number} posY Posición en el eje Y (-2 a 1)
     */

    constructor(valor, idTabla) {
        this.valor = valor+1;
        this.img = "./img/"+(valor+1)+".gif";
        this.idTabla = idTabla;
        this._posX = 0;
        this._posY = 0;
    }

    // Get
    get posX() {
        let eTabla = document.getElementById("" + this.idTabla);

        return this._posX;
    }

    // Set
    set posX(x) {
        this._posX = x;
    }

    // Methods
    displayFicha(x, y) {
        let ficha = document.createElement("img");
        ficha.id = "ficha" + (this.valor);
        ficha.classList += "ficha";
        ficha.src = this.img;
        this._posX = x;
        this._posY = y;
        this.element = ficha;

        return ficha;
    }
}