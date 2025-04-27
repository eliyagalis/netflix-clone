import fs from 'fs'
import https from 'https'
import app from './app';
import path from "path";
import { config } from "dotenv";
import { getAccessTokenPayPal } from './config/paypal_accessToken';
import { dbConnection } from './config/db';
import PaymentController from './controller/payment.controller';
config();
const startPaymentService=async()=>{
    const port=process.env.PORT||3003;
    console.log("-----------------------------------------------------")
    const keyPath = '/app/payment-service/certs/server.key';
    const certPath = '/app/payment-service/certs/server.cert';
    // const keyPath = path.join(__dirname, process.env.CA_SERVER_KEY!);
    // console.log(keyPath," ---------------")
    // const certPath = path.join(__dirname, '../payment-service/certs/server.cert');
    //כללי אבטחה 
    const options={
        key:fs.readFileSync(keyPath,'utf8'),
        cert:fs.readFileSync(certPath,'utf8')
    }
    if (!options.key || !options.cert) {
        throw new Error('SSL key or certificate files not found');
    }
    await dbConnection()
    https.createServer(options,app).listen(port,async()=>{
        console.log("listening Payment service");
        // if (!fs.existsSync(process.env.POSTRAGE_CA!)) {
        //     throw new Error("CA file not found at: " + process.env.POSTRAGE_CA);
        //   }
        //   else console.log("CA file found at: " + process.env.POSTRAGE_CA);
        // console.log("DB connected successfully");
        getAccessTokenPayPal().then((accessToken)=>{
            console.log("Access token for PayPal: ", accessToken);
        }).catch((error)=>{
            console.error("Error getting access token for PayPal: ", error);
        })
    })
}
startPaymentService();