import { Column,Table,DataType,Model, PrimaryKey, ForeignKey, BelongsTo, AllowNull } from "sequelize-typescript";
import { Payment } from "./payment";
import { User } from "./user";
import { Transaction } from "./transaction";

@Table({tableName:'invoices',modelName:'Invoice',timestamps:false})
export class Invoice extends Model{
    @Column({
        type:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false,
        unique:true
    })
    id!:string;

     @ForeignKey(()=>User)
        @Column({
            type:DataType.UUIDV4,
            allowNull:false,
        })
        userId!:string;
    
        @BelongsTo(()=>User)
        user!:User;

        @ForeignKey(()=>Payment)
        @Column({
            type:DataType.UUIDV4,
            allowNull:false,
        })
        paymentId!:string;
    
        @BelongsTo(()=>Payment)
        payment!:Payment;
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    invoice_number!:string; //מג'ונרט
    @Column({
        type:DataType.DECIMAL(10,2),
        allowNull:false
    })
    amount!:number;

    @Column({
        type:DataType.DATE,
        allowNull:false,
        defaultValue:Date.now()
    })
    invoice_date!:Date;
    
    @Column({
        type:DataType.DATE,
        allowNull:false,
        defaultValue:()=>{
            const date=new Date();
            date.setMonth(date.getMonth()+1);
            return date;
        }
    })
    due_date!:Date

    @ForeignKey(()=>Transaction)
    @Column({
        type:DataType.UUID,
        allowNull:true
    })
    transactionId!: string|null
    @BelongsTo(()=>Transaction)
    transaction!:Transaction;

}