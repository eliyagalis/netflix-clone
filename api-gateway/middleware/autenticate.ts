import { verifyUser } from "../src/utils/jwt";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import errorHandlerFunc from "../src/utils/errorHandlerFunc";


 const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log("Cookies received:", req.cookies);
        if (req.path.endsWith('/login') || req.path.endsWith('/signup') || req.path.endsWith('/email')){
            console.log('Bypassing authentication for public route:', req.path);
            next();
        }
        const accessToken= req.cookies.accessToken||req.headers['authorization']?.split(" ")[1];
        console.log("access token",accessToken);
        if(!accessToken){
            throw new Error("user unauthorized,no valid access token!");
        }
        const user=verifyUser(accessToken);
   
        if(!user?.userId||!user.email||!user){
            throw new Error("access token is not valid");
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
            const response = await axios.post("http://localhost:3002/api/v1/users/refresh", { withCredentials: true });
            // res.cookie('accessToken', accessToken_res, { httpOnly: true, maxAge: 15 * 60 * 1000, secure: true });
            // res.cookie('refreshToken', refreshToken_res, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

            // req.headers['authorization'] = `Bearer ${accessToken_res}`;
            next();
        } catch (err) {
            errorHandlerFunc(Object.assign(new Error("user unAuthorized"), { status: 401 }), res);
            return; //העתקת תכונות הERR לאובייקט חדש שבתוכו יש גם תכונת סטטוס
        }
    }
}
     // if (process.env.NODE_ENV === 'development') {
        //     req.headers["x-user-id"]="550e8400-e29b-41d4-a716-446655440000"
        //     req.headers["x-user-email"] = 'dev@example.com';
        //     next();
        // }
        export default authenticate;