import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Expense } from '../models/expense'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpensesDataService {

  private _expenseDataURL: string = './assets/data/expenses.json';
  private _expenses = new Array<Expense>();

  expString: string;

  constructor(private _http: Http) { }

  getExpenses = function () {
   /* return this._http.get(this._expenseDataURL)
      .map((res: Response) => <Expense[]>res.json());*/
      return this._expenses;
  }

  postExpense = function (expense) {
    this._expenses.push(expense);
    /*let headers = new Headers({ 'Content-Type': 'application/json' });

    headers.append("Accept", 'application/json');

    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify(expense);

    console.log(body);

    return this._http.post('http://localhost:4200/assets/data/expenses.json', body, options)
      .map((res: Response) => res.json());*/
  }

  updateExpense = function(expense : Expense){
    let updatedExpense : Expense = this._expenses.filter((exp) => exp._id == expense._id)[0];
    updatedExpense.title = updatedExpense.title; 
    updatedExpense.amount = updatedExpense.amount; 
    updatedExpense.interval = updatedExpense.interval; 
    updatedExpense.expenseCategoryId = updatedExpense.expenseCategoryId; 
  }

  deleteExpense = function(id : number){ 
    this._expenses.splice(this._expenses
      .indexOf(this._expenses.filter((exp) => exp._id == id)[0], 0), 1);
  }
}
