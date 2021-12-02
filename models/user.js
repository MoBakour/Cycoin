// Require Packages
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    userPassword: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 100
    },
    userGender: {
        type: String,
        enum: ["male", "female"],
        default: "male",
        required: true
    },
    userVerified: {
        type: Boolean,
        default: false
    },
    userRank: Number,
    userItems: [new Schema({
        itemWeight: Number,
        dateInserted: {
            type: Date,
            default: Date.now
        }
    }, { _id: false })],
    userCoins: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Hash Password
userSchema.pre("save", async function(next) {
    let salt = await bcrypt.genSalt();
    this.userPassword = await bcrypt.hash(this.userPassword, salt);
    next();
});

// Create & Export User Model
const User = mongoose.model("user", userSchema);
module.exports = User;