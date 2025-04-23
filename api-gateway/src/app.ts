import express, { Application } from 'express';
import { Request, Response } from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import { microServiceMiddleware } from '../middleware/microservicesMiddleware';
import { errorHandler } from '../middleware/errorHandler';
config();
const app:Application=express();
const port=process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"*",credentials:true}));
microServiceMiddleware(app);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`API Gateway is running on port ${port}`);
});

// const API_URL="https://api.themoviedb.org/3";
// app.get('/movies/popular',async(req:Request,res:Response):Promise<any>=>{
    
//     try{
//         const movies=await axios.get(`${API_URL}/movie/popular`,{
//         params:{
//             api_key:process.env.API_KEY,
//             language:'en-US',
//             page:1}}
//         );
//         return res.status(200).json(movies.data.results);
//     }catch(error){
//         console.log("error fetching movies "+error);
//         return res.status(500).json({message:"Internal Server Error", movies:[]});
//     }
// });
