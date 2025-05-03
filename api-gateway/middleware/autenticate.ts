import { verifyUser } from "../src/utils/jwt";
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import errorHandlerFunc from "../src/utils/errorHandlerFunc";
import { convertCompilerOptionsFromJson } from "typescript";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log("Cookies received:", req.cookies);


        if (req.path.endsWith('/login') || req.path.endsWith('/signup') || req.path.endsWith('/email')){
            console.log('Bypassing authentication for public route:', req.path);
            return next();
        }

        const accessToken = req.cookies.accessToken || req.headers['authorization']?.split(" ")[1] || req.cookies.firstStepAuth;
        console.log("Access token found:", accessToken);
        if (!accessToken) {
            throw new Error("user unauthorized,no valid access token!");
        }
        const user = await verifyUser(accessToken);
        console.log("User found:" + user);
        if (!user){
           throw new Error("userid  unauthorized,no valid access token!");
        }
        next();
    }
    catch (err) {
        console.log("access token isnt valid- start checking refresh token");
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log("Refresh: " + refreshToken);
            const response = await axios.post("http://localhost:3002/api/v1/users/refresh", { withCredentials: true });

            console.log("Axios response: " + response);

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