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
    console.log(err);
    res.json({ message: `ERROR: ${err.message}` });
});

export default app;
