import { TOKENS } from "../tokens";
import { MongoDBConnection } from "./mongodb";



export const dbConnection = async() => {
    const { DB_URL, DB_TYPE } =
      process.env;

      if(!DB_TYPE){
        throw new Error("DB_TYPE is not defined");
      }

      /* Add More DB cases if needed 
        Example: if (DB_TYPE === TOKENS.PostgreSQL) {
          PostgreeSQL connection
        }
      */

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