import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {AddDailyExpenseComponent} from './components/add-daily-expense/add-daily-expense.component';
import { HomeComponent } from './components/home/home.component';  
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddExpensesCategoryComponent } from './components/add-expenses-category/add-expenses-category.component'; 
import { ExpensesDataService } from './services/expenses-data.service';
import { ExpenseCategoryDataService } from './services/expense-category-data.service';
import { ExpensesCategoriesListComponent } from './components/expenses-categories-list/expenses-categories-list.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { FormFooterComponent } from './components/form-footer/form-footer.component'
import { DashboardsManagerService } from './services/dashboards-manager.service';

const appRoutes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'ExpensesList', component: ExpensesListComponent},
  {path: 'ExpensesCategories', component: ExpensesCategoriesListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddDailyExpenseComponent,
    AddExpensesCategoryComponent,
    ExpensesCategoriesListComponent,
    ExpensesListComponent,
    FormFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DashboardsManagerService, ExpensesDataService, ExpenseCategoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
