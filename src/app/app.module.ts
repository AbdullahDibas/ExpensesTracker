import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { ExpensesCategoriesListComponent } from './components/expenses-categories-list/expenses-categories-list.component';
import { AppComponent } from './app.component';
import { ExpensesDataService } from './services/expenses-data.service';
import { ExpenseCategoryDataService } from './services/expense-category-data.service';
import { HomeComponent } from './components/home/home.component';
import { AddDailyExpenseComponent } from './components/add-daily-expense/add-daily-expense.component';
import { AddExpensesCategoryComponent } from './components/add-expenses-category/add-expenses-category.component';
import { FormFooterComponent } from './components/form-footer/form-footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    FormFooterComponent,
    HomeComponent,
    ExpensesListComponent,
    ExpensesCategoriesListComponent,
    AddDailyExpenseComponent,
    AddExpensesCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [ExpensesDataService, ExpenseCategoryDataService]
})
export class AppModule { }