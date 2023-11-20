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
    displayTablero() {
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
        Busca una ficha por sus coordenadas
    */
    buscarFichaPorId(id) {
        let ubicacion = [];

        this.tablero.some((row, indiceRow) => {
            row.some((element, indiceCol) => {
                if (element.id === id) {
                    ubicacion = [indiceRow, indiceCol]
                    return true
                }
            });
        });

        return ubicacion
    }

    prepararHueco() {
        this.hueco = document.getElementById("ficha0");

        document.getElementById("ficha0").addEventListener("dragover", this.handleDragover)
        document.getElementById("ficha0").addEventListener("drop", this.handleDrop)

        console.log("· Hueco preparado!");
    }

    /*  PREPARARFICHAMOVIBLES
       · Busca las 4 a 2 fichas en contacto con el hueco y les añade los event
         listeners.
    */
    prepararFichasMovibles() {
        this.tablero[0][0].setAttribute("draggable", "true")
        this.tablero[0][0].addEventListener("dragstart", this.handleDrag)
    }

    /* --------------- FUNCIONES PARA DRAG --------------- */
    handleDrag = ev => {
        ev.dataTransfer.setData("id", ev.srcElement.id)
        ev.dataTransfer.setData("src", ev.srcElement.src)
    }

    handleDrop = ev => {
        ev.preventDefault();
        let elementDraggedInId = ev.dataTransfer.getData("id");
        let elementDraggedInSrc = ev.dataTransfer.getData("src");
        
        // Actualizar tablero (MODEL) WIP
        let sourceElementPos = this.buscarFichaPorId(elementDraggedInId);
        let targetElementPos = this.buscarFichaPorId(ev.srcElement.id);
        console.log(sourceElementPos + " va a moverse a " + targetElementPos)

        // Te quedas aquí, cambiando el modelo. luego hay que hacer bien prepararHueco y prepararFichasMovibles
        [this.tablero[sourceElementPos[0]][sourceElementPos[1]], this.tablero[targetElementPos[0]][targetElementPos[1]] =  this.tablero[targetElementPos[0]][targetElementPos[1]], this.tablero[sourceElementPos[0]][sourceElementPos[1]]]


        // Cambiar source por hueco
        let sourceElement = document.getElementById(elementDraggedInId);      
        sourceElement.id = ev.srcElement.id;
        sourceElement.src = ev.srcElement.src;

        // Cambiar hueco por la ficha:
        ev.srcElement.id = elementDraggedInId;
        ev.srcElement.src = elementDraggedInSrc;



    }

    handleDragover(ev) {
        ev.preventDefault();
    }
}