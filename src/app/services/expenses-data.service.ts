import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Expense } from '../models/expense'
import 'rxjs/add/operator/map'

@Injectable()
export class ExpensesDataService {

  private _expenseDataURL: string = "/expenso"; // './assets/data/expenses.json';
  private _expenses = new Array<Expense>();

  expString: string;

  constructor(private _http: Http) { }

  public getExpenses() {
   let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    
    return this._http.get(this._expenseDataURL, options)
      .map((res: Response) => <Expense[]>res.json().data);
  }

  public postExpense (expense : Expense) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(expense);
    console.log(body);

    return this._http.post(this.handleUrl(this._expenseDataURL) , body, options)
      .map((res: Response) =>
       res.json().data);
  }

  public updateExpense (expense: Expense) {
    /*let updatedExpense: Expense = this._expenses.filter((exp) => exp._id == expense._id)[0];
    updatedExpense.title = updatedExpense.title;
    updatedExpense.amount = updatedExpense.amount;
    updatedExpense.interval = updatedExpense.interval;
    updatedExpense.expenseCategoryId = updatedExpense.expenseCategoryId;*/

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this._http.put(this.handleUrl(this._expenseDataURL)  + '/' + expense._id
    , JSON.stringify(expense), options).toPromise();
  }

  public deleteExpense (id: number) { 
    return this._http.delete(this.handleUrl(this._expenseDataURL) + '/' +  id)
    .toPromise().then(res => console.log(res.json()));   
  }

  private handleUrl(url: string): string {
    if (!this.checkUrlExternal(url)) {
      if (url.charAt(0) == '/') url = url.substring(1);
      url = "http://localhost:3000/" + url;
    }
    return url;
  }

  private checkUrlExternal(url: string): boolean {
    return /^(?:[a-z]+:)?\/\//i.test(url);
  }
}
