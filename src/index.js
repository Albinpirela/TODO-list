import './style.css';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  const heading = document.createElement('h1');
  heading.innerHTML = 'Hello webpack';
  heading.classList.add('hello');
  return element;
}

document.body.appendChild(component());
