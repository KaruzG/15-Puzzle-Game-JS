/* CONTROLADOR PARA ARRASTRAR ELEMENTOS */
// Documentación de https://web.dev/articles/drag-and-drop?hl=es

let fichaDraggable = document.getElementById("draggable");
let dropZone  = document.getElementById("hueco");
let imgS = document.querySelectorAll("img");

function handleDragStart(e) {
    this.style.opacity = "0.4";

    dragSourceElement = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("img/html", dragSourceElement.src);
}

function handleDragEnd(e) {
    this.style.opacity = "1";

    imgS.forEach(function (item) {
        item.classList.remove("over")
    })
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
    e.stopPropagation();

    if (dragSourceElement !== this) {
        dragSourceElement.src = this.src;
        console.log(e.dataTransfer.getData("img/html"));
        this.src = e.dataTransfer.getData("img/html");
        console.log("Dropped");

    }

    return false;
}

fichaDraggable.addEventListener("dragstart", handleDragStart);
fichaDraggable.addEventListener("dragover", handleDragOver);
fichaDraggable.addEventListener("dragend", handleDragEnd);
fichaDraggable.addEventListener("dragenter", handleDragEnter);
fichaDraggable.addEventListener("dragleave", handleDragLeave);
fichaDraggable.addEventListener("drop", handleDrop);

dropZone.addEventListener("dragover", handleDragOver);
dropZone.addEventListener("dragenter", handleDragEnter);
dropZone.addEventListener("dragleave", handleDragLeave);
dropZone.addEventListener("drop", handleDrop);



