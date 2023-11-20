var body = document.querySelector("body");

/** Variables
     * @param {Number} idTabla id de la tabla
     * @param {Array} fichas Fichas dentro de la tabla (objetos)
     * 
     * @param {Number} celdaVaciaX Posición X del hueco
     * @param {Number} celdaVaciaY Posición Y del hueco
*/

class game {
    constructor() {
        this.idTabla = (Math.floor(Math.random() * 100));
        this.fichas = this.generarFichas();
    }

    start() {
        this.tablero = this.generarTablero()

        this.displayTablero();
        this.prepararHueco();
        this.prepararFichasMovibles();
    }


    /* GENERARFICHAS
       · Genera 15 objetos de ficha en orden aleatorio de valor sin repetir
    */
    generarFichas() {
        // Las fichas serán almacenadas en un array "fichas"
        const fichas = [];
        for (let i = 1; i < 16; i++) {
            fichas.push(new ficha(i, this.idTabla));
        }

        // Aleatorizar array (Algoritmo Durstenfeld shuffle)
        for (let i = fichas.length - 1; i > 0; i--) {
            const i2 = Math.floor(Math.random() * (i + 1));
            [fichas[i], fichas[i2]] = [fichas[i2], fichas[i]];
        };
    
        return fichas
    }

    /* GENERARTABLERO
       · Genera un array2D 4x4 con los elementos de fichas y el hueco. 
    */
    generarTablero() {
        // Array 2D que alamacenará la posición de cada ficha.
        const tablero = [[],[],[],[]];

        // Seleccionar aleatoriamente que celda queda vacía:
        const celdaVacia = [(Math.floor(Math.random() * 4)), (Math.floor(Math.random() * 4))];

        // Pone 4 fichas en cada array de tablero menos en 1 lugar que pone el hueco
        let fichasCreadas = 0;
        tablero.forEach((row, index) => {
            for(let col = 0; col <= 3; col++) {
                if (index === celdaVacia[0] && col === celdaVacia[1]) {
                    row[col] = new ficha(0, this.idTabla).displayFicha();
                } else {
                    row[col] = this.fichas[fichasCreadas].displayFicha();
                    fichasCreadas++
                }
            }
        });
        console.log(tablero);

        return tablero
    }

    /* DISPLAYTABLERO
       · Genera el elemento HTML a mostrar en la página.
    */
    displayTablero(tablero) {
        let elementoTablero = document.createElement("table"); // Tabla
        elementoTablero.id = this.idTabla;

        this.tablero.forEach(row => {
            let elementRow = document.createElement("tr"); // TR

            row.forEach(indiceDeRow => {
                let element = document.createElement("td"); // TD
                element.appendChild(indiceDeRow);
                elementRow.appendChild(element);
            }); 

            elementoTablero.appendChild(elementRow);
        });

        body.appendChild(elementoTablero);
    }

    /* BUSCARFICHA
        Busca una ficha por sus coordenadas (sin uso por ahora)
    */
    buscarFicha(x,y) {
        fichas.forEach(ficha => {
            if (ficha.coordX === x & ficha.coordY === y) {
                return ficha;
            } else {
                return false;
            }

            
        });
    }

    prepararHueco() {
        this.hueco = document.getElementById("hueco");



        console.log("· Hueco preparado!");
    }

    /*  PREPARARFICHAMOVIBLES
       · Busca las 4 a 2 fichas en contacto con el hueco y les añade los event
         listeners.
    */
    prepararFichasMovibles() {
        console.log(this.tablero[0][0]);
        this.tablero[0][0].setAttribute("draggable", "true")
        this.tablero[0][0].addEventListener("dragstart", this.handleDrag)
    }

    /* --------------- FUNCIONES PARA DRAG --------------- */
    handleDrag(ev) {
        console.log(this.outerHTML)
        let copy = this.outerHTML;
        document.appendChild(copy)
        ev.dataTransfer.setData("element", this.innerHTML)
    }

    handleDrop(ev) {

    }
}