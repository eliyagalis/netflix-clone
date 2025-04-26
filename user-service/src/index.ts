import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { dbConnection } from "./config/db";

const PORT = process.env.PORT

const start = async () => {

    if (!process.env.DB_URL) {
        throw new Error("Missing db url")
    }
    if(!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
        throw new Error("Missing jwt key")
    }

    await dbConnection();

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};



start();