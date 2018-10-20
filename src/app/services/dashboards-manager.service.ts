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


  _allExpenses: Expense[];
  _allExpenseCategories: ExpenseCategory[];

  constructor(private _http: Http,
    private _expensesSVC: ExpensesDataService,
    private _expCategoriesSVC: ExpenseCategoryDataService) {

    this._expensesSVC.getExpenses()
      .subscribe(res => this._allExpenses = res);

    this._expCategoriesSVC.getExpensesCategories()
      .subscribe(res => this._allExpenseCategories = res);
  }

  getHighestMonthInTheYear = function () { 
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
      = this._allExpenses.filter((exp: Expense) => new Date(exp.expenseStartDate).getMonth() <= currentMonth);

    if (currentMonthExpenses.length > 0) {
      let categoriesAmounts: Map<number, number> = this.getMonthCategoriesAmounts(currentMonth);
      if (categoriesAmounts) {
        var maxCategoryAmount: string = "";
        let _array = Array.from(categoriesAmounts.values());
        var categoryIdAmount = _array.reduce((a, b) => Math.max(a, b));

        categoriesAmounts.forEach((v, k, m) => {
          if (v == categoryIdAmount) {
            if (maxCategoryAmount != "") {
              maxCategoryAmount += ", ";
            }
            maxCategoryAmount += this._expCategoriesSVC.getExpCategoryName(k);
          }
        });
        
        return maxCategoryAmount;
      }
    }
    else {
      return "";
    }
  }

  getMonthCategoriesAmounts = function (month) {
    let monthExpenses: Expense[] = this.getMonthExpenses(month);
    let monthExpensesCategoriesIds: Set<number>;
    let kvp: Map<number, number> = new Map<number, number>();

    if (monthExpenses.length > 0) {

      // get distinct expenses categories in the month.
      monthExpensesCategoriesIds = new Set(monthExpenses.map((exp) => exp.expenseCategoryId));
      if (monthExpensesCategoriesIds.size > 0) {
        Array.from(monthExpensesCategoriesIds).forEach((id) =>

          // build a Map: Key: Category ID, Value: Category expenses total amount in the month.
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
    if (this._allExpenses && this._allExpenses.length > 0 && this._allExpenses.filter((exp: Expense) => 
    new Date(exp.expenseStartDate).getMonth() <= month).length > 0) {
      return Math.round(this.getMonthExpenses(month)
        .map((exp: Expense) => this.getAmount(exp))
        .reduce((sum, current) => sum + current));
    }
    else {
      return 0;
    }
  }

  getAmount = function (exp: Expense) {
    if (exp.intervalId == ExpensePeriod.Daily) {
      return exp.amount * 30;
    }
    else if (exp.intervalId == ExpensePeriod.Weekly) {
      return exp.amount * 4;
    }
    else if (exp.intervalId == ExpensePeriod.Monthly) {
      return exp.amount;
    }
    else if (exp.intervalId == ExpensePeriod.Quarterly) {
      return exp.amount / 3;
    }
    else if (exp.intervalId == ExpensePeriod.Yearly) {
      return exp.amount / 12;
    }
  }
  getMonthExpenses = function (month) {
    return this._allExpenses.filter((exp: Expense) => new Date(exp.expenseStartDate).getMonth() <= month);
  }

  getCurrentYearTotalExpenses = function () {

  }


}
