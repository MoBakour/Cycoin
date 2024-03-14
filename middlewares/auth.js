const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        req.user = null;

        if (!token) {
            next();
            return;
        }

        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (!err && decoded) {
                const user = await User.findById(decoded.userId);
                req.user = user;
            }

            next();
        });
    } catch (err) {
        console.error(err);
        next();
    }
};

// Authentication
function checkAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.render("home", { user: req.user });
    }
}

// Create JWT Token
function createToken(userId) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { userId },
            process.env.SECRET,
            {
                expiresIn: 60 * 60 * 24 * 3,
            },
            (err, token) => {
                if (err) reject(err);
                else resolve(token);
            }
        );
    });
}

module.exports = { authenticate, checkAuth, createToken };
