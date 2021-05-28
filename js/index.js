const money = 30000;
const income = 'Сдача квартиры';
const addExpenses = 'Интернет, Такси, Еда, Коммуналка';
const deposit = false;
const mission = 200000;
const period = 12;
const budgetDay = money / 30;

// alert('Hello world!');
// console.log('First lesson');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);