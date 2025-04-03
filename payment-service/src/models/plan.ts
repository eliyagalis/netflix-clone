import { AllowNull, Column,DataType,Model,PrimaryKey,Table } from "sequelize-typescript";

@Table({tableName:'plans',modelName:'Plan',timestamps:false})
export class Plan extends Model{
    @Column({
        type:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false,
        unique:true,
    })
    id!:string;
    @Column({
        type:DataType.ENUM('basic','premium'),
        allowNull:false
    })
    name!:'basic'|'premium';
    @Column({
        type:DataType.FLOAT,
        allowNull:false
    })
    price!:number;
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    billing_interval!:'monthly'|'annual'
}