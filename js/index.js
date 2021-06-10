'use strict';
const startButton = document.getElementById('start');
const resetButton = document.getElementById('cancel');
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
let allInputs = document.querySelectorAll('input');
let textInputs = document.querySelectorAll('input[type=text]');

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

    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    this.getBlockInputs();
  },
  reset: function () {
    this.getUnblockInputs();

    allInputs.forEach(function (allInput) {
      allInput.value = '';
    });

    periodSelect.value = 1;
    periodAmount.textContent = 1;
    outputs[0].value = '';
    outputs[1].value = '';
    outputs[2].value = '';
    outputs[3].value = '';
    outputs[4].value = '';
    outputs[5].value = '';
    outputs[6].value = '';

    appData.budgetMonth = 0;
    appData.budgetDay = 0;
    appData.expensesMonth = 0;
    appData.addIncome = [];
    appData.addExpenses = [];
    appData.income = {};
    appData.expenses = {};
    appData.removeNewItems();
    expensesAdd.style.display = 'block';
    incomeAdd.style.display = 'block';
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
    cloneExpensesItem.querySelectorAll('input').forEach(function (element) {
      element.value = '';
    });
    expensesItems = document.querySelectorAll('.expenses-items');
    textInputs = document.querySelectorAll('input[type=text]');
    allInputs = document.querySelectorAll('input');

    appData.getValidateTextInput();
    appData.getValidateNumberInput();

    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    cloneIncomeItem.querySelectorAll('input').forEach(function (element) {
      element.value = '';
    });
    incomeItems = document.querySelectorAll('.income-items');
    textInputs = document.querySelectorAll('input[type=text]');
    allInputs = document.querySelectorAll('input');

    appData.getValidateTextInput();
    appData.getValidateNumberInput();

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
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
  },
  getIncomeMonth: function () {
    let sum = 0;
    for (let key in this.income) {
      sum += this.income[key];
    }
    this.incomeMonth = sum;
  },
  getBudget: function () {
    this.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    this.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(+target.value / this.budgetMonth);
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      this.percentDeposit = prompt('Какой годовой процент?', '10');
      while (!isNumber(this.percentDeposit)) {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      while (!isNumber(this.moneyDeposit)) {
        this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      }
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },
  getInfoPeriod: function () {
    periodAmount.textContent = periodSelect.value;
  },
  getValidateTextInput: function () {
    let textInputs = document.querySelectorAll('*[placeholder="Наименование"]');
    textInputs.forEach(function (element) {
      element.addEventListener('input', function () {
        element.value = element.value.replace(/[^А-я-\s\,\?\.\!]/, '');
      });
    });
  },
  getValidateNumberInput: function () {
    let numberInputs = document.querySelectorAll('*[placeholder="Сумма"]');
    numberInputs.forEach(function (element) {
      element.addEventListener('input', function () {
        element.value = element.value.replace(/[^0-9]/, '');
      });
    });
  },
  getBlockInputs: function () {
    textInputs.forEach(function (textInput) {
      textInput.disabled = true;
    });
    incomeAdd.disabled = true;
    expensesAdd.disabled = true;

    startButton.style.display = 'none';
    resetButton.style.display = 'block';
  },
  getUnblockInputs: function () {
    allInputs.forEach(function (allInput) {
      allInput.disabled = false;
    });
    incomeAdd.disabled = false;
    expensesAdd.disabled = false;

    startButton.style.display = 'block';
    resetButton.style.display = 'none';
  },
  removeNewItems: function () {
    let newExpensesItems = document.querySelectorAll('.expenses-items');
    let newIncomeItems = document.querySelectorAll('.income-items');

    if (newExpensesItems.length > 1) {
      for (let i = 1; i < newExpensesItems.length; i++) {
        newExpensesItems[i].remove();
      }
    }
    if (newIncomeItems.length > 1) {
      for (let i = 1; i < newIncomeItems.length; i++) {
        newIncomeItems[i].remove();
      }
    }
  }
};

startButton.disabled = true;
startButton.style.cursor = 'not-allowed';

salary.addEventListener('input', function () {
  let matchValue = salary.value = salary.value.replace(/[^0-9]/, '');
  if (salary.value !== '' && salary.value.match(matchValue)) {
    startButton.disabled = false;
    startButton.style.cursor = 'pointer';
  } else {
    startButton.disabled = true;
    startButton.style.cursor = 'not-allowed';
  }
});
startButton.addEventListener('click', appData.start.bind(appData));
resetButton.addEventListener('click', appData.reset.bind(appData));
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getInfoPeriod);
appData.getValidateTextInput();
appData.getValidateNumberInput();

// function showObjectData(obj) {
//   console.log(`Наша программа включает в себя данные:`)

//   for (let key in obj) {
//     console.log(`Свойство: ${key}, значение: ${obj[key]}`)
//   }
// }
// showObjectData(appData);
