import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseCategoryDataService } from '../../services/expense-category-data.service'
import { ExpenseCategory } from '../../models/expense.category'
import { Expense } from '../../models/expense';
import { ExpensesDataService } from '../../services/expenses-data.service';
import { ExpensePeriod } from '../../models/expense.period';

@Component({
  selector: 'app-add-daily-expense',
  templateUrl: './add-daily-expense.component.html',
  styleUrls: ['./add-daily-expense.component.css'],
  inputs: ["expense"],
  outputs: ["onSubmit", "onCancel"]
})

export class AddDailyExpenseComponent implements OnInit {

  onSubmit = new EventEmitter<Expense>();

  onCancel = new EventEmitter();

  expense: Expense;

  expenseFG: FormGroup;

  currentDate : Date;

  availableExpensesCategories: ExpenseCategory[];

  expensePeriodsLOV: string[] = Object.keys(ExpensePeriod)
    .filter(p => typeof ExpensePeriod[p as any] === "number");

  ExpensePeriod : typeof ExpensePeriod = ExpensePeriod;
    
  constructor(private expCategoriesService: ExpenseCategoryDataService, private expService: ExpensesDataService) { }

  ngOnInit(): void {
    /*this.expCategoriesService.getExpensesCategories()
      .subscribe(res => this._expensesCategories = res);*/
    this.availableExpensesCategories = this.expCategoriesService.getExpensesCategories();

    this.currentDate = new Date();
    this.expenseFG = new FormGroup({
      amount: new FormControl(this.expense ? this.expense.amount : ""),
      title: new FormControl(this.expense ? this.expense.title : ""),
      expenseStartDate: new FormControl(),
      isPeriodic: new FormControl(this.expense ? this.expense.interval != ExpensePeriod.None : false ),
      periodType: new FormControl(),
      expenseCategoryId: new FormControl()/*,
        excludedDays: new FormGroup({
          sunday: new FormControl(),
          monday: new FormControl(),
          tuesday: new FormControl(),
          wednesday: new FormControl(),
          thursday: new FormControl(),
          friday: new FormControl(),
          saturday: new FormControl()
        })*/
    });
  }

  onExpenseAdded = function (value) {
    console.log(value);

    let isNew: boolean = !this.expense;

    this.expense = isNew ? new Expense() : this.expense;

    this.expense.title = value.title;

    this.expense.amount = parseFloat(value.amount);

    this.expense.date = new Date();
 
    this.expense.expenseStartDate = new Date(value.expenseStartDate);

    if (value.periodType) {
      this.expense.interval = ExpensePeriod[value.periodType];
    }

    if (value.expenseCategoryId) {
      this.expense.expenseCategoryId = this.expCategoriesService.getExpCategoryId(value.expenseCategoryId);
    }

    if (isNew) {
      this.expense._id = Math.floor(Math.random() * 100);

      this.expService.postExpense(this.expense);
    }
    else {
      this.expService.updateExpense(this.expense);
    }

    this.onSubmit.emit(this.expense);
  }
}
