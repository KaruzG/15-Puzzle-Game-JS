var body = document.querySelector("body");

// Crear tabla 4x4
function crearTabla4x4() {

    // Genera una tabla con sus tr y td y se inicializa un objeto ficha cada td menos en 1 td random.
    let tabla = "<table>";
    for(let columnasCreadas = 1; columnasCreadas <= 4; columnasCreadas++) {
        tabla += "<tr>"
        for( let filasCreadas = 1; filasCreadas <= 4; filasCreadas++) {
            // Inicializar ficha:
            let ficha


            // Contenido de la celda:
            tabla += "<td>" + "a" + "</td>";
        }
        tabla += "</tr>"
    }
    tabla += "</table>";

    // insertar tabla
    body.innerHTML += tabla;
}

// Generar ficha

crearTabla4x4();