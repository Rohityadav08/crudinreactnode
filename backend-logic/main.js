require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const user_router = require("./router/user_router");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

app.use(user_router);

app.listen(port, function(){
    console.log(`Server listening on ${port}`);
});