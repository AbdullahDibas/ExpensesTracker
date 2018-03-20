import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Expense } from "../models/expense";
import { ExpenseCategory } from "../models/expense.category";
import { ExpensesDataService } from './expenses-data.service';
import { ExpenseCategoryDataService } from './expense-category-data.service';
import { ExpensePeriod } from '../models/expense.period';

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@Injectable()
export class DashboardsManagerService {

  constructor(private _http: Http,
    private _expensesSVC: ExpensesDataService,
    _expCategoriesSVC: ExpenseCategoryDataService) { }

  getHighestMonthInTheYear = function () {
    let allExpenses = this._expensesSVC.getExpenses();

    var n: number = 0;
    var maxExpMonth = 0;
    var maxMonthExp = 0;

    while (n < 12) {
      var monthExp = this.getMonthTotalExpense(n);

      if (maxMonthExp < monthExp) {
        maxMonthExp = monthExp;
        maxExpMonth = n;
      }
      n++;
    }

    if (n == 12 && maxMonthExp == 0) {
      return "N/A";
    } else {
      return MONTH_NAMES[maxExpMonth];
    }
  }

  getHighestExpCategoryInTheMonth = function () {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();

    // get current month expenses
    let currentMonthExpenses: Expense[]
      = this._expensesSVC.getExpenses().filter((exp: Expense) => exp.expenseStartDate.getMonth() <= currentMonth);

    if (currentMonthExpenses.length > 0) {
      let categoriesAmounts: Map<number, number> = this.getMonthCategoriesAmounts(currentMonth);
      if (categoriesAmounts) {
        var maxCategoryAmount: number;
        let _array = Array.from(categoriesAmounts.values());
        var categoryIdAmount = _array.reduce((a,b) => Math.max(a,b));
     
        return categoriesAmounts[categoryIdAmount];
      }
    }
    else {
      return -1;
    }
  }

  getMonthCategoriesAmounts = function (month) {
    let monthExpenses: Expense[] = this.getMonthExpenses(month);
    let monthExpensesCategoriesIds: Set<number>;
    let kvp: Map<number, number> = new Map<number, number>();

    if (monthExpenses.length > 0) {
      monthExpensesCategoriesIds = new Set(monthExpenses.map((exp) => exp.expenseCategoryId));
      if (monthExpensesCategoriesIds.size > 0) {
        Array.from(monthExpensesCategoriesIds).forEach((id) =>
          kvp.set(id,
            monthExpenses.filter(exp => exp.expenseCategoryId == id)
              .map((exp: Expense) => this.getAmount(exp))
              .reduce((sum, current) => sum + current)));
        return kvp;
      }
    }
    return null;
  }

  getCurrentMonthTotalExpenses = function () {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    return this.getMonthTotalExpense(currentMonth);
  }

  getMonthTotalExpense = function (month) {
    let allExpenses = this._expensesSVC.getExpenses();

    if (allExpenses && allExpenses.length > 0 && allExpenses.filter((exp: Expense) => exp.expenseStartDate.getMonth() <= month).length > 0) {
      return this.getMonthExpenses(month)
        .map((exp: Expense) => this.getAmount(exp))
        .reduce((sum, current) => sum + current);
    }
    else {
      return 0;
    }
  }

  getAmount = function (exp: Expense) {
    if (exp.interval == ExpensePeriod.Daily) {
      return exp.amount * 30;
    }
    else if (exp.interval == ExpensePeriod.Weekly) {
      return exp.amount * 4;
    }
    else if (exp.interval == ExpensePeriod.Monthly) {
      return exp.amount;
    }
    else if (exp.interval == ExpensePeriod.Quarterly) {
      return exp.amount / 3;
    }
    else if (exp.interval == ExpensePeriod.Yearly) {
      return exp.amount / 12;
    }
  }
  getMonthExpenses = function (month) {
    return this._expensesSVC.getExpenses().filter((exp: Expense) => exp.expenseStartDate.getMonth() <= month);
  }

  getCurrentYearTotalExpenses = function () {

  }


}
