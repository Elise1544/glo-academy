'use strict';

// 2 1 6 4 3 5

const books = document.querySelectorAll('.book');
const body = document.querySelector('body');
const title3 = books[4].querySelector('a');
const adv = document.querySelector('.adv');
const closuresList = books[0].querySelectorAll('li');
const asyncList = books[5].querySelectorAll('li');
const es6List = books[2].querySelectorAll('li');

// 1
books[0].before(books[1]);
books[5].after(books[2]);
books[3].before(books[4]);

// 2
body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

// 3
title3.textContent = 'Книга 3. this и Прототипы Объектов';

// 4
adv.remove();

// 5
closuresList[10].before(closuresList[2]);
closuresList[9].before(closuresList[7]);
closuresList[1].after(closuresList[3]);
closuresList[3].after(closuresList[6]);
closuresList[6].after(closuresList[8]);

asyncList[8].before(asyncList[5]);
asyncList[1].replaceWith(asyncList[9]);
asyncList[4].after(asyncList[2]);

// 6
const newElem = es6List[8].cloneNode(true);
newElem.textContent= 'Глава 8: За пределами ES6';
es6List[8].after(newElem);