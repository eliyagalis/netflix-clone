import { Column,Table,DataType,Model, PrimaryKey, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user";
import { Plan } from "./plan";

@Table({tableName:'subscription',modelName:'Subscription',timestamps:false})
export class Subscription extends Model{
    @Column({
        type:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false,
        unique:true
    })
    subscription_id!:string

    @ForeignKey(()=>User)
    @Column({
        type:DataType.UUIDV4,
        allowNull:false,
        onDelete: 'CASCADE'
    })
    user_id!:string

    @BelongsTo(()=>User,{
        onDelete: 'CASCADE'
    })
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

}