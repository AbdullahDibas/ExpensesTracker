var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

console.log('inializing Expense Schema');
var expenseSchema = mongoose.Schema({
    _id : String,
    title : String,
    expenseCategoryId : Number,
    amount : Number,
    date : Date,
    expenseStartDate : Date,
    intervalId : Number
});

console.log('exporting Expense Schema');

module.exports = mongoose.model('Expense', expenseSchema, 'Expenses');

console.log('exported Expense Schema');