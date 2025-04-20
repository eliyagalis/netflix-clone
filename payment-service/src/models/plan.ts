import {Column,DataType,HasMany,Model,Table } from "sequelize-typescript";
import { Subscription } from "./subscription";

@Table({tableName:'plans',modelName:'Plan',timestamps:false})
export class Plan extends Model{
    @Column({
        type:DataType.UUID,
        primaryKey:true,
        allowNull:false,
        unique:true,
        // defaultValue:DataType.UUIDV4
    })
    plan_id!:string;
    @Column({
        type:DataType.ENUM('basic','premium','standard'),
        allowNull:false
    })
    name!:'basic'|'premium'|'standard';
    @Column({
        type:DataType.FLOAT,
        allowNull:false
    })
    price!:number;
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    description!:string;
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    billing_interval!:'monthly'|'annual'

    @HasMany(() => Subscription) // קשר 1 ל-רבים
    subscriptions!: Subscription[];
}