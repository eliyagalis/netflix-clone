import pg from 'pg'
import fs from 'fs'
import { Url } from 'url'
import { config } from 'dotenv';
import { Sequelize} from 'sequelize-typescript';
import { Tokens } from '../utils/tokens';
import { Plan } from '../models/plan';
import { User } from '../models/user';
import { Subscription } from '../models/subscription';
config()
//תעודה דיגיטלית שמונפקת על ידי רשות מוסמכת שאחראית להנפיק תעודות הססל/טלס ולאמת את השרתים/ אתרים שאני מתחברת אליהם
// שכאשר אני רוצה להשתמש באתר שמשתמש באבטחת TLS/SSL - 
//אצטרך את האישור הזה. התעודה מכילה- 1.מפתח ציבורי -המפתח של רשות האישורים
//2.  חתימה דיגיטלית- חתימה של רשות האישורים
//3.פרטי התעודה- שם רשות המאשרת, תאריך הנפקה, תוקף
//.4.כתובת השרת שלי שאליו אני מתחברת כדי לוודא שזה אכן השרת הנכון ולא זיוף

export class PostgreSqlConnection{
    private static instance: Sequelize|null;
    private constructor(){}

    public static async getInstance(){
        if(!PostgreSqlConnection.instance){
            // console.log("username:"+" "+process.env.DB_USERNAME+"   pass: "+process.env.DB_PASS+" host: "+process.env.DB_HOST+" port:"+process.env.DB_PORT+" dbName:"+process.env.DB_NAME);
            const sequelize=new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{
                dialect:'postgres',
                dialectOptions:{
                    ssl:{
                        require:true,
                        rejectUnauthorized:false,
                        ca:fs.readFileSync(process.env.POSTRAGE_CA!)
                    }
                },
                models:[Plan,User,Subscription]
            })
            this.instance=sequelize;
            console.log("PostgreSqlConnection instance created=======");
        }
            try{
                await this.instance!.authenticate();
                console.log(" Db connected succssesfuly");
                await this.instance!.sync({alter:true});
                console.log("db created succssesfully");
                // this.instance=sequelize;
            }catch(err){
                console.error("Unable to connect to the database: the error------", err);
                throw new Error("Database connection faild",);
            }
        
        return PostgreSqlConnection.instance;
    }
    public static async closeConnection(){
        if(PostgreSqlConnection.instance){
            await PostgreSqlConnection.instance.close();
            PostgreSqlConnection.instance=null;
        }
    }
    public static async deleteDb(){
        if(PostgreSqlConnection.instance){
            await PostgreSqlConnection.instance.drop({cascade:true});
            PostgreSqlConnection.instance=null;
        }
    }
}
