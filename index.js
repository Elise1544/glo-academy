'use strict';

const DomElement = function () {
  this.selector = '.class';
  this.height = '20%';
  this.width = '100%';
  this.bg = 'blue';
  this.fontSize = '45px';
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


const domElement = new DomElement();
domElement.createElement();