// Set the router
const express = require('express');
const router = express.Router();

// Get the model
const { Users } = require("../models");

// Set JWT stuff
const bcrypt = require('bcrypt');
const { createToken, validateToken } = require('../helpers/JWT');

router.post("/register", async (req, res) => {
    const { firstName, lastName, eMail, password } = req.body;
    const user = await Users.findOne({ where: {eMail: eMail} });
    if (user) {
        // Check if there is already a user associated with this e-mail
        return res.status(400).json({ field: 'eMail', message: 'There is already an account associated with thie e-mail.' });
    }
    else {
        bcrypt.hash(password, 10).then((hash) => {
            // Try to create the new user
            Users.create({
                firstName: firstName,
                lastName: lastName,
                eMail: eMail,
                password: hash,
            }).then(() => {
                // If the user was successfully created, return the confirmation message
                return res.status(200).json({ field: 'response', message:`Congratulations! Your registration is almost complete! Please confirm the e-mail we've sent you at ${eMail}!` });
            }).catch((err) => {
                if (err) {
                    // There is another error
                    return res.status(400).json({ field:'response', message: 'There was an internal error. Please try again later.' });
                }
            })
        });
    }
});

router.post("/login", async (req, res) => {
    const { eMail, password } = req.body;
    const user = await Users.findOne({ where: {eMail: eMail} });
    
    if (!user) return res.status(400).json({ field:'response', message: 'There is no user associated with this e-mail.' });

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            return res.status(400).json({ field:'response', message: 'The e-mail and the password introduced do not match.' });
        }
        else {
            const accessToken = createToken(user); 
            res.cookie("access-token", accessToken, {
                maxAge: 60*60*24*7*1000,
                httpOnly: true
            });
            return res.status(200).json(accessToken);
        }
    });
});

router.get('/auth', validateToken, async (req, res) => {
    return res.status(200).json("User logged in!");
});

module.exports = router