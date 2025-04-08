import { Column,Table,DataType,Model, BelongsTo, ForeignKey, Sequelize, HasOne } from "sequelize-typescript";
import { User } from "./user";
import { Transaction } from "./transaction";
import { Subscription } from "./subscription";

@Table({tableName:'payments',modelName:'Payment',timestamps:false})
export class Payment extends Model{
    @Column({
        type:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false,
        unique:true,
        defaultValue:DataType.UUIDV4
    })
    payment_id!:string;

    @ForeignKey(()=>User)
    @Column({
        type:DataType.UUIDV4,
        allowNull:false,
    })
    userId!:string;

    @BelongsTo(()=>User)
    user!:User;

    @Column({
        type:DataType.DECIMAL(10,2),
        allowNull:false
    })
    amount!:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    payment_method!:'paypal'|'stripe';
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    payment_status!:'paypal'|'failed'|'pending';
    @Column({
        type:DataType.DATE,
        allowNull:false,
        defaultValue:Date.now()

    })
    payment_date!:Date

    @ForeignKey(()=>Transaction)
    @Column({
        type:DataType.UUIDV4,
        allowNull:false,
        unique:true,
        validate:{
            len:[1,255]
        }
    })
    transactionId!:String;

    @BelongsTo(()=>Transaction)
    transacion!:Transaction

    @ForeignKey(() => Subscription)
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    subscription_id!: string;

    @BelongsTo(() => Subscription)
    subscription!: Subscription;
    //בצד של העסקה לציין שיש HasOne()
}