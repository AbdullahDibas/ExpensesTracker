import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ExpensesDataService } from '../../services/expenses-data.service';
import { Expense } from '../../models/expense';
import { AddDailyExpenseComponent } from '../add-daily-expense/add-daily-expense.component';
import { ExpenseCategory } from '../../models/expense.category';
import { ExpenseCategoryDataService } from '../../services/expense-category-data.service';
import { ExpensePeriod } from '../../models/expense.period';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {

  @ViewChild(AddDailyExpenseComponent) addDailyExpenseComponent: AddDailyExpenseComponent;

  _expenses: Expense[];

  _isAddView: boolean = false;

  _newAddedExpense: Expense;

  _selectedExpense: Expense;

  _selectedExpensesIds: number[];

  ExpensePeriod : typeof ExpensePeriod = ExpensePeriod;  

  constructor(private expensesDataSVC: ExpensesDataService, private expCategorySVC: ExpenseCategoryDataService) { }

  ngOnInit() {
    this.expensesDataSVC.getExpenses()
     .subscribe(res => this._expenses = res);
  }

  onAddNew = function () {
    this._isAddView = true;
  }

  onNewAddedExpense = function () {
    this._isAddView = false;
    this._selectedExpense = null; 

    this.expensesDataSVC.getExpenses()
    .subscribe(res => this._expenses = res);
  }


  onCheckExpense = function (id) {
    if (!this._selectedExpensesIds) {
      this._selectedExpensesIds = new Array<number>();;
    }

    if (this._selectedExpensesIds.indexOf(id) > -1) {
      this._selectedExpensesIds.splice(this._selectedExpensesIds.indexOf(id, 0), 1);
    }
    else {
      this._selectedExpensesIds.push(id);
    }
  }

  onDeleteBtnClicked = function () {
    this._selectedExpensesIds.forEach(id => {
      this.expensesDataSVC.deleteExpense(id);
    });
    this._selectedExpensesIds = null;
    
    this.expensesDataSVC.getExpenses()
    .subscribe(res => this._expenses = res);
  }

  onSelect = function (expense: Expense) {
    this._selectedExpense = expense;
  }
}
