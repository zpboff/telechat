import mongoose from "mongoose";
import { initializeDbConnection } from "..";
import { UserModel } from "../dataModel/user";
import { IUser } from "../dataModel/Types";

describe("User model", () => {
    beforeAll(async () => {
        await initializeDbConnection("mongodb://localhost:27017/telechat");
    });

    afterAll(async () => {
        mongoose.connection.close();
    });

    it("Should throw validation errors", () => {
        const user = new UserModel();

        expect(user.validate).toThrow();
    });

    it("Should save a user", async () => {
        expect.assertions(3);

        const user: IUser = new UserModel({
            firstName: "Test first name",
            lastName: "Test last name",
            email: "test@example.com"
        });

        const spy = jest.spyOn(user, "save");
        user.save();

        expect(spy).toHaveBeenCalled();

        expect(user).toMatchObject({
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String)
        });

        expect(user.email).toBe("test@example.com");
    });
});
