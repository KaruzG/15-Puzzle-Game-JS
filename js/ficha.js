class ficha {

    /**
     * 
     * @param {Number} valor Valor de la ficha
     * @param {String} img Src de la imagen
     * @param {Number} posX Posición en el eje X (-2 a 1)
     * @param {Number} posY Posición en el eje Y (-2 a 1)
     */

    constructor(valor, posX, posY) {
        this.valor = valor+1;
        this.img = "./img/"+(valor+1)+".gif";
    }

    // Methods
    displayFicha(x, y) {
        let ficha = document.createElement("img");
        ficha.id = "ficha" + (this.valor + 1);
        ficha.classList += "ficha";
        ficha.src = this.img;
        this.posX = x;
        this.posY = y;
        this.elemento = ficha;
        return ficha;
    }
}