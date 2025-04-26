import { Column,Table,DataType,Model, AllowNull, PrimaryKey, Validate, HasMany, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Plan } from "./plan";
import { Subscription } from "./subscription";

@Table({tableName:'users',modelName:'User',timestamps:false})
export class User extends Model{
    @Column({
        type:DataType.UUID,
        primaryKey:true,
        allowNull:false,
        unique:true
    })
    user_id!:string;
    // @Column({
    //     type:DataType.STRING,
    //     allowNull:false,
    //     validate:{
    //         len:[1,255]
    //     }
    // })
    // name!:string;
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    email!:string;
    
    @HasOne(()=>Subscription,{
        onDelete: 'CASCADE'  // למחיקת מנוי כאשר המשתמש נמחק הוספת CASCADE
    })
    subscription!:Subscription;

}