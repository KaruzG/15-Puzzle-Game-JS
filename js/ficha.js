class ficha {

    /** Variables
     * @param {Number} valor Valor de la ficha
     * @param {String} img Src de la imagen
     * @param {Number} idTabla Tabla a la que pertenece la ficha
     * @param {Number} posX Posición en el eje X (-2 a 1)
     * @param {Number} posY Posición en el eje Y (-2 a 1)
     */

    constructor(valor, idTabla) {
        this.valor = valor;
        this.img = "./img/"+(valor)+".gif";
        this.idTabla = idTabla;
    }

    // Methods
    displayFicha(x, y) {
        let ficha = document.createElement("img");
        ficha.id = "ficha" + (this.valor);
        ficha.classList += "ficha";
        ficha.src = this.img;
        this.posX = x;
        this.posY = y;

        return ficha;
    }

    displayHueco(x, y) {
        let hueco = document.createElement("img");
        hueco.id = "hueco";
        hueco.classList += "ficha";
        hueco.src = this.img;
        this.posX = x;
        this.posY = y;

        return hueco;
    }
}