const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json({limit: '50mb'}));
app.use(cors());

// ROUTES
app.get('/', (req, res) => {
    res.send('Proyecto 1 Seminario de Sistemas 1');
});

app.use('/student', require('./routes/student.js'));
app.use('/home', require('./routes/home.js'));

module.exports = app;