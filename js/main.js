/* 
    El concepto se basa en coordenadas de -2 a 1, siendo estos dos números los límites.

*/

var body = document.querySelector("body");


function crearTabla4x4(fichas) {
    // Seleccionar aleatoriamente que celda queda vacía:
    /*
        Aunque da un valor entre -2 a 1 (tipo coordenada) luego se va a usar
        de 1 a 4 en la creación de la tabla.
    */
    let celdaVaciaX = (Math.floor(Math.random() * 4 - 2)) ;
    let celdaVaciaY = (Math.floor(Math.random() * 4 - 2));
    console.log("· Hueco: x:" + celdaVaciaX + "  y:"+celdaVaciaY);


    // Aleatorizar array (Algoritmo Durstenfeld shuffle)
    for (let i = fichas.length - 1; i > 0; i--) {
        const i2 = Math.floor(Math.random() * (i + 1));
        [fichas[i], fichas[i2]] = [fichas[i2], fichas[i]];
    }
    console.log("· Fichas mezcladas");


    // Genera una tabla con sus tr y td y se inicializa un objeto ficha cada td menos
    // en el lugar aleatorio anteriormente calculado.
    let tabla4x4 = document.createElement("table"); // Tabla
    
    let fichasCreadas = 0;

    for (let columnasCreadas = 1; columnasCreadas <= 4; columnasCreadas++) { // Aquí se va recorriendo cada fila y añadiendo los elementos
        let row = document.createElement("tr"); // TR

        for (let filasCreadas = 1; filasCreadas <= 4; filasCreadas++) {
            let item = document.createElement("td"); // TD

            if(columnasCreadas == (celdaVaciaY+3) && filasCreadas == (celdaVaciaX + 3)) { // Celda vacía
                let hueco = document.createElement("img");
                hueco.src = "img/blanco.gif";
                hueco.id = "hueco";
                item.appendChild(hueco);
            } else {
                item.appendChild(fichas[fichasCreadas].displayFicha()); // FICHA
                fichasCreadas++;
            }            
            row.appendChild(item);
        }
        tabla4x4.appendChild(row);
    }

    // Insertar tabla
    body.appendChild(tabla4x4);
}


function generarFichas() {
    // Las fichas serán almacenadas en un array "fichas"
    let fichas = [];
    for (let i = 0; i < 15; i++) {
        fichas.push(new ficha(i));
    }
    console.log("· Fichas generadas");

    return fichas;
}

function prepararHueco() {
    let hueco = document.getElementById("hueco");

}

function prepararFichasMovibles() {
    let fichasMovibles = document.querySelectorAll("img");
    let hueco = document.getElementById("hueco");
}

crearTabla4x4(generarFichas());