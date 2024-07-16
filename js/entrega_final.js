// Objeto para almacenar las listas de tareas
let listas = {};

// Función para cargar las listas desde el archivo JSON
async function cargarListas() {
    try {
        const respuesta = await fetch('./tareas.json');
        const data = await respuesta.json();
        data.forEach(lista => {
            listas[lista.nombre] = {
                lista: lista.tareas.map((tarea, index) => ({
                    id: index + 1,
                    tarea: tarea
                })),
                idCounter: lista.tareas.length + 1
            };
        });
        mostrarTareas();
    } catch (error) {
        console.error("Error al cargar las listas:", error);
    }
}

// Función para verificar si la lista ya existe
function verificarLista() {
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    const mensaje = document.getElementById('mensaje');
    
    if (nombreLista === "") {
        mensaje.textContent = ""; 
        limpiarTareas();
        document.getElementById('btn-eliminar-lista').style.display = 'none';
        return;
    }

    if (listas[nombreLista]) {
        mensaje.textContent = `La lista "${nombreLista}" ya existe.`;
        mostrarTareas();
        document.getElementById('btn-eliminar-lista').style.display = 'inline-block';
    } else {
        mensaje.textContent = `La lista "${nombreLista}" no existe.`;
        limpiarTareas();
        document.getElementById('btn-eliminar-lista').style.display = 'none';
    }
}

// Función para limpiar tareas
function limpiarTareas() {
    const contenedorTareas = document.getElementById('contenedor-tareas');
    contenedorTareas.innerHTML = '<p>No hay tareas en esta lista.</p>';
    document.getElementById('nombre-lista').textContent = ''; 
}

// Función para eliminar la lista
function eliminarLista() {
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    const mensaje = document.getElementById('mensaje');
    
    if (nombreLista === "") return; 

    if (listas[nombreLista]) {
        delete listas[nombreLista];
        mensaje.textContent = `Lista "${nombreLista}" fue eliminada.`;
        limpiarCampos();
    } else {
        mensaje.textContent = `La lista "${nombreLista}" no existe.`;
    }
}

// Función para agregar una tarea
function agregarTarea(event) {
    event.preventDefault();
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    const tareaInput = document.getElementById('input-tarea');
    const tarea = tareaInput.value.trim();
    const mensaje = document.getElementById('mensaje');

    if (nombreLista === "") {
        mensaje.textContent = "Error: Debe especificar el nombre de la lista.";
        return;
    }

    if (tarea === "") {
        mensaje.textContent = "Error: La tarea no puede estar vacía.";
        return;
    }

    if (!listas[nombreLista]) {
        listas[nombreLista] = { lista: [], idCounter: 1 };
    }

    listas[nombreLista].lista.push({
        id: listas[nombreLista].idCounter++,
        tarea,
    });

    mensaje.textContent = "Tarea agregada exitosamente.";
    tareaInput.value = '';
    mostrarTareas();
}

// Función para eliminar una tarea por ID
function eliminarTarea(event) {
    event.preventDefault();
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    const idEliminar = parseInt(document.getElementById('input-id-eliminar').value.trim());
    const mensaje = document.getElementById('mensaje');

    if (!listas[nombreLista]) {
        mensaje.textContent = "Error: La lista no existe.";
        return;
    }

    const indice = listas[nombreLista].lista.findIndex(tarea => tarea.id === idEliminar);
    if (indice === -1) {
        mensaje.textContent = `Error: Tarea con ID "${idEliminar}" no encontrada.`;
        return;
    }

    listas[nombreLista].lista.splice(indice, 1);
    mostrarTareas();
}

// Función para mostrar tareas en el contenedor
function mostrarTareas() {
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    const contenedorTareas = document.getElementById('contenedor-tareas');
    const nombreListaElemento = document.getElementById('nombre-lista');
    contenedorTareas.innerHTML = '';

    if (!listas[nombreLista]) {
        limpiarTareas();
        return;
    }

    nombreListaElemento.textContent = `Lista: ${nombreLista}`;

    const ul = document.createElement('ul');
    listas[nombreLista].lista.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = `${tarea.id}. ${tarea.tarea}`;
        ul.appendChild(li);
    });

    contenedorTareas.appendChild(ul);
}

// Función para limpiar todos los campos
function limpiarCampos() {
    document.getElementById('input-nombre-lista').value = '';
    document.getElementById('input-tarea').value = '';
    document.getElementById('input-id-eliminar').value = '';
    document.getElementById('contenedor-tareas').innerHTML = '';
    document.getElementById('nombre-lista').textContent = ''; 
    document.getElementById('btn-eliminar-lista').style.display = 'none';
    document.getElementById('mensaje').textContent = '';
}

// Función para limpiar la lista de tareas
function limpiarLista() {
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    const mensaje = document.getElementById('mensaje');

    if (!listas[nombreLista]) {
        mensaje.textContent = "Error: La lista no existe.";
        return;
    }

    // Limpiar las tareas de la lista
    listas[nombreLista].lista = [];
    listas[nombreLista].idCounter = 1; // Reiniciar el contador de IDs
    mensaje.textContent = `La lista "${nombreLista}" ha sido limpiada.`;
    
    // Mostrar tareas actualizadas
    mostrarTareas(); 
}

// Event listeners para los botones
document.getElementById('form-agregar').addEventListener('submit', agregarTarea);
document.getElementById('form-eliminar').addEventListener('submit', eliminarTarea);
document.getElementById('btn-limpiar-lista').addEventListener('click', limpiarLista);
document.getElementById('btn-verificar-lista').addEventListener('click', verificarLista);
document.getElementById('btn-eliminar-lista').addEventListener('click', eliminarLista);

// Inicializar la visualización de tareas
cargarListas();
