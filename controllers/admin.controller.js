const express = require("express");
const fs = require("fs");
const User = require("../models/user.model.js");
const generators = require("../middlewares/generators.js");

const router = express.Router();

router.post("/admin-command", async (req, res) => {
    let { command, username, password } = req.body;
    if (username) {
        if (username.startsWith("@")) username = username.slice(1);
    }
    let userExists = await User.exists({ userName: username });
    let success = false;
    let returns = null;
    if (command.endsWith("user") && !userExists) return res.json({ success });
    if (password == process.env.COMMAND_PASS) {
        switch (command) {
            case "delete-user":
                await User.findOneAndDelete({ userName: username });
                success = true;
                break;
            case "verify-user":
                await User.findOneAndUpdate(
                    { userName: username },
                    { userVerified: true }
                );
                success = true;
                break;
            case "unverify-user":
                await User.findOneAndUpdate(
                    { userName: username },
                    { userVerified: false }
                );
                success = true;
                break;
            case "clear-user":
                await User.findOneAndUpdate(
                    { userName: username },
                    { userItems: [], userCoins: 0 }
                );
                success = true;
                break;
            case "get-user":
                const gotUser = await User.findOne({ userName: username });
                const { userBalance } = await generators.generateCycoin(
                    gotUser.userItems,
                    gotUser._id
                );
                returns = {
                    Username: gotUser.userName,
                    Gender: gotUser.userGender,
                    Rank: gotUser.userRank,
                    Items: gotUser.userItems.length,
                    Coins: gotUser.userCoins,
                    Balance: userBalance,
                    Created: gotUser.createdAt,
                };
                success = true;
                break;
            case "get-changers":
                const data = fs.readFileSync("internalDatabase/changers.txt", {
                    encoding: "utf-8",
                });
                if (data) {
                    let arrangedData = data.split(" splitter ");
                    returns = {
                        Rand: arrangedData[0],
                        User_Rate: arrangedData[1],
                    };
                    success = true;
                }
                break;
            case "generate-changers":
                await generators.generateChangers();
                success = true;
                break;
            case "generate-ranking":
                await generators.generateRanking();
                success = true;
                break;
            case "generate":
                await generators.generateChangers();
                await generators.generateRanking();
                success = true;
                break;
            case "test":
                success = true;
                break;
            case "info":
                success = true;
                returns = {
                    "delete-user":
                        "deletes a user, takes parameters (command-name, username, admin-password)",
                    "verify-user":
                        "verifies a user, takes parameters (command-name, username, admin-password)",
                    "unverify-user":
                        "unverifies a user, takes parameters (command-name, username, admin-password)",
                    "clear-user":
                        "clears user items, coins, and balance, takes parameters (command-name, username, admin-password)",
                    "get-user":
                        "gets user information, such as username, gender, coins, etc.., takes parameters (command-name, username, admin-password)",
                    "get-changers":
                        "gets application balance generating algorithm current changers, takes parameters (command-name, admin-password)",
                    "generate-changers":
                        "immediately generates new application balance algorithm changers, takes parameters (command-name, admin-password)",
                    "generate-ranking":
                        "immediately generates and updates the new user ranking, takes parameters (command-name, admin-password)",
                    generate:
                        "does both generate-changers and generate-ranking at once, takes parameters (command-name, admin-password)",
                    test: "test command meant for testing admin commands, does not do any task, takes parameters (command-name, admin-password)",
                    info: "admin info center, provides reference to all admin commands, takes parameters (command-name, admin-password)",
                };
                break;
        }
    }
    res.json({ success, returns });
});

module.exports = router;
