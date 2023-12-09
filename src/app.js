const express = require("express");
const dotenv = require("dotenv");
const authController = require("./api/auth/auth.controller");

const cors = require("cors");


dotenv.config();

const cors_options = require("./config/cors.config");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors(cors_options));

app.get(`/`, (req,res) => {
    res.send("oke");
});

app.use(`/api/auth`, authController);




module.exports = app;