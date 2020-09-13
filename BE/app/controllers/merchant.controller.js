const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

exports.merchantList = (req, res) => {
    // User.find({where})
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};