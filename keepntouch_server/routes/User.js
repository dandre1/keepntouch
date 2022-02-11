const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require("../models");
const { createTokens, validateToken } = require('../JWT');

router.post("/register", (req, res) => {
    const { username, firstName, lastName, eMail, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            eMail: eMail,
            password: hash,
        }).then(() => {
            res.json("USER REGISTERED!");
        }).catch((err) => {
            if (err) {
                res.status(400).json({ error: err });
            }
        })
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: {username: username} });
    if (!user) return res.status(400).json({ error: "User doesn't exist" });

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            return res.status(400).json({ error: "Wrong username and password combination" });
        }
        else {
            const accessToken = createTokens(user); 
            res.cookie("access-token", accessToken, {
                maxAge: 60*60*24*7*1000,
                httpOnly: true
            });
            return res.json("LOGGED IN!");
        }
    });
});

router.get("/profile", validateToken, (req, res) => {
    res.json("profile");
});

module.exports = router