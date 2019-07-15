import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleRequired from "../middlwares/roleRequired";
import UserModel from "../db/dataModel/user";
import { generateToken } from "../providers/authProvider";

export default app => {
    app.post(
        "/auth/signin-as-user",
        isAuth,
        attachCurrentUser,
        roleRequired("admin"),

        async (req, res) => {
            const userEmail = req.body.email;

            const userRecord = await UserModel.findOne({ email });

            if (!userRecord) {
                return res.status(404).send("Пользователь не найден");
            }

            return res
                .json({
                    user: {
                        email: userRecord.email,
                        name: userRecord.name
                    },
                    jwt: generateToken(userRecord)
                })
                .status(200);
        }
    );
};
