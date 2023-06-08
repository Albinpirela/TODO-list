import './style.css';
import Icon from './asset/menu.png';
import iconClear from './asset/clearicon.png';

const myIcon = document.createElement('img');
myIcon.src = Icon;

const clearIcon = document.createElement('img');
clearIcon.src = iconClear;

const todo = document.getElementById('todo');
const todos = document.getElementById('todo-list');
let toDoList = [];

function ready(elemento) {
  const checkbox = elemento.querySelector('input[type="checkbox"]');
  const icono = elemento.querySelector('img');
  const tarea = elemento.querySelector('p');

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      icono.src = clearIcon.src; // Cambiar el icono a iconClear
      tarea.style.textDecoration = 'line-through'; // Tachar la tarea cuando el checkbox esté marcado
    } else {
      icono.src = myIcon.src; // Cambiar el icono a Icon
      tarea.style.textDecoration = 'none'; // Quitar el tachado de la tarea cuando el checkbox no esté marcado
    }
  });

  tarea.addEventListener('click', () => {
    tarea.contentEditable = true; // Habilitar la edición de la tarea
    tarea.focus(); // Dar foco al elemento para la edición
    elemento.style.backgroundColor = 'lightyellow'; // Agregar color de fondo amarillo claro al elemento

    tarea.addEventListener('blur', () => {
      tarea.contentEditable = false; // Deshabilitar la edición de la tarea
      elemento.style.backgroundColor = ''; // Restaurar el color de fondo original del elemento
    });

    tarea.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault(); // Evitar el comportamiento predeterminado al presionar Enter

        tarea.contentEditable = false; // Deshabilitar la edición de la tarea
        elemento.style.backgroundColor = ''; // Restaurar el color de fondo original del elemento
      }
    });

    const clearButton = elemento.querySelector(`img[src="${clearIcon.src}"]`);

    clearButton.addEventListener('click', () => {
      const listItem = clearButton.closest('li');
      listItem.remove();

      // Actualizar el array toDoList con los elementos actualizados en el DOM
      toDoList = Array.from(todos.children);

      // Guardar los elementos en el almacenamiento local
      localStorage.setItem('todos', JSON.stringify(toDoList));
    });
  });

  tarea.addEventListener('focus', () => {
    icono.src = clearIcon.src; // Cambia el icono a clearIcon cuando tenga el foco
    elemento.style.backgroundColor = 'lightyellow'; // Agregar color de fondo amarillo claro al elemento
  });

  tarea.addEventListener('blur', () => {
    icono.src = myIcon.src; // Restaurar el icono original cuando el campo de texto pierda el foco
    elemento.style.backgroundColor = ''; // Restaurar el color de fondo original del elemento
  });
}

function borrarElementoTachado() {
  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', () => {
    const elementos = document.querySelectorAll('#todo-list li');

    elementos.forEach((elemento) => {
      const checkbox = elemento.querySelector('input[type="checkbox"]');
      const tarea = elemento.querySelector('p');

      if (checkbox.checked || tarea.style.textDecoration === 'line-through') {
        elemento.remove();
      }
    });

    // Actualizar el array toDoList con los elementos actualizados en el DOM
    toDoList = Array.from(todos.children);

    // Guardar los elementos en el almacenamiento local
    localStorage.setItem('todos', JSON.stringify(toDoList));
  });
}

// Función para agregar una tarea a la lista
function agregarTarea(todoText) {
  const element = document.createElement('li');
  const taskId = `task-${Date.now()}`; // Generar un identificador único
  element.setAttribute('id', taskId);
  element.innerHTML = `
    <input type="checkbox">
    <p>${todoText}</p>
    <img src="${myIcon.src}">
  `;

  // Actualizar el array toDoList con los elementos actualizados en el DOM
  toDoList = Array.from(todos.children);

  // Guardar los elementos en el almacenamiento local
  localStorage.setItem('todos', JSON.stringify(toDoList));

  ready(element);
  todos.appendChild(element); // Agregar el elemento al DOM
}

function actualizarTodos(event) {
  if (event.keyCode === 13) {
    const todoTarea = todo.value;
    agregarTarea(todoTarea); // Utilizar la función agregarTarea para agregar la nueva tarea
    todo.value = ''; // Limpiar el campo de texto
  }
}

document.addEventListener('DOMContentLoaded', () => {
  borrarElementoTachado();

  // Cargar los elementos almacenados en el almacenamiento local
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    toDoList = JSON.parse(storedTodos);
    toDoList.forEach((element) => {
      ready(element);
      todos.appendChild(element);
    });
  } else {
    // Agregar las tareas predefinidas a la lista
    const predefinedTodos = [
      'Wash the dogs',
      'Complete To Do list project',
      'Fix car',
    ];

    predefinedTodos.forEach((todoText) => {
      agregarTarea(todoText);
    });
  }

  // Almacenar los elementos en el inspector de elementos
  localStorage.setItem('todos', JSON.stringify(toDoList));
});

todo.addEventListener('keydown', actualizarTodos);
