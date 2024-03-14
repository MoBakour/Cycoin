const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const generators = require("./middlewares/generators.js");
const { authenticate } = require("./middlewares/auth.js");

// controllers
const pagesController = require("./controllers/pages.controller.js");
const userController = require("./controllers/user.controller.js");
const itemsController = require("./controllers/items.controller.js");
const adminController = require("./controllers/admin.controller.js");

// Initialize Express App
const app = express();

// App Settings and Packages Configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

const PORT = parseInt(process.env.PORT || "3000");

// Connect to Database & Listen to Server Requests
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    })
    .catch((err) => console.log(err));

// authenticate requests
app.use(authenticate);

// Auto Generate Functions
setInterval(generators.generateChangers, 1000 * 60 * 60);
setInterval(generators.generateRanking, 1000 * 60);

// register routers
app.use(pagesController);
app.use(userController);
app.use(itemsController);
app.use(adminController);
