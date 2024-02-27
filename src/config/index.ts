import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig: string;

if (stage === "production") {
    envConfig = require("./prod").default;
} else if (stage === "testing") {
    envConfig = require("./test").default;
} else {
    envConfig = require("./local").default;
}

export default merge(
    {
        stage,
        env: process.env.NODE_ENV,
        port: 42069,
        secrets: {
            jwt: process.env.JWT_SECRET,
            dbUrl: process.env.DATABASE_URL,
        },
    },
    envConfig,
);
