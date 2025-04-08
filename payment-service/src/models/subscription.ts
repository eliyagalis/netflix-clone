import { Column,Table,DataType,Model, PrimaryKey, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user";
import { Plan } from "./plan";
import { Payment } from "./payment";

export interface ISubscription{
    subscription_id:string,
    user_id:string,
    plan_id:string,
    start_date:Date,
    end_date?:Date,
    cancel_date?:Date,
    status:"active"|"cancelled"|"expired",
    renewal_date?:Date, //תאריך חידוש המנוי
    user?:User,
    plan?:Plan,
    payments?:Payment[];
}

@Table({tableName:'subscription',modelName:'Subscription',timestamps:false})
export class Subscription extends Model{
    @Column({
        type:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false,
        unique:true
        // defaultValue:DataType.UUIDV4
    })
    subscription_id!:string

    @ForeignKey(()=>User)
    @Column({
        type:DataType.UUIDV4,
        allowNull:false,
    })
    user_id!:string

    @BelongsTo(()=>User)
    user!:User

    @ForeignKey(()=>Plan)
    @Column({
        type:DataType.UUIDV4,
        allowNull:false,
    })
    plan_id!:string
    @BelongsTo(()=>Plan)
    plan!:Plan

    @Column({
        type:DataType.DATE,
        allowNull:false,
        defaultValue:Date.now()
    })
    start_date!:Date
    @Column({
        type:DataType.DATE,
        allowNull:true
    })
    end_date?:Date
    @Column({
        type:DataType.DATE,
        allowNull:true
    })
    cancel_date?:Date

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    status!:"active"|"cancelled"|"expired"

    //תאריך חידוש המנוי
    @Column({
        type:DataType.DATE,
        allowNull:true
    })
    renewal_date?:Date 

    @HasMany(()=>Payment)
    payments!:Payment[];
}