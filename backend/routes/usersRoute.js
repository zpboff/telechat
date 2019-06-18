const express = require("express");
const router = express.Router();
const User = require("../db/dataModel/user");

router.get("/gettopusers", (req, res) => {
    User.find({})
        .limit(10)
        .then(users => {
            return res.status(200).json({ users });
        });
});

module.exports = router;
