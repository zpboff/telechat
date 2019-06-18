const AppSettings = require('../constants/appSettings');
const jwt = require('jsonwebtoken');

const authenticate = (user, res) => {
    const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        initials: user.initials,
        birthDate: user.birthDate
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
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            } else {
                return res.json({
                    success: true,
                    token: `Bearer ${token}`
                });
            }
        }
    );
}

module.exports = authenticate