// Importing Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

// Initializing App
const app = express();

//Connecting To Database
mongoose.connect(config.DB.URL, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => {
    console.log('Connected To MongoDB');
})

db.on('error', (error) => {
    console.log(error);
});


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Stating Server
app.listen(config.PORT, () => {
    console.log("Server Started On Port " + config.PORT);
})


