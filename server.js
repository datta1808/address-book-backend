require("dotenv").config();

const express = require("express");

// Configuring the database
const dbConfig = require("./config/database.config.js");

//Importing swagger-UI
const swaggerUI = require("swagger-ui-express");

//Importing swagger json file for using swagger docs
const swaggerDocs = require("./swagger/swagger.json");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

//using swagger UI
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Connecting to the database
dbConfig.databaseConnection();

// define a simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Address Book application." });
});

// Require User routes
require("./app/routes/routes.js")(app);

// listen for requests
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});

module.exports = app;
