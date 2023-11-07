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
    let tabla = "<table>";

    let fichasCreadas = 0;
    for(let columnasCreadas = 1; columnasCreadas <= 4; columnasCreadas++) {
        tabla += "<tr>"
        for( let filasCreadas = 1; filasCreadas <= 4; filasCreadas++) {
            // Contenido de la celda:
            console.log("FilasCreadas:" + filasCreadas + " " + (celdaVaciaX+3));
            console.log("FilasCreadas:" + columnasCreadas + " " + (celdaVaciaY+3));
            console.log(fichasCreadas);

            if(columnasCreadas == (celdaVaciaY+3) && filasCreadas == (celdaVaciaX + 3)) {
                console.log("NO MUESTRO");
                tabla += "<td></td>"
            } else {
                tabla += "<td>" + fichas[fichasCreadas].displayFicha() + "</td>";
                fichasCreadas++;
            }
        }
        tabla += "</tr>"
    }
    tabla += "</table>";

    // insertar tabla
    body.innerHTML += tabla;
}


function generarFichas() {
    // Las fichas serán almacenadas en un array
    let fichas = [];
    for (let i = 0; i < 15; i++) {
        fichas.push(new ficha(i));
    }
    console.log("· Fichas generadas");

    return fichas;
}

crearTabla4x4(generarFichas());