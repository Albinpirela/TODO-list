// import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  const heading = document.createElement('h1');
  heading.innerHTML = 'Hello webpack';
  heading.classList.add('hello');
  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
