// import _ from 'lodash';
import _ from 'lodash';
import './style.css';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // Add the image to our existing div.

  return element;
}

document.body.appendChild(component());
