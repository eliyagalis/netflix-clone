import axios from 'axios'
import { config } from "dotenv";
import { getOrSetCache } from '../utils/redis-cache';
config()
export const getAccessTokenPayPal=async():Promise<string>=>{
    try{
        const accessTokenFromCache=await getOrSetCache("payPal_access_token",async()=>{
            const res=await axios.post(`${process.env.PAYPAL_BASEURL}/v1/oauth2/token`,{
                form:{
                    grant_type:"client_credentials"
                },
                username:process.env.CLIENT_KEY_PP,
                password:process.env.SECRET_KEY_PP
            })
            return JSON.parse(res.data).access_token;
        })
        return accessTokenFromCache;
    }
    catch(err){
        throw new Error((err as Error).message);
    }
  
}