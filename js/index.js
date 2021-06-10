'use strict';
const startButton = document.getElementById('start');
const salary = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
const incomeAdd = document.getElementsByTagName('button')[0];
const additonalIncomeItems = document.querySelectorAll('.additional_income-item');
let expensesItems = document.querySelectorAll('.expenses-items');
const expensesAdd = document.getElementsByTagName('button')[1];
const additonalExpensesItem = document.querySelector('.additional_expenses-item');
const checkbox = document.querySelector('#deposit-check');
const target = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const outputs = document.querySelectorAll('[class*="value"]');

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,

  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    appData.budget = +salary.value;

    appData.getIncome();
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    outputs[0].value = appData.budgetMonth;
    outputs[1].value = appData.budgetDay;
    outputs[2].value = appData.expensesMonth;
    outputs[3].value = appData.addIncome.join(', ');
    outputs[4].value = appData.addExpenses.join(', ');
    outputs[5].value = appData.calcSavedMoney();
    outputs[6].value = appData.getTargetMonth();

    periodSelect.addEventListener('input', function () {
      outputs[5].value = appData.calcSavedMoney();
    });

  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = +item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    })
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = +item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    })
  },
  getAddExpenses: function () {
    let addExpenses = additonalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  getAddIncome: function () {
    additonalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    })
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
  },
  getIncomeMonth: function () {
    let sum = 0;
    for (let key in appData.income) {
      sum += appData.income[key];
    }
    appData.incomeMonth = sum;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(+target.value / appData.budgetMonth);
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
    return appData.budgetMonth * periodSelect.value;
  },
  getInfoPeriod: function () {
    periodAmount.textContent = periodSelect.value;
  }
};

startButton.disabled = true;
startButton.style.cursor = 'not-allowed';

salary.addEventListener('input', function () {
  let matchValue = salary.value = salary.value.replace(/[^0-9]/, '');
  if (salary.value !== '' && salary.value.match(matchValue)) {
    startButton.disabled = false;
    startButton.style.cursor = 'pointer';
    startButton.addEventListener('click', appData.start);
  } else {
    startButton.disabled = true;
    startButton.style.cursor = 'not-allowed';
  }
});
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getInfoPeriod);

// function showObjectData(obj) {
//   console.log(`Наша программа включает в себя данные:`)

//   for (let key in obj) {
//     console.log(`Свойство: ${key}, значение: ${obj[key]}`)
//   }
// }
// showObjectData(appData);
