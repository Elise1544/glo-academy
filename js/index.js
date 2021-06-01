'use strict';

const income = 'Сдача квартиры';
const mission = 200000;
const period = 12;

let money = prompt('Ваш месячный доход?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');

function showTypeOf(data) {
  console.log(typeof (data));
}

function getExpensesMonth(sum1, sum2) {
  return +sum1 + +sum2;
}

function getAccumulatedMonth(income, expenses) {
  return +income - +expenses;
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

function getTargetMonth(target, accumulatedMonth) {
  return Math.ceil(+target / accumulatedMonth)
}

const budgetDay = accumulatedMonth / 30;

function getStatusIncome() {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
}

showTypeOf(+money);
showTypeOf(income);
showTypeOf(deposit);
console.log(`Расходы за месяц: ${getExpensesMonth(amount1, amount2)}`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(`Цель будет достигнута за ${getTargetMonth(mission, accumulatedMonth)} месяцев`)
console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);
console.log(getStatusIncome());
