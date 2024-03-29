const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swagger_options = require("./config/swagger.config");


const authController = require("./api/auth/auth.controller");
const eventController = require("./api/event/event.controller");
const profileController = require("./api/profile/profile.controller");
const ticketController = require("./api/ticket/ticket.controller");



const cors = require("cors");


dotenv.config();


const cors_options = require("./config/cors.config");

const app = express();
const specs = swaggerJsdoc(swagger_options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
  })
);


app.use(function (req, res, next) {
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
  
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
  
    // Pass to next layer of middleware
    next();
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));


app.use(cors(cors_options));

app.get(`/`, (req,res) => {
    res.send("Welcome to Meetzy's API");
});

app.use(`/api/auth`, authController);
app.use(`/api/events`, eventController);
app.use(`/api/profile`, profileController);
app.use(`/api/tickets`, ticketController);





module.exports = app;