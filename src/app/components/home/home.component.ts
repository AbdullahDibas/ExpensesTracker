import { Component, OnInit } from '@angular/core';
import { ExpensesDataService } from '../../services/expenses-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardsManagerService } from '../../services/dashboards-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _expensesService: ExpensesDataService,
    private _dashboarsManager: DashboardsManagerService) { }

  currentMonthTotalExp: number;
  currentYearTotalExp: number;
  monthWithTheHighestExp: number;
  expCategoryWithTheHighestExp: number;

  expenses = [];

  instantExpense: FormGroup = new FormGroup({
    expense: new FormControl()
  });

  ngOnInit() {
     this._expensesService.getExpenses() 
    .subscribe(res => {
      this.expenses = res;
      this.getDashboardsValues();
    });     
  }

  getDashboardsValues = function () {

    if (this.expenses && this.expenses.length) {
      this.currentMonthTotalExp = this._dashboarsManager.getCurrentMonthTotalExpenses();
      this.monthWithTheHighestExp = this._dashboarsManager.getHighestMonthInTheYear();
      this.expCategoryWithTheHighestExp = this._dashboarsManager.getHighestExpCategoryInTheMonth();
    }
  }

  value: any = new Object();
  onSubmit = function (amount) {
    this.value.Id = "5";
    this.value.Amount = amount.Amount.toString();
    this.value.Date = Date.now().toString();
    this.value.Description = " Test ";
    console.log(this.value);
    //update here the expense value to include description and date 
    this._expensesService.postExpense(this.value).subscribe(data => {
      console.log(data);
      this.expenses.push(data);
    });
  }
}
