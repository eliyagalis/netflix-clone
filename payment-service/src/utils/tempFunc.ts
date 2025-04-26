import axios from "axios";

export const getMonthNumber=(start_date:Date,end_date:Date)=>{
    const startYear=start_date.getFullYear();
    const startMonth=start_date.getMonth();
    const endYear=end_date.getFullYear();
    const endMonth=end_date.getMinutes();

    return (endYear-startYear)*12+(endMonth-startMonth);
}
export const apiPostRequest=async(url:string,body?:any)=>{
    try{
        const response=await axios.post(url,body);
        return response.data;
    }catch(err){
        console.error("Error in API POST request:",err);
        throw new Error((err as Error).message);
    }
}
