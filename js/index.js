'use strict';
let money;
function start() {
  do {
    money = +prompt('Ваш месячный доход?');
  } while (!isNumber(money))
}
start();

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 200000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let key = prompt('Введите обязательную статью расходов?');
      let value = +prompt('Во сколько это обойдется?');
      while (!isNumber(value)) {
        value = +prompt('Во сколько это обойдется?');
      }
      appData.expenses[key] = value;
    }
  },

  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
  },

  getBudget: function () {
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
    return;
  },

  getTargetMonth: function () {
    let monthAmount = Math.ceil(+appData.mission / appData.budgetMonth);
    if (monthAmount > 0 && monthAmount !== Infinity) {
      return (`Цель будет достигнута за ${monthAmount} месяцев`)
    } else {
      return (`Цель не будет достигнута`);
    }
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  }

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log(appData.expenses);

function showObjectData (obj) {
  console.log(`Наша программа включает в себя данные:`)

  for (let key in obj) {
    console.log(`Свойство: ${key}, значение: ${obj[key]}`)
  }
}
showObjectData(appData);
