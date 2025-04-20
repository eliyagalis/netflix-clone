import axios from "axios";


   export const createProduct=async(productName:string,accessToken:string):Promise<string|null>=>{
        try{
                const productData={
                    "name":productName,
                    "description":"Netflix Subscription",
                    "type":"SERVICE", // סוג המוצר שאני מציעה- שירות ולא מוצר פיזי או דיגיטלי
                    "category":"DIGITAL_MEDIA_ENTERTAINMENT", //(אפליקציה ניידת/שירות דיגיטלי/שירות ספרים)קטגוריה של המוצר שלי
                };
                const response= await axios.post(`${process.env.PAYPAL_BASEURL}/v1/catalogs/products`,
                    productData,
                    {
                        headers:{
                            Authorization:`Bearer ${accessToken}`,
                            "Content-Type":"application/json"
                        }
                    }
                )
                return response.data.id as string; //החזרת התגובה של Paypal  
        } catch (error) {
            console.error("Error creating product:", error);
            throw new Error((error as Error).message);
        }
    }
