/* CONTROLADOR PARA ARRASTRAR ELEMENTOS */
// Documentación de https://web.dev/articles/drag-and-drop?hl=es
function handleDragStart(e) {
    this.style.opacity = "0.4";

    dragSourceElement = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("img/html", this.src);
}

function handleDragEnd(e) {
    this.style.opacity = "1";
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
  }

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    console.log("Handle Drop: " + this.innerHTML)
    e.stopPropagation();

    if (dragSourceElement !== this) { // Intercambia los elementos
        dragSourceElement.src = this.src;
        this.src = e.dataTransfer.getData("img/html");
    }

    this.classList.remove('over');
    return false;
}





