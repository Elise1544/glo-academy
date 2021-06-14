'use strict';
let newElement;

const DomElement = function (className, height, width, background, fontSize, position, top, left, textAlign) {
  this.selector = className;
  this.height = height;
  this.width = width;
  this.bg = background;
  this.fontSize = fontSize;
  this.position = position;
  this.top = top;
  this.left = left;
  this.textAlign = textAlign;
};
DomElement.prototype.createElement = function () {
  console.log(this);
  if (this.selector[0] === '.') {
    newElement = document.createElement('div');
    newElement.classList.add(this.selector.slice(1));
  } else if (this.selector[0] === '#') {
    newElement = document.createElement('p');
    newElement.id = this.selector.slice(1);
  }
  newElement.textContent = 'Я двигаюсь :)';
  newElement.style.cssText = `height: ${this.height}; 
  width: ${this.width}; 
  background: ${this.bg}; 
  font-size: ${this.fontSize};
  text-align: ${this.textAlign};
  position: ${this.position};
  top: ${+this.top}px;
  left: ${+this.left}px`;
  document.body.append(newElement);
};
DomElement.prototype.move = function () {
  const _this = this;
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'ArrowLeft') {
      _this.left -= 10;
      newElement.style.left = `${_this.left}px`
    } else if (evt.key === 'ArrowRight') {
      _this.left += 10;
      newElement.style.left = `${_this.left}px`
    } else if (evt.key === 'ArrowUp') {
      _this.top -= 10;
      newElement.style.top = `${_this.top}px`
    } else if (evt.key === 'ArrowDown') {
      _this.top += 10;
      newElement.style.top = `${_this.top}px`
    }
  });
};

document.addEventListener('DOMContentLoaded', function () {
  const domElement = new DomElement('.class', '100px', '100px', 'blue', '23px', 'absolute', 250, 600, 'center');
  domElement.createElement();
  domElement.move();
});
