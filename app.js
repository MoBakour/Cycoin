// بسم الله الرحمن الرحيم
/*
    Hey you, what are you doing here >:( !!??
    GET OUT OF HERE THIS IS A RESTRICTED AREA!!!!
*/
/*
    JavaScript & Node.js gang
    Swordax Sy says hi 😎
    😎 AWPS 2021/2022 Seniors passed by 😎
*/
/*
    Cycoin project is a high-school seniors economy class project
    - Done by AWPS grade 12B1 boys 2021/2022 (contributers mentioned in the info.js file)
*/

// Require Packages
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const fs = require("fs");

// Require Exernal Middlewares
const User = require("./models/user.js");
const signupValidation = require("./middlewares/signupValidation.js");
const adminCommands = require("./middlewares/adminCommands.js");
const generators = require("./middlewares/generators.js");

// Initialize Express App
const app = express();

// App Settings and Packages Configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

// .env Variables
let DB_URI = process.env.DB_URI;
let PORT = process.env.PORT || 3000;
let SECRET = process.env.SECRET;
let COMMAND_PASS = process.env.COMMAND_PASS;

// App Variables
let currentUser, currentUser_id, currentUser_info, loggedIn;

// Connect to Database & Listen to Server Requests
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(result => app.listen(PORT))
.catch(err => console.log(err));

// Check Token On Each Request
app.use(async (req, res, next) => {
    loggedIn = false;
    currentUser = currentUser_id = currentUser_info = null;
    const token = req.cookies.jwt;
    if (token) {
        await jwt.verify(token, SECRET, async (err, decodedToken) => {
            if (!err) {
                currentUser = await User.findById(decodedToken.userId);
                if (currentUser) {
                    currentUser_id = currentUser._id;
                    currentUser_info = currentUser;
                    loggedIn = true;
                }
            }
        });
    }
    next();
});

// Authentication
function checkAuth(req, res, next) {
    if (loggedIn) {
        next();
    } else {
        res.render("home",  { user: currentUser_info });
    }
}

// Check If User Exists
async function checkUser(cred_type, cred) {
    let check;
    switch (cred_type) {
        case "id":
            check = await User.exists({ _id: cred });
        break;
        case "username":
            check = await User.exists({ userName: cred });
        break;
    }
    return check;
}

// Create JWT Token
async function createToken(req, res, userId) {
    let expireLimit = 60 * 60 * 24 * 3;
    const token = await jwt.sign({ userId }, SECRET, { expiresIn: expireLimit });
    res.cookie("jwt", token, { httpOnly: true, maxAge: expireLimit * 1000 });
}

// Auto Generate Functions
setInterval(generators.generateChangers, 1000 * 60 * 60 * 24);
setInterval(generators.generateRanking, 1000 * 60 * 5);

// Server Requests
// GET Requests
app.get("/", checkAuth, async (req, res) => {
    let { userBalance } = await generators.generateCycoin(currentUser_info.userItems, currentUser_id);
    res.render("app", { user: currentUser_info, userBalance });
});
app.get("/leaderboard", async (req, res) => {
    let leaderboardUsers = await generators.generateLeaderboard();
    res.render("leaderboard", { user: currentUser_info, leaderboardUsers });
});

// POST Requests
app.post("/login", async (req, res) => {
    const { userName, userPassword } = req.body;
    try {
        const user = await User.findOne({ userName: userName });
        if (!user) throw Error("Who's dat? idk him");
        const userAuth = await bcrypt.compare(userPassword, user.userPassword);
        if (userAuth) {
            await createToken(req, res, user._id.toString());
            res.status(200).json({ success: true });
        } else {
            throw Error("Bad guess :/ try again");
        }
    } catch (err) {
        let loginErrors = {
            usernameError: "",
            passwordError: "",
            serverError: ""
        }
        if (err.message == "Who's dat? idk him") {
            loginErrors.usernameError = err.message;
        } else if (err.message == "Bad guess :/ try again") {
            loginErrors.passwordError = err.message;
        } else {
            loginErrors.serverError = "SERVER_ERROR\nI'm really sorry for that :(\nPlease refresh the page and try again";
        }
        res.status(400).json({ success: false, loginErrors });
    }
});

app.post("/signup", async (req, res) => {
    if (!req.body.userGender) req.body.userGender = "";
    let errorsObject = await signupValidation(req.body);
    try {
        for (error in errorsObject) {
            if (errorsObject[error] !== "") {
                throw Error("User validation failed");
            }
        }
        const userStructure = {
            userName: req.body.userName,
            userPassword: req.body.userPassword,
            userGender: req.body.userGender,
            userVerified: false,
            userRank: await User.count() + 1,
            userItems: [],
            userCoins: 0
        }
        const { _id } = await User.create(userStructure);
        await createToken(req, res, _id.toString());
        res.status(200).json({ success: true });
    } catch(err) {
        if (err.code == 11000) {
            errorsObject.userNameError = "Someone took this username before you";
        }
        if (err.code !== 11000 && err.message !== "User validation failed") {
            console.log(err);
        }
        res.status(400).json({ success: false, errorsObject });
    }
});

app.post("/logout", (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 0 }).json({ success: true });
});

app.post("/edit", async (req, res) => {
    let { edit, username, password, newPassword, confirmPassword } = req.body;
    let userExists = await checkUser("id", currentUser_id);
    if (!userExists) return res.status(400).json({ success: false, editError: "Process failed, refresh the page" });
    let originalPassword = currentUser_info.userPassword;
    let editError = "";
    let comparePassword, compareNew;
    comparePassword = await bcrypt.compare(password, originalPassword);
    switch (edit) {
        case "username":
            let { userNameError } = await signupValidation({ userName: username });
            editError = userNameError;
            if (username == currentUser_info.userName) editError = "Same username doe?";
            if (!comparePassword) editError = "Not your password? u a thief?";
            if (editError != "") return res.status(400).json({ success: false, editError });
            try {
                await User.findOneAndUpdate({ _id: currentUser_id }, { userName: username });
            } catch(err) {
                if (err.code == 11000) {
                    editError = "Someone took that username before you";
                    return res.status(400).json({ success: false, editError });
                }
            }
        break;
        case "password":
            compareNew = await bcrypt.compare(newPassword, originalPassword);
            if (compareNew) editError = "Same password doe?";
            let { userPasswordError, userPasswordConfirmationError } = await signupValidation({ userPassword: newPassword, userPasswordConfirmation: confirmPassword });
            if (userPasswordConfirmationError !== "") editError = userPasswordConfirmationError;
            if (userPasswordError !== "") editError = userPasswordError;
            if (!comparePassword) editError = "Not your password, u a thief?";
            if (editError != "") return res.status(400).json({ success: false, editError });
            let salt = await bcrypt.genSalt();
            newPassword = await bcrypt.hash(newPassword, salt);
            await User.findOneAndUpdate({ _id: currentUser_id }, { userPassword: newPassword });
        break;
        case "delete":
            if (!comparePassword) editError = "Not your password, who's account r u tryna delete? ha?";
            if (username != currentUser_info.userName) editError = "Can't you tell your own username?";
            if (editError != "") return res.status(400).json({ success: false, editError });
        break;
    }
    res.status(200).json({ success: true });
});

app.post('/deleteaccount', async (req, res) => {
    try {
        await User.findOneAndDelete({ _id: currentUser_id });
        res.status(200).json({ success: true });
    } catch(err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
});

app.post("/additem", async (req, res) => {
    let itemWeight = req.body.weight;
    let userExists = await checkUser("id", currentUser_id);
    if (!userExists) return res.status(400).json({ success: false, editError: "Failed to add item, refresh the page" });
    if (itemWeight <= 0) {
        res.json({ success: false, editError: "Weighs less than a gram? cmon" });
    } else {
        try {
            const { userItems } = await User.findOneAndUpdate({ _id: currentUser_id }, { $push: { userItems: { itemWeight } } }, { new: true });
            const { userCoins, userBalance } = await generators.generateCycoin(userItems, currentUser_id);
            res.json({ success: true, dateInserted: userItems[userItems.length - 1].dateInserted, userCoins, userBalance });
        } catch(err) {
            console.log(err);
            res.json({ success: false, editError: "Failed to add item" });
        }
    }
});

app.post("/admin-command", (req, res) => { adminCommands(req, res, checkUser, COMMAND_PASS) });