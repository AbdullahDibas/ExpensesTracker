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

  currentDate: Date;

  availableExpensesCategories: ExpenseCategory[];

  expensePeriodsLOV: string[] = Object.keys(ExpensePeriod)
    .filter(p => typeof ExpensePeriod[p as any] === "number");

  ExpensePeriod: typeof ExpensePeriod = ExpensePeriod;

  constructor(private expCategoriesService: ExpenseCategoryDataService, private expService: ExpensesDataService) { }

  ngOnInit(): void {
    this.expCategoriesService.getExpensesCategories()
      .subscribe(res => this.availableExpensesCategories = res);
    //.subscribe(res => console.log(res.toString()));
    // this.availableExpensesCategories = this.expCategoriesService.getExpensesCategories();

    this.currentDate = new Date();
    this.expenseFG = new FormGroup({
      amount: new FormControl(this.expense ? this.expense.amount : ""),
      title: new FormControl(this.expense ? this.expense.title : ""),
      expenseStartDate: new FormControl(this.expense? this.expense.expenseStartDate : new Date()),
      isPeriodic: new FormControl(this.expense ? this.expense.intervalId != ExpensePeriod.None : false),
      periodType: new FormControl(this.expense ? this.expensePeriodsLOV[this.expense.intervalId.toString()] : ExpensePeriod.None.toString()),
      expenseCategoryId: new FormControl(this.expense ? this.expense.expenseCategoryId : -1)
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
      this.expense.intervalId = ExpensePeriod[value.periodType];
    }

    let that = this;

    if (value.expenseCategoryId) {
      if (isNew) {
        this.expCategoriesService.getExpCategoryId(value.expenseCategoryId).subscribe(res => {
          that.expense.expenseCategoryId = res;
          that.expense._id = Math.floor(Math.random() * 100);
          that.expService.postExpense(that.expense)
            .subscribe(res => that.onSubmit.emit(that.expense));
        });
      }
      else {
        that.expService.updateExpense(that.expense)
          .then(res => that.onSubmit.emit(that.expense));
      }
    }
  }
}
