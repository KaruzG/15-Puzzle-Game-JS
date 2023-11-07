class ficha {

    /**
     * 
     * @param {Number} valor Valor de la ficha
     * @param {String} img Src de la imagen
     * @param {Number} posX Posición en el eje X (-2 a 2)
     * @param {Number} posY Posición en el eje Y (-2 a 2)
     */

    constructor(valor, posX, posY) {
        this.valor = valor;
        this.img = "./img/"+(valor+1)+".gif";
    }

    // Methods
    displayFicha() {
        console.log("Display!");
        return "<img id=\"ficha"+ (this.valor + 1) +"\" src=\""+ this.img +"\"</img>";
    }
}