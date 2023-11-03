class ficha {

    /**
     * 
     * @param {Number} valor Valor de la ficha
     * @param {String} img Src de la imagen
     */

    constructor(valor) {
        this.valor = valor;
        this.img = "./img/"+(valor)+".gif";
    }

    // Methods
    displayFicha() {
        return "<img id=\"ficha"+ valor +"\" src=\""+ img +"\"</img>";
    }
}