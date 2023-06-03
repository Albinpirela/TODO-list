import './style.css';
import Icon from './asset/menu.png';

const myIcon = document.createElement('img');
myIcon.src = Icon;

let todos = [];

const updateLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

window.onload = () => {
  const form = document.getElementById('todo-form');
  const todoList = document.getElementById('todo-list');

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
    todoText.addEventListener('click', () => {
      todoText.contentEditable = true;
      todoText.focus();
      todoText.classList.add('editing');
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
      }
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(icon);

    return todoItem;
  }

  function renderTodoList() {
    todoList.innerHTML = '';
    todos.forEach((item) => {
      const todoItem = renderTodoItem(item);
      todoList.appendChild(todoItem);
    });
  }

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
