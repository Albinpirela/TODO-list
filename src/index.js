import './style.css';
import Icon from './asset/menu.png';
import iconClear from './asset/clearicon.png';

const myIcon = document.createElement('img');
myIcon.src = Icon;

const clearIcon = document.createElement('img');
clearIcon.src = iconClear;

let todos = [];

const updateLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

function renderTodoItem(item) {
  const todoItem = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const todoText = document.createElement('p');
  todoText.textContent = item.todo;

  checkbox.addEventListener('change', () => {
    item.done = checkbox.checked;
    if (checkbox.checked) {
      todoText.classList.add('done');
    } else {
      todoText.classList.remove('done');
    }
    updateLocalStorage();
  });

  if (item.done) {
    checkbox.checked = true;
    todoText.classList.add('done');
  }

  const icon = document.createElement('img');
  icon.src = myIcon.src;
  icon.alt = 'Icono de tarea';

  // Agregar evento de clic para habilitar la edición
  let isSelected = false; // Variable para almacenar el estado de selección

  todoText.addEventListener('click', () => {
    if (!isSelected) {
      // Si el elemento no está seleccionado, se activa el modo de edición
      todoText.contentEditable = true;
      todoText.focus();
      todoText.classList.add('editing');
      icon.src = clearIcon.src; // Cambiar el icono a iconClear
      isSelected = true; // Establecer el estado de selección a true
    }
  });

  // Agregar evento de tecla para guardar la edición
  todoText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      todoText.contentEditable = false;
      todoText.classList.remove('editing');
      const newText = todoText.textContent.trim();
      if (newText !== '') {
        item.todo = newText;
        updateLocalStorage();
      } else {
        todoText.textContent = item.todo;
      }
      icon.src = myIcon.src; // Cambiar el icono de vuelta a myIcon
    }
  });

  todoText.addEventListener('blur', () => {
    icon.src = myIcon.src; // Cambiar el icono a myIcon
  });

  icon.addEventListener('click', () => {
    if (isSelected) {
      const index = todos.indexOf(item);
      if (index > -1) {
        todos.splice(index, 1);
        updateLocalStorage();
      }
    } else {
      todoText.contentEditable = true;
      todoText.focus();
      todoText.classList.add('editing');
      icon.src = clearIcon.src; // Cambiar el icono a iconClear
      isSelected = true; // Establecer el estado de selección a true
    }
  });

  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(icon);

  return todoItem;
}

function renderTodoList() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  todos.forEach((item) => {
    const todoItem = renderTodoItem(item);
    todoList.appendChild(todoItem);
  });
}

window.onload = () => {
  const form = document.getElementById('todo-form');

  function clearList() {
    todos = [];
    updateLocalStorage();
    renderTodoList();
  }

  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const todo = document.getElementById('todo');
      const todoText = todo.value;
      todo.value = '';
      todos.push({ todo: todoText, done: false });
      updateLocalStorage();
      renderTodoList();
    }
  });

  const clear = document.getElementById('clear');

  clear.addEventListener('click', clearList);

  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // Clear initial list

  // Retrieve data from localStorage on page load
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodoList();
  } else {
    // Load predefined tasks if no tasks are stored
    todos = [
      { todo: 'Wash the dogs', done: false },
      { todo: 'Complete To Do list project', done: false },
      { todo: 'Fix car', done: false },
    ];
    updateLocalStorage();
    renderTodoList();
  }
};
