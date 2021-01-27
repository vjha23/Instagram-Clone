const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys')


// connecting to mongo db
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo');
})

mongoose.connection.on('error', (err) => {
    console.log("Error occured", err);
})
// connecting to mongo db -end

require('./modals/user')
require('./modals/post')

// for parsing the request to json
app.use(express.json())

// importing routes
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))





app.listen(PORT, () => { console.log('application started at port 5000') })