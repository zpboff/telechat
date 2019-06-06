const { validateLogin, validateRegister } = require("../helpers/validation");
const AppSettings = require("../constants/appSettings");
const User = require("../db/dataModel/user");
const passport = require("passport");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authenticate = (user, callback) => {
    const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        initials: user.initials
    };

    jwt.sign(
        payload,
        AppSettings.Secret,
        {
            expiresIn: AppSettings.TokenExpiresIn
        },
        (err, token) => {
            if (err) {
                console.error("There is some error in token", err);
                return callback({ errors: err.message });
            } else {
                callback(null, token);
            }
        }
    );
};

const register = (user, callback) => {
    const { errors, isValid } = validateRegister(user);

    if (!isValid) {
        return callback({ errors });
    }
    User.findOne({
        email: user.email
    }).then(user => {
        if (user) {
            return callback({ error: "Email already exists" });
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
            registeredAt: new Date(),
            updatedAt: new Date(),
            initials: req.body.firstName[0] + req.body.lastName[0],
            password: req.body.password,
            avatar
        });

        newUser.save().then(user => {
            authenticate(user, callback);
        });
    });
};

const login = (user, callback) => {
    const { errors, isValid } = validateLogin(user);

    if (!isValid) {
        return callback({ errors });
    }

    const { email, password } = user;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "User not found";
            return callback({ errors });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                authenticate(user, callback);
            } else {
                errors.password = "Incorrect Password";
                return callback({ errors });
            }
        });
    });
};

module.exports = { register, login };
