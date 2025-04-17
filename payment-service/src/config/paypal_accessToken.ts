import axios from 'axios'
import { config } from "dotenv";
import { getOrSetCache } from '../utils/redis-cache';
import QueryString from 'qs';
config()
export const getAccessTokenPayPal=async():Promise<string>=>{
    try{
        // נשתמש ב-caching (כמו Redis), כדי לא לבקש טוקן כל פעם
        const accessTokenFromCache=await getOrSetCache("payPal_access_token",async()=>{
            const credentials=Buffer.from(`${process.env.CLIENT_KEY_PP}:${process.env.SECRET_KEY_PP}`).toString("base64");
            const res=await axios.post(`${process.env.PAYPAL_BASEURL}/v1/oauth2/token`,
                QueryString.stringify({ grant_type: "client_credentials" }),
                {
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${credentials}`,
                  },
            })
            return (res.data).access_token;
        })
        return accessTokenFromCache;
    }
    catch(err){
        throw new Error((err as Error).message);
    }
  
}