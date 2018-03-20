import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ExpenseCategory } from '../../models/expense.category';
import { ExpenseCategoryDataService } from '../../services/expense-category-data.service';
import { ExpensePeriod } from '../../models/expense.period';
import { FormFooterComponent } from '../form-footer/form-footer.component';

@Component({
  selector: 'app-add-expenses-category',
  templateUrl: './add-expenses-category.component.html',
  styleUrls: ['./add-expenses-category.component.css'],
  inputs: ["expenseCategory"],
  outputs: ["onSubmit", "onCancel"]
})
export class AddExpensesCategoryComponent implements OnInit {

  // events emitters
  onSubmit = new EventEmitter<ExpenseCategory>();
  onCancel = new EventEmitter();

  expenseCategoryFG: FormGroup;

  expenseCategory: ExpenseCategory;

  availableExpensesCategories: ExpenseCategory[];
  
  constructor(private _expenseCategroyDataSVC: ExpenseCategoryDataService) { }

  ngOnInit() {
    // get available expenses categories
    this.availableExpensesCategories = this._expenseCategroyDataSVC.getExpensesCategories();
    /*this._expenseCategroyDataSVC.getExpensesCategories()
    .subscribe(res => this._expensesCategories = res); */

    this.expenseCategoryFG = new FormGroup({
      description: new FormControl(this.expenseCategory ? this.expenseCategory.title : ""),
      expenseCategoryId: new FormControl()
    });
  }


  onCategoryAdded = function (value) {
    let isNew: boolean = !this.expenseCategory;

    this.expenseCategory = isNew ? new ExpenseCategory() : this.expenseCategory;

    this.expenseCategory.title = value.description;

    if (value.expenseCategoryId) {
      this.expenseCategory.parentCategoryId = this._expenseCategroyDataSVC.getExpCategoryId(value.expenseCategoryId);
    }

    if (isNew) {
      this.expenseCategory._id = this.availableExpensesCategories
        && this.availableExpensesCategories.length > 0 ?
        this.availableExpensesCategories[this.availableExpensesCategories.length - 1]._id + 1 : 1;

      this._expenseCategroyDataSVC.postNewExpenseCategory(this.expenseCategory);
    }
    else {
      this._expenseCategroyDataSVC.updateExpenseCategory(this.expenseCategory);
    }

    this.onSubmit.emit(this.expenseCategory);
  } 
}
