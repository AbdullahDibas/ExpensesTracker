import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { ExpenseCategory } from '../models/expense.category'
import 'rxjs/add/operator/map'

@Injectable()
export class ExpenseCategoryDataService {

  _expensesCategoriesUrl: string = '/expensocategory';

  _expensesCategories: ExpenseCategory[] = new Array<ExpenseCategory>();

  constructor(private _http: Http) { 
    this.getExpensesCategories()
    .subscribe(res => this._expensesCategories = res);
  }

  public getExpensesCategories() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
 
    return this._http.get(this.handleUrl(this._expensesCategoriesUrl), options)
      .map((res: Response) => this._expensesCategories = <ExpenseCategory[]>res.json().data);
  }

  public postNewExpenseCategory(expCategory: ExpenseCategory) { 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(expCategory);
    console.log(body);

    return this._http.post(this.handleUrl(this._expensesCategoriesUrl), body, options)
      .map((res: Response) =>
      this._expensesCategories = <ExpenseCategory[]>res.json().data);
  }

  public updateExpenseCategory(expCategory: ExpenseCategory) {
    /*let category: ExpenseCategory = this._expensesCategories.filter((expCat) => expCat._id == expCategory._id)[0];
    category.title = expCategory.title;
    category.parentCategoryId = expCategory.parentCategoryId;*/

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this._http.put(this.handleUrl(this._expensesCategoriesUrl) + '/' + expCategory._id,
     JSON.stringify(expCategory), options).toPromise();
  }

  public deleteExpenseCategory(id: number) {
    this._http.delete(this.handleUrl(this._expensesCategoriesUrl) + '/' + id).toPromise();
  }

  public getExpCategoryId(categoryName) {
    let categoryId: any;
    return this.getExpensesCategories()
      .map(res => res.filter((expCat) => expCat.title == categoryName)[0]._id); 
  }

  public getExpCategoryName(categoryId) { 
    return this._expensesCategories.filter((expCat) => expCat._id == categoryId)[0].title;    
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
