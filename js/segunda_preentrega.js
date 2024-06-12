// Función para agregar tareas
function agregarTareas() {
    let cantidadTareas = parseInt(prompt("¿Cuántas tareas desea agregar?"));
  
    if (isNaN(cantidadTareas) || cantidadTareas <= 0) {
      alert("Error: Debe ingresar un número positivo de tareas.");
      return;
    }
  
    for (let i = 0; i < cantidadTareas; i++) {
      let tarea = prompt(`Ingrese la tarea ${i + 1}:`);
      if (tarea.trim() === "") {
        alert("Error: La tarea no puede estar vacía.");
        i--; 
        continue;
      }
  
      tareas.lista.push({
        id: tareas.lista.length + 1,
        tarea,
      });
    }
  
    alert("Tareas agregadas exitosamente.");
  }
  
  // Función para listar tareas
  function listarTareas() {
    if (tareas.lista.length === 0) {
      alert("No hay tareas en la lista.");
      return;
    }
  
    let listaAlert = "**Lista de tareas:**\n"; // Variable para almacenar la lista en formato de alerta
  
    tareas.lista.forEach((tarea) => {
      listaAlert += `${tarea.id}. ${tarea.tarea}\n`;
    });
  
    alert(listaAlert); // Mostrar la lista completa en una alerta
  }
  
  // Función para eliminar una tarea por ID
  function eliminarTarea() {
    if (tareas.lista.length === 0) {
      alert("No hay tareas para eliminar.");
      return;
    }
  
    listarTareas(); // Mostrar la lista antes de eliminar
  
    let idTareaEliminar = parseInt(prompt("Ingrese el ID de la tarea a eliminar:"));
    if (isNaN(idTareaEliminar) || idTareaEliminar <= 0) {
      alert("Error: Debe ingresar un ID de tarea válido.");
      return;
    }
  
    let indice = tareas.lista.findIndex((tarea) => tarea.id === idTareaEliminar);
    if (indice === -1) {
      alert(`Error: Tarea con ID ${idTareaEliminar} no encontrada.`);
      return;
    }
  
    let tareaEliminada = tareas.lista.splice(indice, 1)[0];
    alert(`Tarea eliminada: ${tareaEliminada.tarea}`);
  }
  
  // Objeto literal para almacenar las tareas
  let tareas = {
    lista: [], // Array para almacenar las tareas
  };
  
  // Menú principal
  while (true) {
    let opcion = parseInt(prompt(`\nElige una opción:
    1. Agregar tareas
    2. Listar tareas
    3. Eliminar tarea
    4. Salir`));
  
    switch (opcion) {
      case 1:
        agregarTareas();
        break;
      case 2:
        listarTareas();
        break;
      case 3:
        eliminarTarea();
        break;
      case 4:
        alert("¡Gracias por usar la lista de tareas!");
        break;
      default:
        alert("Opción inválida. Intente nuevamente.");
    }
  }
  