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
        this.crearTabla4x4();
        this.prepararHueco();
        this.prepararFichasMovibles();
    }

    crearTabla4x4() {
        // Seleccionar aleatoriamente que celda queda vacía:
        let celdaVaciaX = (Math.floor(Math.random() * 4 - 2)) ;
        let celdaVaciaY = (Math.floor(Math.random() * 4 - 2))    
    
        // Aleatorizar array (Algoritmo Durstenfeld shuffle)
        for (let i = this.fichas.length - 1; i > 0; i--) {
            const i2 = Math.floor(Math.random() * (i + 1));
            [this.fichas[i], this.fichas[i2]] = [this.fichas[i2], this.fichas[i]];
        }    
    
        // Genera una tabla con sus tr y td y se inicializa un objeto ficha cada td menos
        // en el lugar aleatorio anteriormente calculado.
        let tabla4x4 = document.createElement("table"); // Tabla
        tabla4x4.id = this.idTabla;
        
        let fichasCreadas = 0;
        for (let columnasCreadas = 1; columnasCreadas <= 4; columnasCreadas++) { // Aquí se va recorriendo cada fila y añadiendo los elementos
            let row = document.createElement("tr"); // TR
    
            for (let filasCreadas = 1; filasCreadas <= 4; filasCreadas++) {
                let item = document.createElement("td"); // TD
    
                let coordX = (filasCreadas - 3);
                let coordY = ((columnasCreadas-2) * -1);
    
                if(columnasCreadas == (celdaVaciaY+3) && filasCreadas == (celdaVaciaX + 3)) { // Celda vacía
                    let hueco = document.createElement("img");
                    hueco.src = "img/blanco.gif";
                    hueco.id = "hueco";
                    item.appendChild(hueco);
                    this.coordXHueco = coordX;
                    this.coordYHueco = coordY;
                } else {
                    item.appendChild(this.fichas[fichasCreadas].displayFicha(coordX, coordY)); // FICHA se muestra y se le pasa su posición
                    fichasCreadas++;
                }            
                row.appendChild(item);
            }
            tabla4x4.appendChild(row);
        }
    
        // Insertar tabla
        body.appendChild(tabla4x4);
    }

    generarFichas() {
        // Las fichas serán almacenadas en un array "fichas"
        let fichas = [];
        for (let i = 0; i < 15; i++) {
            fichas.push(new ficha(i, this.idTabla));
        }
    
        return fichas;
    }

    /* Busca una ficha por sus coordenadas */
    // sin uso por ahora
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

        this.hueco.addEventListener("dragover", handleDragOver);
        this.hueco.addEventListener("dragenter", handleDragEnter);
        this.hueco.addEventListener("dragleave", handleDragLeave);
        this.hueco.addEventListener("drop", handleDrop);

        console.log("· Hueco preparado!");
    }
    
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
            ficha.addEventListener("dragstart", handleDragStart);
            ficha.addEventListener("dragover", handleDragOver);
            ficha.addEventListener("dragend", handleDragEnd);
            ficha.addEventListener("dragenter", handleDragEnter);
            ficha.addEventListener("dragleave", handleDragLeave);
            ficha.addEventListener("drop", handleDrop);
        });
    }
}