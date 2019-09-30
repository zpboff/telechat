const UserModel = require("../../db/dataModel/user");

const withUser = async (req, res, next) => {
    const decodedTokenData = req.token.data;
    const userRecord = await UserModel.findOne({ _id: decodedTokenData.id });

    req.currentUser = userRecord;

    if (!userRecord) {
        return res.status(401).end("User not found");
    } else {
        return next();
    }
};

module.exports = withUser