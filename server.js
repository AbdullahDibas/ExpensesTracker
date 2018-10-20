const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');
const port = 3000;
const app = express();

// this will give express the access to dist folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// to use the route api defined above when /api is mentioned.
//app.use('/api', api);
var router = express.Router();
app.use('/', router);

var mongoUri = 'mongodb://AbdullahDibas:Abd%400797048377@ds231987.mlab.com:31987/gtm';

//var mongoUri = process.env.MONGO_URI || 'mongodb://localhost/gtm';

console.log(mongoUri);
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(mongoUri).then(function (db) {
    console.log("Connecting to DB");
    // Provisional code, for runing db.dropDatabase() every sunday
    if (new Date().getDay() == 0) {
        mongoose.connection.db.dropDatabase(function () {
            console.log("db droped");
        });
    }
}).catch(function (err) {
    log('Unabled to connect to mongodb err:', err);
    log('Check if MongoDB Server is running and available.');
});


// to handle any matching path other than api 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});
  
var expenses = require('./api/routes/expense.routes')(router);
var expensesCategories = require('./api/routes/expense.category.routes')(router); 
 
app.listen(port, function () {
    console.log("Server running on localhost on port: " + port);
});
