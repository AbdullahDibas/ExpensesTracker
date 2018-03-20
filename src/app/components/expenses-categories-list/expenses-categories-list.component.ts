import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ExpenseCategoryDataService } from '../../services/expense-category-data.service';
import { ExpensesDataService } from '../../services/expenses-data.service';
import { ExpenseCategory } from '../../models/expense.category';
import { AddExpensesCategoryComponent } from '../add-expenses-category/add-expenses-category.component';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expenses-categories-list',
  templateUrl: './expenses-categories-list.component.html',
  styleUrls: ['./expenses-categories-list.component.css']
})
export class ExpensesCategoriesListComponent implements OnInit, AfterViewInit {

  @ViewChild(AddExpensesCategoryComponent) addDailyExpCategoryComponent: AddExpensesCategoryComponent;

  _expensesCategories: ExpenseCategory[];

  _selectedExpCategoriesIds: number[];

  _isAddView: boolean = false;

  _selectedExpCategory: ExpenseCategory = null;

  constructor(private _expensesCategoriesService: ExpenseCategoryDataService) { }

  ngOnInit() {
    this.setExpensesCategoriesList();
  }

  ngAfterViewInit() {

  }

  onAddNew = function () {
    this._isAddView = true;
  }
  onNewAddedExpenseCategory = function () {
    this._isAddView = false;
    this._selectedExpCategory = null;
    this.setExpensesCategoriesList();
  }

  onCheckCategory = function (id) {
    if (!this._selectedExpCategoriesIds) {
      this._selectedExpCategoriesIds = new Array<number>();;
    }

    if (this._selectedExpCategoriesIds.indexOf(id) > -1) {
      this._selectedExpCategoriesIds.splice(this._selectedExpCategoriesIds.indexOf(id, 0), 1);
    }
    else {
      this._selectedExpCategoriesIds.push(id);
    }
  }

  onDeleteBtnClicked = function () {
    this._selectedExpCategoriesIds.forEach(id => {
      this._expensesCategoriesService.deleteExpenseCategory(id); 
    });
    this._selectedExpCategoriesIds = null;
    this.setExpensesCategoriesList();
  }

  setExpensesCategoriesList = function () {
    /*this._expensesCategoriesService.getExpensesCategories()
    .subscribe(res => this._expensesCategories = res);*/
    this._expensesCategories = this._expensesCategoriesService.getExpensesCategories();
  }

  onSelect = function (expenseCat: ExpenseCategory) {
    this._selectedExpCategory = expenseCat;
  }
}
