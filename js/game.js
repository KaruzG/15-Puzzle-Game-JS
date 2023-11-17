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

        this.displayTablero(this.generarTablero());
        this.prepararHueco();
        this.prepararFichasMovibles();
    }


    /* GENERARFICHAS
       · Genera 15 objetos de ficha en orden aleatorio de valor sin repetir
    */
    generarFichas() {
        // Las fichas serán almacenadas en un array "fichas"
        const fichas = [];
        for (let i = 0; i < 15; i++) {
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

        // Pone 4 fichas en cada array de tablero menos en 1 lugar
        let fichasCreadas = 0;
        tablero.forEach((row, index) => {
            for(let col = 0; col <= 3; col++) {
                if (index === celdaVacia[0] && col === celdaVacia[1]) {
                    let element = document.createElement("td")
                    let hueco = document.createElement("img");
                    hueco.src = "img/blanco.gif";
                    hueco.id = "hueco";
                    element.appendChild(hueco);

                    row[col] = hueco;
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

        tablero.forEach(row => {
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

        this.hueco.addEventListener("dragover", this.handleDragOver);
        this.hueco.addEventListener("dragenter", this.handleDragEnter);
        this.hueco.addEventListener("dragleave", this.handleDragLeave);
        this.hueco.addEventListener("drop", this.handleDrop);

        console.log("· Hueco preparado!");
    }

    /*  PREPARARFICHAMOVIBLES
       · Busca las 4 a 2 fichas en contacto con el hueco y les añade los event
         listeners.
    */
    prepararFichasMovibles() {
        this.fichas.forEach(ficha => { //Si está en contacto con el hueco:
            if      (ficha.posY == this.coordYHueco & (ficha.posX + 1) == this.coordXHueco) {
                ficha.element.classList += " draggable";
            }
            else if (ficha.posY == this.coordYHueco & (ficha.posX - 1) == this.coordXHueco) {
                ficha.element.classList += " draggable";
            }
            else if (ficha.posX == this.coordXHueco & (ficha.posY + 1) == this.coordYHueco) {
                ficha.element.classList += " draggable";
            }
            else if (ficha.posX == this.coordXHueco & (ficha.posY - 1) == this.coordYHueco) {
                ficha.element.classList += " draggable";
            }
        });

        let fichasMovibles = document.querySelectorAll("img.draggable"); 

        fichasMovibles.forEach(function(ficha) {
            ficha.addEventListener("dragstart", this.handleDragStart);
            ficha.addEventListener("dragover", this.handleDragOver);
            ficha.addEventListener("dragend", this.handleDragEnd);
            ficha.addEventListener("dragenter", this.handleDragEnter);
            ficha.addEventListener("dragleave", this.handleDragLeave);
            ficha.addEventListener("drop", this.handleDrop);
        });
    }

    /* --------------- FUNCIONES PARA DRAG --------------- */
    handleDragStart(e) {
        this.style.opacity = "0.4";
    
        dragSourceElement = this;
    
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("img/html", this.src);
    }
    
    handleDragEnd(e) {
        this.style.opacity = "1";
    }
    
    handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
    
        return false
    }
    
    handleDragEnter(e) {
        this.classList.add('over');
      }
    
    handleDragLeave(e) {
        this.classList.remove('over');
    }
    
    handleDrop(e) {
        console.log("Handle Drop: " + this.innerHTML)
        e.stopPropagation();
    
        if (dragSourceElement !== this) { // Intercambia los elementos
            dragSourceElement.src = this.src;
            this.src = e.dataTransfer.getData("img/html");
        }
    
        this.classList.remove('over');
        return false;
    }
}