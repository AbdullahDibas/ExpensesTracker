var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

console.log('inializing ExpenseCategory Schema');
var expenseCategorySchema = mongoose.Schema({
    _id : Number,
    title : String,
    parentCategoryId : Number
});

console.log('exporting ExpenseCategory Schema');

module.exports = mongoose.model('ExpenseCategory', expenseCategorySchema, 'ExpensesCategories');

console.log('exported ExpenseCategory Schema');