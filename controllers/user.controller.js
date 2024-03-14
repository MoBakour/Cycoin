const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");
const { createToken } = require("../middlewares/auth.js");
const signupValidator = require("../middlewares/validator.js");

router.post("/login", async (req, res) => {
    const { userName, userPassword } = req.body;
    try {
        const user = await User.findOne({ userName: userName });
        if (!user) throw Error("Who's dat? idk him");
        const userAuth = await bcrypt.compare(userPassword, user.userPassword);
        if (userAuth) {
            const token = await createToken(user._id.toString());
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 3 * 1000,
            });

            res.status(200).json({ success: true });
        } else {
            throw Error("Bad guess :/ try again");
        }
    } catch (err) {
        let loginErrors = {
            usernameError: "",
            passwordError: "",
            serverError: "",
        };
        if (err.message == "Who's dat? idk him") {
            loginErrors.usernameError = err.message;
        } else if (err.message == "Bad guess :/ try again") {
            loginErrors.passwordError = err.message;
        } else {
            console.error(err);
            loginErrors.serverError =
                "SERVER_ERROR\nI'm really sorry for that :(\nPlease refresh the page and try again";
        }
        res.status(400).json({ success: false, loginErrors });
    }
});

router.post("/signup", async (req, res) => {
    if (!req.body.userGender) req.body.userGender = "";
    let errorsObject = signupValidator(req.body);
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
            userRank: (await User.count()) + 1,
            userItems: [],
            userCoins: 0,
        };
        const { _id } = await User.create(userStructure);
        const token = await createToken(_id.toString());
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 3 * 1000,
        });

        res.status(200).json({ success: true });
    } catch (err) {
        if (err.code == 11000) {
            errorsObject.userNameError =
                "Someone took this username before you";
        }
        if (err.code !== 11000 && err.message !== "User validation failed") {
            console.log(err);
        }
        res.status(400).json({ success: false, errorsObject });
    }
});

router.post("/logout", (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 0 }).json({
        success: true,
    });
});

router.post("/edit", async (req, res) => {
    let { edit, username, password, newPassword, confirmPassword } = req.body;
    let userExists = await User.exists({ _id: req.user?._id });
    if (!userExists)
        return res.status(400).json({
            success: false,
            editError: "Process failed, refresh the page",
        });
    let originalPassword = req.user?.userPassword;
    let editError = "";
    let comparePassword, compareNew;
    comparePassword = await bcrypt.compare(password, originalPassword);
    switch (edit) {
        case "username":
            let { userNameError } = signupValidator({
                userName: username,
            });
            editError = userNameError;
            if (username == req.user?.userName)
                editError = "Same username doe?";
            if (!comparePassword) editError = "Not your password? u a thief?";
            if (editError != "")
                return res.status(400).json({ success: false, editError });
            try {
                await User.findOneAndUpdate(
                    { _id: req.user?._id },
                    { userName: username }
                );
            } catch (err) {
                if (err.code == 11000) {
                    editError = "Someone took that username before you";
                    return res.status(400).json({ success: false, editError });
                }
            }
            break;
        case "password":
            compareNew = await bcrypt.compare(newPassword, originalPassword);
            if (compareNew) editError = "Same password doe?";
            let { userPasswordError, userPasswordConfirmationError } =
                signupValidator({
                    userPassword: newPassword,
                    userPasswordConfirmation: confirmPassword,
                });
            if (userPasswordConfirmationError !== "")
                editError = userPasswordConfirmationError;
            if (userPasswordError !== "") editError = userPasswordError;
            if (!comparePassword) editError = "Not your password, u a thief?";
            if (editError != "")
                return res.status(400).json({ success: false, editError });
            let salt = await bcrypt.genSalt();
            newPassword = await bcrypt.hash(newPassword, salt);
            await User.findOneAndUpdate(
                { _id: req.user?._id },
                { userPassword: newPassword }
            );
            break;
        case "delete":
            if (!comparePassword)
                editError =
                    "Not your password, who's account r u tryna delete? ha?";
            if (username != req.user?.userName)
                editError = "Can't you tell your own username?";
            if (editError != "")
                return res.status(400).json({ success: false, editError });
            break;
    }
    res.status(200).json({ success: true });
});

router.post("/deleteaccount", async (req, res) => {
    try {
        await User.findOneAndDelete({ _id: req.user?._id });
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
});

module.exports = router;
