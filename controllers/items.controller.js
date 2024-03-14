const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const { checkUser } = require("../middlewares/auth.js");
const generators = require("../middlewares/generators.js");

router.post("/additem", async (req, res) => {
    let itemWeight = req.body.weight;
    let userExists = await checkUser(req.user?._id);
    if (!userExists)
        return res.status(400).json({
            success: false,
            editError: "Failed to add item, refresh the page",
        });
    if (itemWeight <= 0) {
        res.json({
            success: false,
            editError: "Weighs less than a gram? cmon",
        });
    } else {
        try {
            const { userItems } = await User.findOneAndUpdate(
                { _id: req.user?._id },
                { $push: { userItems: { itemWeight } } },
                { new: true }
            );
            const { userCoins, userBalance } = await generators.generateCycoin(
                userItems,
                req.user?._id
            );
            res.json({
                success: true,
                dateInserted: userItems[userItems.length - 1].dateInserted,
                userCoins,
                userBalance,
            });
        } catch (err) {
            console.log(err);
            res.json({ success: false, editError: "Failed to add item" });
        }
    }
});

module.exports = router;
