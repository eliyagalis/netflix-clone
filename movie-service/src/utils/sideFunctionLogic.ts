// const tryCatch= async<T> (tryFunc:()=> Promise<T>, catchFunc:(err:Error) => void ) => {
//     try{
//         await tryFunc();
//     }catch(err){
//         if(err instanceof Error){
//             catchFunc(err);
//         }
//     }
// }

import { getOrSetCache } from "./redis.cache";

export const handleApiRequest =async<T>(key:string,cb:Function):Promise<T>=>{
try{
    const data=await getOrSetCache(key,cb);
    return data;
}catch(err){
    console.error("Error in getPopularMovies:", err);
    throw err; 
}
}