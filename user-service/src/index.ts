import { app } from "./app";
import { dbConnection } from "./config/db";

import dotenv from "dotenv";
dotenv.config();

const start = async () => {

    if (!process.env.DB_URL) {
        throw new Error("Missing db url")
    }
    if(!process.env.JWT_KEY) {
        throw new Error("Missing jwt key")
    }

    await dbConnection();

    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });
};

start();