var body = document.querySelector("body");

class game {

    /**
         * @param {Number} idTabla id de la tabla
         * @param {Array} fichas Fichas dentro de la tabla (objetos)
         * @param {Number} celdaVaciaX Posición X del hueco
         * @param {Number} celdaVaciaY Posición Y del hueco
    */

    constructor() {
        this.idTabla = (Math.floor(Math.random() * 100));
        this.fichas = this.generarFichas();
    }

    /* ------ GENERACIÓN DE TABLERO Y CONTROL DEL MODELO ------ */
    start() {
        this.startTime = new Date();

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
        // TABLERO
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

        // BOTONES
        let botonSolucionar = document.createElement("button");
        botonSolucionar.innerHTML = "SOLUCIÓN";
        botonSolucionar.addEventListener("click", this.solucionar)

        body.appendChild(botonSolucionar);
    }

    prepararHueco() {
        this.hueco = document.getElementById("ficha0");

        // Limpiar todos los event listeners
        this.tablero.forEach(row => {
            row.forEach(cell => {
                cell.removeEventListener("dragover", this.handleDragover)
                cell.removeEventListener("drop", this.handleDrop)
            })
        });

        document.getElementById("ficha0").addEventListener("dragover", this.handleDragover)
        document.getElementById("ficha0").addEventListener("dragleave", this.handleDragLeave)
        document.getElementById("ficha0").addEventListener("drop", this.handleDrop)
    }

    /*  PREPARARFICHAMOVIBLES
       · Busca las 4 a 2 fichas en contacto con el hueco y les añade los event
         listeners.
    */
    prepararFichasMovibles() {
        // Limpiar todos los event listeners
        this.tablero.forEach(row => {
            row.forEach(cell => {
                cell.removeEventListener("dragstart", this.handleDrag);
                cell.removeAttribute("draggable")
            })
        });

        // Preparar fichas adyacentes
        let posHueco = this.buscarFichaPorId("ficha0");

        if (posHueco[0] != 0) {
            this.tablero[(posHueco[0])-1][(posHueco[1])].setAttribute("draggable", "true");
            this.tablero[(posHueco[0])-1][(posHueco[1])].addEventListener("dragstart", this.handleDrag);
            this.tablero[(posHueco[0])-1][(posHueco[1])].addEventListener("dragend", this.handleDragEnd);
        }
        if (posHueco[0] != 3) {
            this.tablero[(posHueco[0])+1][(posHueco[1])].setAttribute("draggable", "true");
            this.tablero[(posHueco[0])+1][(posHueco[1])].addEventListener("dragstart", this.handleDrag);
            this.tablero[(posHueco[0])+1][(posHueco[1])].addEventListener("dragend", this.handleDragEnd);
        }
        if (posHueco[1] != 0) {
            this.tablero[(posHueco[0])][(posHueco[1])-1].setAttribute("draggable", "true");
            this.tablero[(posHueco[0])][(posHueco[1])-1].addEventListener("dragstart", this.handleDrag);
            this.tablero[(posHueco[0])][(posHueco[1])-1].addEventListener("dragend", this.handleDragEnd);
        }
        if (posHueco[1] != 3) {
            this.tablero[(posHueco[0])][(posHueco[1])+1].setAttribute("draggable", "true");
            this.tablero[(posHueco[0])][(posHueco[1])+1].addEventListener("dragstart", this.handleDrag);
            this.tablero[(posHueco[0])][(posHueco[1])+1].addEventListener("dragend", this.handleDragEnd);
        }

    }

    /* --------------------- UTILS ------------------------ */
    /* SOLUCIONAR */
    solucionar = ev => {
        let tabla = document.getElementById(this.idTabla);
        let imgS = tabla.querySelectorAll("img")

        for (let valor = 1; valor <= 15; valor++) {
            console.log(valor)
            imgS[valor-1].src = "./img/" + valor + ".gif";
        }

        imgS[15].src = "./img/0.gif";

        this.tiempoGastado()
    }

    /* COMPROBAR */
    comprobar() {
        // Orden que se tiene que dar para ganar (del 1 al 15 y un 0)
        let orden = []
        for(let i = 1; i <= 15; i++) {
            orden.push("ficha" + i)
        }
        orden.push("ficha0");

        // Comprobar
        this.tablero.forEach((row, indexRow) => {
            row.forEach((ficha, indiceFicha) => {
                let valorCorrecto = ((row * 4) + indiceFicha+1)
                if(ficha.id != orden[valorCorrecto]) {
                    // Estás aquí, hay que validar el tablero
                }
            })
        })
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

    /* TIEMPOGASTADO */
    tiempoGastado() {
        let mil = new Date - this.startTime;
        alert("Has tardado " + Math.floor(mil / 1000) + " segundos!");
    }

    /* --------------- FUNCIONES PARA DRAG ---------------- */
    handleDrag = ev => {
        ev.dataTransfer.setData("id", ev.srcElement.id)
        ev.dataTransfer.setData("src", ev.srcElement.src)
        ev.srcElement.classList.add("dragging");

    }

    handleDrop = ev => {
        ev.preventDefault();
        let elementDraggedInId = ev.dataTransfer.getData("id");
        let elementDraggedInSrc = ev.dataTransfer.getData("src");

        // Cambiar source por hueco
        let sourceElement = document.getElementById(elementDraggedInId);      
        sourceElement.id = ev.srcElement.id;
        sourceElement.src = ev.srcElement.src;

        // Cambiar hueco por la ficha:
        ev.srcElement.id = elementDraggedInId;
        ev.srcElement.src = elementDraggedInSrc;

        // Actualizar tablero
        this.prepararHueco();
        this.prepararFichasMovibles();

        document.getElementById("ficha0").classList.remove("over");


    }

    // Visuales
    handleDragover = ev => {
        ev.preventDefault();
        ev.srcElement.classList.add("over");
    }

    handleDragEnd = ev => {
        ev.preventDefault();
        ev.srcElement.classList.remove("dragging");
        // Un poco bestia lo de abajo pero me sirve por ahora
        document.querySelectorAll("img").forEach(element => {
            element.classList.remove("over")
        });
    }

    handleDragLeave = ev => {
        ev.preventDefault();
        ev.srcElement.classList.remove("over");
    }
}