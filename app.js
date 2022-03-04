const express = require('express');
const path = require("path");
const app = express();

// app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'frontend')));

// app.use('/users', usersRouter);

app.listen(3000)
