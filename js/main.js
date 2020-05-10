let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavings = document.getElementsByClassName('monthsavings-value')[0],
    yearsavings = document.getElementsByClassName('yearsavings-value')[0];

let expensesItem = document.getElementsByClassName('expenses-item');
let expensesBtn = document.querySelector('button.expenses-item-btn');
let optionalExpensesBtn = document.querySelector('button.optionalexpenses-btn');
let countBtn = document.querySelector('button.count-budget-btn');
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');

let incomeItem = document.querySelector('input.choose-income');
let checkSaving = document.querySelector('input#savings');
let sumValue = document.querySelector('input#sum');
let percentValue = document.querySelector('input#percent');

let yearValue = document.querySelector('input.year-value');
let monthValue = document.querySelector('input.month-value');
let dayValue = document.querySelector('input.day-value');

let money;
let time;

///



startBtn.addEventListener('click', () => {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');    
    money = +prompt("Ваш бюджет на месяц?", '');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', () => {

    if (appData.budget != undefined) {

    let sum = 0;
    
    for(let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value;
            b = expensesItem[++i].value;
            
        if ( (typeof(a)) === "string" && a != '' && b != '' && a.length < 50) {
            console.log("Готово!");
            appData.expenses[a] = b;
            sum += +b;
            appData.expensesSum = sum;
        } else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
  }
});

optionalExpensesBtn.addEventListener('click', () => {

    if (appData.budget != undefined) {

    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
  }
});

countBtn.addEventListener('click', () => {

    if (appData.budget != undefined) {

        if (appData.expensesSum != undefined) {


    appData.moneyPerDay = ( (appData.budget - appData.expensesSum ) / 30 ).toFixed();
        } else { appData.moneyPerDay = (appData.budget  / 30).toFixed();
    }

    daybudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay <= 100) {
        levelValue.textContent = "Это минимальный уровень достатка!";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        levelValue.textContent = "Это средний уровень достатка!";
    } else if (appData.moneyPerDay >= 2000) {
        levelValue.textContent = "Это высокий уровень достатка!";
    } else {
        levelValue.textContent = "Произошла ошибка";
    }
  }
});

incomeItem.addEventListener('input', () => {

    
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = items;
});

checkSaving.addEventListener('click', () => {
    (appData.savings === false) ? appData.savings = true : appData.savings = false
});

sumValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

       appData.monthIncome = sum/100/12*percent;
       appData.yearIncome = sum/100*percent;
    
       monthsavings.textContent = appData.monthIncome.toFixed(1);
       yearsavings.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value,
        percent = +percentValue.value;

   appData.monthIncome = sum/100/12*percent;
   appData.yearIncome = sum/100*percent;

   monthsavings.textContent = appData.monthIncome.toFixed(1);
   yearsavings.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	timeData: time,
	savings: false
};