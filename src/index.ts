import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();
const PORT = 42069;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
