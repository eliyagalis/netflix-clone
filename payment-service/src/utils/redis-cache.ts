import { createClient, RedisClientType } from 'redis'
const redisClient:RedisClientType= createClient({
     url: process.env.REDIS_PORT_URL||'redis://redis:6379'
});

const connectRedisClient = async () => {
    try {
      await redisClient.connect();
      redisClient.on('connect', () => {
        console.log('Redis client connected');});
    } catch (err) {
      console.error('Error connecting to Redis:', err);
    }
    
  };
export const getOrSetCache=(key:string,cb:Function):Promise<any>=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!redisClient.isOpen){
                await connectRedisClient();
            }
            const dataFromCache=await redisClient.get(key);
            if(dataFromCache){
                resolve(JSON.parse(dataFromCache!));                
            }
            const dataFromApi=await cb();
            await redisClient.setEx(key,32000,JSON.stringify(dataFromApi)); //המידע יישמר למשך 10 שעות
            resolve(dataFromApi);
        }catch(err){
            console.log("error on fetching data: ", err);
            reject(err);
        }
    })
}