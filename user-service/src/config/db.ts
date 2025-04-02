import { TOKENS } from "../tokens";
import { MongoDBConnection } from "./mongodb";



export const dbConnection = async() => {
    const { DB_URL, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_TYPE } =
      process.env;

      if(!DB_TYPE){
        throw new Error("DB_TYPE is not defined");
      }

      else if(DB_TYPE === TOKENS.mongodb) {
        if(!DB_URL){
            throw new Error("DB_URL is missing");
        }
        return await MongoDBConnection.getInstance(DB_URL);
      }
      else {
        throw new Error("No valid db type");
      }
}