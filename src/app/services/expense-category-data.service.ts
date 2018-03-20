import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import { ExpenseCategory } from '../models/expense.category'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpenseCategoryDataService {

  _expensesCategoriesUrl: string = './assets/data/expenses.categories.json';

  _expensesCategories : ExpenseCategory[] = new Array<ExpenseCategory>();

  constructor(private _http: Http) { }

  getExpensesCategories = function () {
    /*return this._http.get(this._expensesCategoriesUrl)
      .map((res: Response) => <ExpenseCategory[]>res.json());*/
      return this._expensesCategories;
  }

  postNewExpenseCategory = function(expCategory : ExpenseCategory){
    this._expensesCategories.push(expCategory);
  }

  updateExpenseCategory = function(expCategory : ExpenseCategory){
      let category : ExpenseCategory = this._expensesCategories.filter((expCat) => expCat._id == expCategory._id)[0];
      category.title = expCategory.title; 
      category.parentCategoryId = expCategory.parentCategoryId; 
  }

  deleteExpenseCategory = function(id : number){ 
    this._expensesCategories.splice(this._expensesCategories
      .indexOf(this._expensesCategories.filter((expCat) => expCat._id == id)[0], 0), 1);
  }

  getExpCategoryId = function (categoryName) {
    return this._expensesCategories.filter((expCat) => expCat.title == categoryName)[0]._id;
  }

  getExpCategoryName = function(categoryId){
    return this._expensesCategories.filter((expCat) => expCat._id == categoryId)[0].title;
  }
}
