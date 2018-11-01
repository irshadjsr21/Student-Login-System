// Importing Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

// Importing Custom Middlewares
const addUserMiddleware = require('./middlewares/addUser'); 
const checkAuthenticationMiddleware = require('./middlewares/checkAuthentication');

// Importing Routers
const studentAuthRouter = require('./routes/studentAuth');
const teacherAuthRouter = require('./routes/teacherAuth');
const teacherRequestsRouter = require('./routes/teacherRequests');
const studentRequestsRouter = require('./routes/studentRequests');

// Initializing App
const app = express();

//Connecting To Database
mongoose.connect(config.DB.URL, { useNewUrlParser: true , useCreateIndex: true});
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
app.use(addUserMiddleware);

// Routes
app.use('/api/auth/student', studentAuthRouter);
app.use('/api/auth/teacher', teacherAuthRouter);
app.use('/api/teacher', checkAuthenticationMiddleware('teacher') ,teacherRequestsRouter)

app.use('/api/student', checkAuthenticationMiddleware('student') ,studentRequestsRouter)

// Stating Server
app.listen(config.PORT, () => {
    console.log("Server Started On Port " + config.PORT);
})


