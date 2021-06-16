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
const depositCheck = document.querySelector(`#deposit-check`);
const depositBank = document.querySelector(`.deposit-bank`);
const depositAmount = document.querySelector(`.deposit-amount`);
const depositPercent = document.querySelector(`.deposit-percent`);

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
  }

  start() {
    this.budget = +salary.value;

    this.getExpInc();
    this.getAddExpInc(additonalExpensesItem, this.addExpenses);
    this.getAddExpInc(additonalIncomeItems, this.addIncome);
    this.depositHandler();
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();
    textInputs = document.querySelectorAll(`input[type=text]`);
    this.getBlockInputs();
  }
  reset() {
    this.getUnblockInputs();

    allInputs.forEach((allInput) => {
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
    depositCheck.checked = false;
    this.depositHandler();
  }
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

  }
  addExpIncBlocks(item, button) {
    let cloneItem = item[0].cloneNode(true);
    item[0].parentNode.insertBefore(cloneItem, button);
    cloneItem.querySelectorAll(`input`).forEach((element) => {
      element.value = ``;
    });
    incomeItems = document.querySelectorAll(`.income-items`);
    expensesItems = document.querySelectorAll(`.expenses-items`);

    if (item.length === 2) {
      button.style.display = `none`;
    }

    this.getValidateTextInput();
    this.getValidateNumberInput();
  }
  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split(`-`)[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = +item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== `` && itemAmount !== ``) {
        this[startStr][itemTitle] = itemAmount;
      }
    }

    expensesItems.forEach(count);
    incomeItems.forEach(count);

    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }

    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }
  getAddExpInc(additionalItem, array) {
    if (additionalItem === additonalExpensesItem) {
      additionalItem = additonalExpensesItem.value.split(`,`);
    }
    additionalItem.forEach((item) => {
      if (additionalItem === additonalIncomeItems) {
        item = item.value.trim();
      }
      item = item.trim();
      if (item !== ``) {
        array.push(item);
      }
    })
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (+this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth + monthDeposit - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return Math.ceil(+target.value / this.budgetMonth);
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = +depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  checkValueDepositPercent() {

  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === `other`) {
      depositPercent.value = ``;
      depositPercent.style.display = `inline-block`;
      depositPercent.addEventListener(`input`, () => {
        depositPercent.value = depositPercent.value.replace(/[^0-9]/, ``);
        if (depositPercent.value < 0 || depositPercent.value > 100) {
          alert(`Введите корректное значение в поле проценты`);
          startButton.disabled = true;
          startButton.style.cursor = `not-allowed`;
          // depositPercent.value = ``;
        } else {
          startButton.disabled = false;
          startButton.style.cursor = `pointer`;
        }
      });

    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = `none`;
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = `inline-block`;
      depositAmount.style.display = `inline-block`;
      this.deposit = true;
      depositBank.addEventListener(`change`, this.changePercent);
    } else {
      depositBank.style.display = `none`;
      depositAmount.style.display = `none`;
      depositPercent.style.display = `none`;
      depositAmount.value = ``;
      depositBank.value = ``;
      this.deposit = false;
      depositBank.removeEventListener(`change`, this.changePercent);
    }
  }
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  };
  getInfoPeriod() {
    periodAmount.textContent = periodSelect.value;
  }
  getValidateTextInput() {
    let titleInputs = document.querySelectorAll(`*[placeholder="Наименование"]`);
    titleInputs.forEach((element) => {
      element.addEventListener(`input`, function () {
        element.value = element.value.replace(/[^А-я-\s\,\?\.\!]/, ``);
      });
    });
  }
  getValidateNumberInput() {
    let numberInputs = document.querySelectorAll(`*[placeholder="Сумма"]`);
    numberInputs.forEach((element) => {
      element.addEventListener(`input`, function () {
        element.value = element.value.replace(/[^0-9]/, ``);
      });
    });
  }
  getBlockInputs() {
    textInputs.forEach((textInput) => {
      textInput.disabled = true;
    });
    incomeAdd.disabled = true;
    expensesAdd.disabled = true;
    depositCheck.disabled = true;

    startButton.style.display = `none`;
    resetButton.style.display = `block`;
  }
  getUnblockInputs() {
    allInputs.forEach((allInput) => {
      allInput.disabled = false;
    });
    incomeAdd.disabled = false;
    expensesAdd.disabled = false;
    depositCheck.disabled = false;

    startButton.style.display = `block`;
    resetButton.style.display = `none`;
  }
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
  }
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
    expensesAdd.addEventListener(`click`, () => {
      this.addExpIncBlocks(expensesItems, expensesAdd);

    });
    incomeAdd.addEventListener(`click`, () => {
      this.addExpIncBlocks(incomeItems, incomeAdd);

    });
    periodSelect.addEventListener(`input`, this.getInfoPeriod);
    depositCheck.addEventListener(`change`, this.depositHandler.bind(this));
    this.getValidateTextInput();
    this.getValidateNumberInput();
  }
  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
};

const appData = new AppData();
appData.eventListeners();