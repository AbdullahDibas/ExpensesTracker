var Expense = require('../models/expense');
var _ = require('lodash');

module.exports = function (app) {

    app.get('/expenso', function (req, res) {

        Expense.find(function (err, expenses) {
            if (err) {
                res.json({ info: 'error during find expenses', error: err });
            };
            res.json({ info: 'expenses found successfully', data: expenses });
        });
    });

    app.post('/expenso', function (req, res) {
        //log('POST /expense', req.body);
        var newExpense = new Expense(req.body);
        newExpense.save(function (err, expense) {
            if (err) {
                res.json({ info: 'error during expense create', error: err });
            };
            res.json({ info: 'expense created successfully', data: expense });
        });
    });

    /* Update */
    app.put('/expenso/:id', function (req, res) {
      //  log('PUT /expense/:id', req.body);
        Expense.findById(req.params.id, function(err, expense) {
            if (err) {
                res.json({info: 'error during find expense', error: err});
            };
            if (expense) {
               // log('POST /expense', expense);
                _.merge(expense, req.body);
               // log('POST /expense', expense);
                expense.save(function(err) {
                    if (err) {
                        res.json({info: 'error during expense update', error: err});
                    };
                    res.json({info: 'expense updated successfully'});
                });
            } else {
                res.json({info: 'expense not found'});
            } 
        });
    });

    /* Delete */
    app.delete('/expenso/:id', function (req, res) {
     //   log('DELETE /expense/:id');
        Expense.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove expense', error: err});
            };
            res.json({info: 'expense removed successfully'});
        });
    });
}