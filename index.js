'use strict';

const DomElement = function (className, height, width, background, fontSize) {
  this.selector = className;
  this.height = height;
  this.width = width;
  this.bg = background;
  this.fontSize = fontSize;
};
DomElement.prototype.createElement = function () {
  console.log(this);
  let newElement;
  if (this.selector[0] === '.') {
    newElement = document.createElement('div');
    newElement.classList.add(this.selector.slice(1));
  } else if (this.selector[0] === '#') {
    newElement = document.createElement('p');
    newElement.id = this.selector.slice(1);
  }
  newElement.textContent = 'Привет мир!';
  newElement.style.cssText = `height: ${this.height}; 
  width: ${this.width}; 
  background: ${this.bg}; 
  font-size: ${this.fontSize}`;
  document.body.append(newElement);
};


const domElement = new DomElement('#id', '30%', '50%', 'red', '45px');
domElement.createElement();