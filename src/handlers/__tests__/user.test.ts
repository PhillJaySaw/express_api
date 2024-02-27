import { describe } from "node:test";
import * as user from "../user";

// TODO write proper tests
describe("user", () => {
    it("createNewUser", async () => {
        const req = { body: { username: "hello", password: "his" } };
        const res = {
            json({ token }) {
                expect(token).toBeTruthy();
            },
        };

        await user.createNewUser(req, res, () => {});
    });
});
