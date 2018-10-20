import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CanActivateViaAuthGaurdService } from './services/can-activate-via-auth-gaurd.service';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './components/home/home.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { ExpensesCategoriesListComponent } from './components/expenses-categories-list/expenses-categories-list.component';

const appRoutes: Routes = [
    {
        path: '',
        component: AppComponent,
        canActivate: [CanActivateViaAuthGaurdService],
        children: [
            { path: '', component: HomeComponent },
            { path: 'ExpensesList', component: ExpensesListComponent },
            { path: 'ExpensesCategories', component: ExpensesCategoriesListComponent }/*,
        { path: '*', component: HomeComponent }*/]
    },
    { path: 'Login', component: LoginComponent }/*,
    {
        path: '*', loadChildren: 'app/app.module#AppModule',
        canActivate: [CanActivateViaAuthGaurdService]
    }*/
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
