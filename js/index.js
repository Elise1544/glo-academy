`use strict`;
const startButton = document.getElementById(`start`);
const resetButton = document.getElementById(`cancel`);
const salary = document.querySelector(`.salary-amount`);
let incomeItems = document.querySelectorAll(`.income-items`);
const incomeAdd = document.getElementsByTagName(`button`)[0];
const additonalIncomeItems = document.querySelectorAll(`.additional_income-item`);
let expensesItems = document.querySelectorAll(`.expenses-items`);
const expensesAdd = document.getElementsByTagName(`button`)[1];
const additonalExpensesItem = document.querySelector(`.additional_expenses-item`);
const checkbox = document.querySelector(`#deposit-check`);
const target = document.querySelector(`.target-amount`);
const periodSelect = document.querySelector(`.period-select`);
const periodAmount = document.querySelector(`.period-amount`);
const outputs = document.querySelectorAll(`[class*="value"]`);
let allInputs = document.querySelectorAll(`input`);
let textInputs = document.querySelectorAll(`input[type=text]`);

class AppData {
  constructor() {
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  };

  start() {
    this.budget = +salary.value;

    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    this.getBlockInputs();
  };
  reset() {
    this.getUnblockInputs();

    allInputs.forEach( (allInput) => {
      allInput.value = ``;
    });

    periodSelect.value = 1;
    periodAmount.textContent = 1;
    outputs[0].value = ``;
    outputs[1].value = ``;
    outputs[2].value = ``;
    outputs[3].value = ``;
    outputs[4].value = ``;
    outputs[5].value = ``;
    outputs[6].value = ``;

    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.expensesMonth = 0;
    this.addIncome = [];
    this.addExpenses = [];
    this.income = {};
    this.expenses = {};
    this.removeNewItems();
    expensesAdd.style.display = `block`;
    incomeAdd.style.display = `block`;
  };
  showResult() {
    outputs[0].value = this.budgetMonth;
    outputs[1].value = this.budgetDay;
    outputs[2].value = this.expensesMonth;
    outputs[3].value = this.addIncome.join(`, `);
    outputs[4].value = this.addExpenses.join(`, `);
    outputs[5].value = this.calcSavedMoney();
    outputs[6].value = this.getTargetMonth();

    periodSelect.addEventListener(`input`, () => {
      outputs[5].value = this.calcSavedMoney();
    });

  };
  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    cloneExpensesItem.querySelectorAll(`input`).forEach( (element) => {
      element.value = ``;
    });
    expensesItems = document.querySelectorAll(`.expenses-items`);
    textInputs = document.querySelectorAll(`input[type=text]`);
    allInputs = document.querySelectorAll(`input`);

    if (expensesItems.length === 3) {
      expensesAdd.style.display = `none`;
    }
    this.getValidateTextInput();
    this.getValidateNumberInput();
  };
  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    cloneIncomeItem.querySelectorAll(`input`).forEach( (element) => {
      element.value = ``;
    });
    incomeItems = document.querySelectorAll(`.income-items`);
    textInputs = document.querySelectorAll(`input[type=text]`);
    allInputs = document.querySelectorAll(`input`);

    if (incomeItems.length === 3) {
      incomeAdd.style.display = `none`;
    }

    this.getValidateTextInput();
    this.getValidateNumberInput();
  };

  getExpenses() {
    expensesItems.forEach( (item) => {
      const itemExpenses = item.querySelector(`.expenses-title`).value;
      const cashExpenses = +item.querySelector(`.expenses-amount`).value;
      if (itemExpenses !== `` && cashExpenses !== ``) {
        this.expenses[itemExpenses] = cashExpenses;
      }
    })
  };
  getIncome() {
    incomeItems.forEach( (item) => {
      const itemIncome = item.querySelector(`.income-title`).value;
      const cashIncome = +item.querySelector(`.income-amount`).value;
      if (itemIncome !== `` && cashIncome !== ``) {
        this.income[itemIncome] = cashIncome;
      }
    })
  };
  getAddExpenses() {
    const addExpenses = additonalExpensesItem.value.split(`,`);
    addExpenses.forEach( (item) => {
      item = item.trim();
      if (item !== ``) {
        this.addExpenses.push(item);
      }
    })
  };
  getAddIncome() {
    additonalIncomeItems.forEach( (item) => {
      const itemValue = item.value.trim();
      if (itemValue !== ``) {
        this.addIncome.push(itemValue);
      }
    })
  };
  getExpensesMonth() {
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
  };
  getIncomeMonth() {
    let sum = 0;
    for (let key in this.income) {
      sum += this.income[key];
    }
    this.incomeMonth = sum;
  };
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };
  getTargetMonth() {
    return Math.ceil(+target.value / this.budgetMonth);
  };
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = prompt(`Какой годовой процент?`, `10`);
      while (!this.isNumber(this.percentDeposit)) {
        this.percentDeposit = prompt(`Какой годовой процент?`, `10`);
      }
      this.moneyDeposit = prompt(`Какая сумма заложена?`, `10000`);
      while (!this.isNumber(this.moneyDeposit)) {
        this.moneyDeposit = prompt(`Какая сумма заложена?`, `10000`);
      }
    }
  };
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  };
  getInfoPeriod() {
    periodAmount.textContent = periodSelect.value;
  };
  getValidateTextInput() {
    let titleInputs = document.querySelectorAll(`*[placeholder="Наименование"]`);
    titleInputs.forEach( (element) => {
      element.addEventListener(`input`, function () {
        element.value = element.value.replace(/[^А-я-\s\,\?\.\!]/, ``);
      });
    });
  };
  getValidateNumberInput() {
    let numberInputs = document.querySelectorAll(`*[placeholder="Сумма"]`);
    numberInputs.forEach( (element) => {
      element.addEventListener(`input`, function () {
        element.value = element.value.replace(/[^0-9]/, ``);
      });
    });
  };
  getBlockInputs() {
    textInputs.forEach( (textInput) => {
      textInput.disabled = true;
    });
    incomeAdd.disabled = true;
    expensesAdd.disabled = true;

    startButton.style.display = `none`;
    resetButton.style.display = `block`;
  };
  getUnblockInputs() {
    allInputs.forEach( (allInput) => {
      allInput.disabled = false;
    });
    incomeAdd.disabled = false;
    expensesAdd.disabled = false;

    startButton.style.display = `block`;
    resetButton.style.display = `none`;
  };
  removeNewItems() {
    const newExpensesItems = document.querySelectorAll(`.expenses-items`);
    const newIncomeItems = document.querySelectorAll(`.income-items`);

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
  };
  eventListeners() {
    startButton.disabled = true;
    startButton.style.cursor = `not-allowed`;
    salary.addEventListener(`input`, function () {
      const matchValue = salary.value = salary.value.replace(/[^0-9]/, ``);
      if (salary.value !== `` && salary.value.match(matchValue)) {
        startButton.disabled = false;
        startButton.style.cursor = `pointer`;
      } else {
        startButton.disabled = true;
        startButton.style.cursor = `not-allowed`;
      }
    });
    startButton.addEventListener(`click`, this.start.bind(this));
    resetButton.addEventListener(`click`, this.reset.bind(this));
    expensesAdd.addEventListener(`click`, this.addExpensesBlock.bind(this));
    incomeAdd.addEventListener(`click`, this.addIncomeBlock.bind(this));
    periodSelect.addEventListener(`input`, this.getInfoPeriod);
    this.getValidateTextInput();
    this.getValidateNumberInput();
  };
  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
};

const appData = new AppData();
appData.eventListeners();