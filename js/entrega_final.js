// Objeto para almacenar las listas de tareas
let listas = {};

// Función para cargar las listas desde localStorage
function cargarListas() {
    const listasGuardadas = localStorage.getItem('listas');
    if (listasGuardadas) {
        listas = JSON.parse(listasGuardadas);
    }
    mostrarTareas();
}

// Función para guardar las listas en localStorage
function guardarListas() {
    localStorage.setItem('listas', JSON.stringify(listas));
}

// Función para verificar si la lista ya existe
function verificarLista() {
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    if (listas[nombreLista]) {
        alert(`La lista "${nombreLista}" ya existe.`);
        mostrarTareas(); // Mostrar tareas de la lista existente
        document.getElementById('btn-eliminar-lista').style.display = 'inline-block'; // Mostrar botón de eliminar lista
    } else {
        alert(`La lista "${nombreLista}" no existe.`);
        document.getElementById('contenedor-tareas').innerHTML = '<p>No hay tareas en esta lista.</p>';
        document.getElementById('btn-eliminar-lista').style.display = 'none'; // Ocultar botón de eliminar lista
    }
}

// Función para eliminar la lista
function eliminarLista() {
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    if (listas[nombreLista]) {
        delete listas[nombreLista];
        guardarListas();
        alert(`Lista "${nombreLista}" fue eliminada.`);
        limpiarCampos();
    } else {
        alert(`La lista "${nombreLista}" no existe.`);
    }
}

// Función para agregar una tarea
function agregarTarea(event) {
    event.preventDefault();
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    const tareaInput = document.getElementById('input-tarea');
    const tarea = tareaInput.value.trim();

    if (tarea === "") {
        alert("Error: La lista no puede estar vacía.");
        return;
    }

    if (!listas[nombreLista]) {
        listas[nombreLista] = { lista: [], idCounter: 1 };
    }

    listas[nombreLista].lista.push({
        id: listas[nombreLista].idCounter++,
        tarea,
    });

    alert("Tarea agregada exitosamente.");
    tareaInput.value = '';
    guardarListas();
    mostrarTareas();
}

// Función para eliminar una tarea por nombre
function eliminarTarea(event) {
    event.preventDefault();
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    const tareaEliminar = document.getElementById('input-nombre-eliminar').value.trim();

    if (!listas[nombreLista]) {
        alert("Error: La lista no existe.");
        return;
    }

    const indice = listas[nombreLista].lista.findIndex(tarea => tarea.tarea === tareaEliminar);
    if (indice === -1) {
        alert(`Error: Tarea "${tareaEliminar}" no encontrada.`);
        return;
    }

    const tareaEliminada = listas[nombreLista].lista.splice(indice, 1)[0];
    alert(`Tarea eliminada: ${tareaEliminada.tarea}`);
    document.getElementById('input-nombre-eliminar').value = '';
    guardarListas();
    mostrarTareas();
}

// Función para mostrar tareas en el contenedor
function mostrarTareas() {
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    const contenedorTareas = document.getElementById('contenedor-tareas');
    contenedorTareas.innerHTML = '';

    if (!listas[nombreLista]) {
        contenedorTareas.innerHTML = '<p>No hay tareas en esta lista.</p>';
        return;
    }

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
    document.getElementById('input-nombre-eliminar').value = '';
    document.getElementById('contenedor-tareas').innerHTML = '';
    document.getElementById('btn-eliminar-lista').style.display = 'none'; // Ocultar botón de eliminar lista
}

// Función para limpiar la lista de tareas
function limpiarLista() {
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    if (!listas[nombreLista]) {
        alert("Error: La lista no existe.");
        return;
    }

    listas[nombreLista].lista = [];
    listas[nombreLista].idCounter = 1; // Reiniciar el contador de ID
    guardarListas();
    mostrarTareas();
}

// Función para guardar la lista como objeto
function guardarLista() {
    const nombreLista = document.getElementById('input-nombre-lista').value.trim();
    if (!listas[nombreLista]) {
        alert("Error: La lista no existe. Debe crearla primero.");
        return;
    }
    alert(`Lista "${nombreLista}" guardada con éxito.`);
}

// Event listeners para los botones
document.getElementById('form-agregar').addEventListener('submit', agregarTarea);
document.getElementById('form-eliminar').addEventListener('submit', eliminarTarea);
document.getElementById('btn-listar').addEventListener('click', limpiarLista);
document.getElementById('btn-verificar-lista').addEventListener('click', verificarLista);
document.getElementById('btn-eliminar-lista').addEventListener('click', eliminarLista);

// Inicializar la visualización de tareas
cargarListas();
