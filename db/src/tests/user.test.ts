import mongoose from "mongoose";
import { initializeDbConnection } from "..";
import { UserModel } from "../dataModel/user";

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
        const user = new UserModel({
            firstName: "Test first name",
            lastName: "Test last name",
            email: "test@example.com",
            password: "123"
        });

        const spy = jest.spyOn(user, "save");
        const savedUser = await user.save();

        expect(spy).toHaveBeenCalled();

        expect(savedUser).toMatchObject({
            firstName: expect.stringMatching("Test first name"),
            lastName: expect.stringMatching("Test last name"),
            email: expect.stringMatching("test@example.com"),
            password: expect.not.stringMatching("123"),
            initials: expect.stringMatching("TT")
        });
    });

    it("Should delete test user", async () => {
        const user = await UserModel.findOneAndDelete({ email: "test@example.com" });
        expect(user).not.toBe(null);

        const userAfterRemoving = await UserModel.findOne({ email: "test@example.com" });

        expect(userAfterRemoving).toBe(null);
    });
});
