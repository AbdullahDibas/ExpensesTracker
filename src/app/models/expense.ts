import { ExpensePeriod } from './expense.period';

export class Expense{
    _id : string;
    title : string;
    expenseCategoryId : number;
    amount : number;
    date : Date;
    expenseStartDate : Date;
    interval : ExpensePeriod;
}