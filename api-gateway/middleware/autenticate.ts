import { verifyUser } from "../src/utils/jwt";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import errorHandlerFunc from "../src/utils/errorHandlerFunc";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Cookies received:", req.cookies);


        if (req.path.endsWith('/login') || req.path.endsWith('/signup') || req.path.endsWith('/email')) {
            console.log('Bypassing authentication for public route:', req.path);
            return next();
        }
        const accessToken= req.cookies.accessToken||req.headers['authorization']?.split(" ")[1];
        console.log("access token",accessToken);
        if(!accessToken){
            throw new Error("user unauthorized,no valid access token!");
        }
        const user=verifyUser(accessToken);
   
        if(!user?.userId||!user.email||!user){
            throw new Error("access token is not valid, user unauthorized");
        }
        req.userId = user!.userId
        req.userEmail=user!.email;
        next();
    }
    catch (err) {
        console.log("access token isnt valid- start checking refresh token");
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log("Refresh: " + refreshToken);
            const response = await axios.post(
                "http://user-service:3002/api/v1/users/refresh",
                {},
                {
                    withCredentials: true,
                    headers: {
                        'Cookie': `refreshToken=${refreshToken}`
                    }
                }
            );
           // Extract cookies from the response
           const setCookieHeaders = response.headers['set-cookie'];
           if (setCookieHeaders) {
               // Forward the set-cookie headers to the client
               setCookieHeaders.forEach((cookieStr: string) => {
                   res.setHeader('Set-Cookie', cookieStr);
               });
               
               // Parse the cookies to update the request object
               setCookieHeaders.forEach((cookieStr: string) => {
                   const match = cookieStr.match(/^([^=]+)=([^;]+)/);
                   if (match) {
                       const [, name, value] = match;
                       if (req.cookies) {
                           req.cookies[name] = value;
                       }
                   }
               });
           }
           
           // If the users service returns tokens in the response body as well
           if (response.data.accessToken) {
               req.headers['authorization'] = `Bearer ${response.data.accessToken}`;
           }
           
           next();
        } catch (err) {
            console.log(err)
            errorHandlerFunc(Object.assign(new Error("user unAuthorized"), { status: 401 }), res);
            return; //העתקת תכונות הERR לאובייקט חדש שבתוכו יש גם תכונת סטטוס
        }
    }
}
   
        export default authenticate;