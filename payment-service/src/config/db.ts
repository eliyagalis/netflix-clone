import { config } from 'dotenv';
import { Tokens } from '../utils/tokens';
import { PostgreSqlConnection } from './postgreSql';
config()

export const dbConnection=async()=>{
    if(!process.env.DB_USERNAME||!process.env.DB_NAME||!process.env.DB_PORT||!process.env.DB_PASS||!process.env.DB_HOST)
        throw new Error("Db details are invalid");
    return await PostgreSqlConnection.getInstance();
}
