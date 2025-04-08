import {inject, injectable} from 'inversify'
import { Invoice } from '../../models/Invoice'

@injectable()
export class InvoiceRepository{
    constructor(){}
    async create(data:{
        transaction_status:string,
        transactionId:string|null
        userId:string,paymentId:string|null,
        invoiceNumber:string,
        amount:number,
        invoiceDate:Date,
        dueDate:Date}){
            if(data.transaction_status==="success"){
                const invoice=await Invoice.create({
                    userId:data.userId,
                    paymentId:data.paymentId,
                    invoice_number:data.invoiceNumber,
                    amount:data.amount,
                    invoice_date:data.invoiceDate,
                    due_date:data.dueDate,
                    transactionId:data.transactionId
                })
            }
            else{
                 throw new Error("the create proccess went wrong, please check you enter all the paramaters!");
            }
    }
}