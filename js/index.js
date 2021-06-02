'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
  income = 'Сдача квартиры',
  mission = 200000,
  period = 12,
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses = [];

function start() {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money))
}
start();

function showTypeOf(data) {
  console.log(typeof (data));
}

function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    let amount = +prompt('Во сколько это обойдется?');
    while (!isNumber(amount)) {
      amount = +prompt('Во сколько это обойдется?');
    }
    sum += amount;
  }
  return sum;
}

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth(income, expenses) {
  return +income - +expenses;
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

function getTargetMonth() {
  let monthAmount = Math.ceil(+mission / accumulatedMonth);
  if (monthAmount > 0 && monthAmount !== Infinity) {
    return (`Цель будет достигнута за ${monthAmount} месяцев`)
  } else {
    return (`Цель не будет достигнута`);
  }
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
console.log(`Расходы за месяц: ${expensesAmount}`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());
console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);
console.log(getStatusIncome());
