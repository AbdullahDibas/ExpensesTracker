var mognoose = require('mongoose');

mognoose.Promise = global.Promise;

console.log('inializing ExpenseCategoryDetails Schema');

var expenseCategoryDetailsSchema= mognoose.Schema({
    categoryId : Number 
});

console.log('exporting ExpenseCategoryDetails Schema');

module.exports = mognoose.model('ExpenseCategoryDetails', expenseCategoryDetailsSchema, 'ExpensesCategoriesDetails');

console.log('exported ExpenseCategoryDetails Schema');