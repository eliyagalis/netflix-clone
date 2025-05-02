import { verifyUser } from "../src/utils/jwt";
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import errorHandlerFunc from "../src/utils/errorHandlerFunc";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if (req.path.endsWith('/login') || req.path.endsWith('/signup') || req.path.endsWith('/email')){
            console.log('Bypassing authentication for public route:', req.path);
            return next();
        }

        const accessToken = req.cookies.accessToken || req.headers['authorization']?.split(" ")[1] || req.cookies.firstStepAuth;
        console.log(accessToken);
        if (!accessToken) {
            errorHandlerFunc(Object.assign(new Error("user unauthorized,no valid access token!"), { status: 404 }), res);
        }
        const user = verifyUser(accessToken);
        if (!user){
            errorHandlerFunc(Object.assign(new Error("userid  unauthorized,no valid access token!"), { status: 404 }), res);
        }
        req.headers["user_id"] = user!.id;
        req.headers["email"] = user!.email;
        next();
    }
    catch (err) {
        console.log("access token isnt valid- start checking refresh token");
        try {
            const refreshToken: string | null = req.cookies.refreshToken;
            const response = await axios.get("http://localhost:3002/api/v1/refreshToken", { withCredentials: true });
            const { refreshToken: refreshToken_res, accessToken: accessToken_res } = response.data;

            res.cookie('accessToken', accessToken_res, { httpOnly: true, maxAge: 15 * 60 * 1000, secure: true });
            res.cookie('refreshToken', refreshToken_res, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

            req.headers['authorization'] = `Bearer ${accessToken_res}`;
            next();

        } catch (err) {
            errorHandlerFunc(Object.assign(new Error("user unAuthorized"), { status: 401 }), res);
            //העתקת תכונות הERR לאובייקט חדש שבתוכו יש גם תכונת סטטוס
        }
    }
}