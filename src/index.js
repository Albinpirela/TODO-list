import './style.css';
import Icon from './asset/menu.png';

const myIcon = document.createElement('img');
myIcon.src = Icon;

const todos = [];

window.onload = () => {
  const form = document.getElementById('todo-form');

  function renderTodoItem(item) {
    const html = `
      <li>
        <input type="checkbox" />
        <p>${item.todo}</p>
        <img src="${item.icon}" alt="Icono de tarea" />
      </li>`;
    return html;
  }

  form.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const todo = document.getElementById('todo');
      const todoText = todo.value;
      todo.value = '';
      todos.push(todoText);
      const todoList = document.getElementById('todo-list');
      todoList.innerHTML = '';
      for (let i = 0; i < todos.length; i += 1) {
        todoList.innerHTML += renderTodoItem({ todo: todos[i], icon: myIcon.src });
      }
    }
  });

  const todoList = document.getElementById('todo-list');
  const clear = document.getElementById('clear');

  function renderTodoList() {
    todoList.innerHTML = '';
    for (let i = 0; i < todos.length; i += 1) {
      todoList.innerHTML += renderTodoItem({ todo: todos[i], icon: myIcon.src });
    }
  }

  function clearList() {
    todos.length = 0;
    renderTodoList();
  }

  clear.addEventListener('click', clearList);

  todoList.innerHTML = ''; // Limpiar la lista inicialmente
  renderTodoList();
};
