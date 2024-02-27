import express from "express";
import { router } from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, singIn } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
    res.status(200);
    res.send({ message: "Express server" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signIn", singIn);

app.use((err, req, res, next) => {
    if (err.type === "auth") {
        return res.status(401).json({ message: "unauthorized" });
    }

    if (err.type === "input") {
        return res.status(400).json({ message: "input error" });
    }

    res.status(500).json("i did an oopsie");
});

export default app;
