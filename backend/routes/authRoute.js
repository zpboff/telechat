const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../db/dataModel/user");
const authenticate = require('../providers/authProvider');
const { validateLogin, validateRegister } = require("../helpers/validation");

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: "Email занят"
            });
        }
        const avatar = gravatar.url(req.body.email, {
            s: "200",
            r: "pg",
            d: "mm"
        });

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            initials: req.body.firstName[0] + req.body.lastName[0],
            password: req.body.password,
            photo: avatar,
            avatar
        });

        newUser.save().then(user => {
            authenticate(user, res);
        });
    });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "Пользователь не найден";
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                authenticate(user, res);
            } else {
                errors.password = "Неверный пароль";
                return res.status(400).json(errors);
            }
        });
    });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;
