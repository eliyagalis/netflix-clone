import { AllowNull, Column,DataType,HasMany,HasOne,Model,PrimaryKey,Table } from "sequelize-typescript";
import { Invoice } from "./Invoice";
import { Payment } from "./payment";

@Table({tableName:'transactions',modelName:'Transaction',timestamps:false})
export class Transaction extends Model{
    @Column({
        type:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false,
        unique:true,
        defaultValue:DataType.UUIDV4
    })
    transaction_id!:string;
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    status!:'success'|'failed';

    @Column({
        type:DataType.FLOAT,
        allowNull:false
    })
    amount!:number;
    
    @Column({
        type:DataType.DATE,
        allowNull:false,
        defaultValue:Date.now()
    })
    createdAt!:Date

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    error_Message?:String|null

    @HasMany(()=>Invoice)
    invoice!:Invoice[]
    @HasOne(()=>Payment)
    payment!:Payment

    //לכל עסקה יש מספר תשלומים שקורה כל חודש
    //לכל תשלום- יש עסקה אחת
    //לכל עסקה יש מספר חשבוניות 
    //לכל חשבונית יש עסקה אחת, תשלום אחד,מנוי 1
    //לכל תשלום ומנוי יש עסקה 1

}