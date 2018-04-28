import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http'; 
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpensesDataService } from './services/expenses-data.service';
import { ExpenseCategoryDataService } from './services/expense-category-data.service'; 
import { DashboardsManagerService } from './services/dashboards-manager.service';
import { LoginComponent } from './login/login.component';
import { CanActivateViaAuthGaurdService } from './services/can-activate-via-auth-gaurd.service';
import { AuthService } from './services/auth.service';
import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { AppModule } from './app.module';
 
@NgModule({
  declarations: [    
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MainRoutingModule,
    AppModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    DashboardsManagerService,
    ExpensesDataService,
    ExpenseCategoryDataService,
    CanActivateViaAuthGaurdService,
    AuthService],
  bootstrap: [MainComponent]
})
export class MainModule { }
