import app from "./server";
import * as dotenv from "dotenv";
import config from "./config";

dotenv.config();

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
