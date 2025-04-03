import fs from 'fs'
import https from 'https'
import app from './app';
import path from "path";
import { config } from "dotenv";

config();
const port=process.env.PORT||3003;

const keyPath = path.join(__dirname, '../../payment-service/certs/server.key');
const certPath = path.join(__dirname, '../../payment-service/certs/server.cert');
//כללי אבטחה 
const options={
    key:fs.readFileSync(keyPath,'utf8'),
    cert:fs.readFileSync(certPath,'utf8')
}
https.createServer(options,app).listen(port,()=>{
    console.log("listening Payment service");
})