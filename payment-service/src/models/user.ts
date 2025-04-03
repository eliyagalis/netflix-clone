import { Column,Table,DataType,Model, AllowNull, PrimaryKey, Validate, HasMany, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Plan } from "./plan";
import { Invoice } from "./Invoice";
import { Payment } from "./payment";

@Table({tableName:'users',modelName:'User',timestamps:false})
export class User extends Model{
    @Column({
        type:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false,
        unique:true
    })
    id!:string;
    @Column({
        type:DataType.STRING,
        allowNull:false,
        validate:{
            len:[1,255]
        }
    })
    name!:string;
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    email!:string;
    
    @HasOne(()=>Subscription)
    subscription!:Subscription;

    @HasMany(()=>Invoice)
    invoices!:Invoice[];

    @HasMany(()=>Payment)
    payments!:Payment[];
}