'use strict';

// const money = 30000;
const income = 'Сдача квартиры';
// const addExpenses = 'Интернет, Такси, Еда, Коммуналка';
// const deposit = false;
const mission = 200000;
const period = 12;

let money = prompt('Ваш месячный доход?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');
const budgetMonth = +money - (+amount1 + +amount2);
const budgetDay = budgetMonth / 30;
// alert('Hello world!');
// console.log('First lesson');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));

console.log(`Бюджет на месяц: ${budgetMonth}`);

const monthToMission = Math.ceil(+mission / budgetMonth);
console.log(`Цель будет достигнута за ${monthToMission} месяцев`);

console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
  console.log('У вас средний уровень доходаа');
} else if (budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}
