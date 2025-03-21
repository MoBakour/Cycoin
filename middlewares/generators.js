// Require Packages
const User = require("../models/user.model.js");
const fs = require("fs");

// Variables
let usersCount, usersNumber;
async function getUsersCount() {
    try {
        usersCount = await User.count();
        usersNumber = usersCount <= 100 ? usersCount : 100;
    } catch (err) {
        console.error(err);
    }
}

// Generate Ranking Function
async function generateRanking() {
    try {
        let allUsers = await User.find();
        allUsers.sort((a, b) => {
            return b.userCoins - a.userCoins;
        });
        for (let i = 0; i < allUsers.length; i++) {
            await User.findOneAndUpdate(
                { _id: allUsers[i]._id },
                { userRank: i + 1 }
            );
        }
    } catch (err) {
        console.error(err);
    }
}

// Generate Leaderboard
async function generateLeaderboard() {
    try {
        await getUsersCount();
        let leaderboardUsers = [];
        let incRank = 1;
        for (let i = 0; i < usersNumber; i++) {
            const userInfo = await User.findOne({ userRank: i + incRank });
            if (!userInfo) {
                leaderboardUsers.push("undefined");
                i--;
                incRank++;
            } else {
                leaderboardUsers.push(userInfo);
            }
        }
        return leaderboardUsers;
    } catch (err) {
        console.error(err);
    }
}

// Fill Changers File
async function generateChangers() {
    try {
        let rand_chng = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
        let useRate_chng = [200, 250, 300, 350, 400][
            Math.floor(Math.random() * 5)
        ];
        let newChangers = `${rand_chng} splitter ${useRate_chng}`;
        fs.writeFileSync("internalDatabase/changers.txt", newChangers);
        return newChangers;
    } catch (err) {
        console.error(err);
    }
}

// Generate Cycoin Function
async function generateCycoin(items, userId) {
    try {
        // get current user items total weight
        let grams = 0;
        for (key in items) {
            grams += items[key].itemWeight;
        }

        // generate changers
        let data = fs.readFileSync("internalDatabase/changers.txt", {
            encoding: "utf-8",
        });
        if (data == "" || data == "prevalue") {
            data = await generateChangers();
        }
        let changersArr = data.split(" splitter ");
        let changers = {
            rand: changersArr[0],
            useRate: changersArr[1],
        };

        // coins
        let userCoins = Math.round(grams / 10 + items.length);

        // balance
        let userBalance = (
            userCoins *
            (changers.rand / changers.useRate)
        ).toFixed(2);

        // function outputs
        await User.findByIdAndUpdate(userId, { userCoins });
        return { userCoins, userBalance };
    } catch (err) {
        console.error(err);
    }
}

// Export Functions
module.exports = {
    generateRanking,
    generateLeaderboard,
    generateChangers,
    generateCycoin,
};
