//  npm i express body-parser
const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data/data')


const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.send("API Is Running");
});

app.get('/api/data', function (req, res) {
    res.json(data);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log("Server started on port 5000");
});