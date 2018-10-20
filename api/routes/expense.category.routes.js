var ExpenseCategory = require('../models/expense.category');
var _ = require('lodash');

module.exports = function (app) {
    app.get('/expensocategory', function (req, res) {
        ExpenseCategory.find(function (err, expenseCategories) {
            if (err) {
                res.json({ info: 'error during find expenses categories', error: err });
            };
            res.json({ info: 'expenses categories found successfully', data: expenseCategories });
        });
    });

    app.post('/expensocategory', function (req, res) {
      //  log('POST /expenses categories', req.body);
        var newExpenseCategory = new ExpenseCategory(req.body);
        newExpenseCategory.save(function (err, expenseCategory) {
            if (err) {
                res.json({ info: 'error during expenses categories create', error: err });
            };
            res.json({ info: 'expenses categories created successfully', data: expenseCategory });
        });
    });

    app.put('/expensocategory/:id', function (req, res) {
       // log('PUT /expensecategory/:id', req.body);
        ExpenseCategory.findById(req.params.id, function (err, expenseCategory) {
            if (err) {
                res.json({ info: 'error during find expenses categories', error: err });
            };
            if (expenseCategory) {
               // log('POST /expensecategory', expenseCategory);
                _.merge(expenseCategory, req.body);
              //  log('POST /expensecategory', expenseCategory);
                expenseCategory.save(function (err) {
                    if (err) {
                        res.json({ info: 'error during expenses categories update', error: err });
                    };
                    res.json({ info: 'expenses categories updated successfully' });
                });
            } else {
                res.json({ info: 'expenses categories not found' });
            }
        });
    });

    app.delete('/expensocategory/:id', function (req, res) {
      //  log('DELETE /expensecategory/:id');
        ExpenseCategory.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error during remove expenses categories', error: err });
            };
            res.json({ info: 'expenses categories removed successfully' });
        });
    });
};