import { config } from 'dotenv';
import { Tokens } from '../utils/tokens';
import { PostgreSqlConnection } from './postgreSql';
config()

export const dbConnection=async()=>{
    if(!Tokens.userName||!Tokens.name||!Tokens.dbPort||!Tokens.host||!Tokens.password)
        throw new Error("Db details are invalid");
    return await PostgreSqlConnection.getInstance();
}