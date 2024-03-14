const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth.js");
const generators = require("../middlewares/generators.js");

router.get("/", checkAuth, async (req, res) => {
    let { userBalance } = await generators.generateCycoin(
        req.user.userItems,
        req.user.id
    );
    res.render("app", { user: req.user, userBalance });
});

router.get("/leaderboard", async (req, res) => {
    let leaderboardUsers = await generators.generateLeaderboard();
    res.render("leaderboard", { user: req.user, leaderboardUsers });
});

module.exports = router;
