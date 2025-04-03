import pg from 'pg'
import fs from 'fs'
import { Url } from 'url'
import { config } from 'dotenv';
import { Sequelize} from 'sequelize-typescript';
import { Tokens } from '../utils/tokens';
import { Plan } from '../models/plan';
import { User } from '../models/user';
import { Payment } from '../models/payment';
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
            const sequelize=new Sequelize(`postgres://${Tokens.userName}:${Tokens.password}@${Tokens.host}:${Tokens.dbPort}/${Tokens.name}`,{
                dialect:'postgres',
                dialectOptions:{
                    ssl:{
                        require:true,
                        rejectUnauthorized:false,
                        ca:fs.readFileSync(process.env.POSTRAGE_CA!)
                    }
                },
                models:[Plan,User,Payment]
            })
            try{
                await sequelize.authenticate();
                console.log(" Db connected succssesfuly");
                await sequelize.sync({alter:true});
                console.log("db created succssesfully");
                this.instance=sequelize;
            }catch(err){
                throw new Error("Database connection faild");
            }
        }
        return PostgreSqlConnection.instance;
    }
}
