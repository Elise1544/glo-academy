'use strict';
const startButton = document.getElementById('start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const additonalIncomeItems = document.querySelectorAll('.additional_income-item');
const outputs = document.querySelectorAll('[class*="value"]');
const salary = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-items').querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-items').querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additonalExpensesItem = document.querySelector('.additional_expenses-item');
const target = document.querySelector('.target-amount');
const range = document.querySelector('.period-select');

let money;
function start() {
  do {
    money = +prompt('Ваш месячный доход?', '50000');
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 200000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
      while (isNumber(itemIncome)) {
        itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
      }
      let cashIncome = prompt('Сколько в месяц зарабатываете на этом?', '10000');
      while (!isNumber(cashIncome)) {
        cashIncome = prompt('Сколько в месяц зарабатываете на этом?', '10000');
      }
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'такси, кино, театр');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    let costs = addExpenses.split(', ')
    let array = [];
    for (let cost of costs) {
      cost = cost[0].toUpperCase() + cost.substr(1).toLowerCase();
      array.push(cost);
    }
    console.log(String(array));
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let key = prompt('Введите обязательную статью расходов?');
      while (isNumber(key)) {
        key = prompt('Введите обязательную статью расходов?');
      }
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = prompt('Какой годовой процент?', '10');
      while (!isNumber(appData.percentDeposit)) {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      while (!isNumber(appData.moneyDeposit)) {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      }
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.calcSavedMoney();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

function showObjectData(obj) {
  console.log(`Наша программа включает в себя данные:`)

  for (let key in obj) {
    console.log(`Свойство: ${key}, значение: ${obj[key]}`)
  }
}
showObjectData(appData);
