var body = document.querySelector("body");

class game {
    constructor() {
        this.fichas = this.generarFichas();
    }

    crearTabla4x4() {
        // Seleccionar aleatoriamente que celda queda vacía:
        /*
            Aunque da un valor entre -2 a 1 (tipo coordenada) luego se va a usar
            de 1 a 4 en la creación de la tabla.
        */
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
        
        let fichasCreadas = 0;
        for (let columnasCreadas = 1; columnasCreadas <= 4; columnasCreadas++) { // Aquí se va recorriendo cada fila y añadiendo los elementos
            let row = document.createElement("tr"); // TR
    
            for (let filasCreadas = 1; filasCreadas <= 4; filasCreadas++) {
                let item = document.createElement("td"); // TD
    
                let coordX = (filasCreadas - 3);
                let coordY = ((columnasCreadas - 3)*(-1));
    
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
    
        return true;
    }

    generarFichas() {
        // Las fichas serán almacenadas en un array "fichas"
        let fichas = [];
        for (let i = 0; i < 15; i++) {
            fichas.push(new ficha(i));
        }
        console.log("· Fichas generadas");
    
        return fichas;
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
        fichas = body.querySelectorAll("img.ficha");
        let fichasMovibles = [
            fichas[1],
            fichas[2],
        ]

        fichasMovibles.forEach(function(ficha) {
            ficha.addEventListener("dragstart", handleDragStart);
            ficha.addEventListener("dragover", handleDragOver);
            ficha.addEventListener("dragend", handleDragEnd);
            ficha.addEventListener("dragenter", handleDragEnter);
            ficha.addEventListener("dragleave", handleDragLeave);
            ficha.addEventListener("drop", handleDrop);
        });
    
        // Fetch cordenadas hueco
    }
}