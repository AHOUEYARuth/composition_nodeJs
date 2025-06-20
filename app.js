require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const reviewRouter = require('./routes/reviews');


const mongoose = require("mongoose");


mongoose.connect(process.env.DB_URL).then(() => console.log("connected !"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/reviews", reviewRouter);


module.exports = app;


