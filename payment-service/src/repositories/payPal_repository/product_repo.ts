import axios from "axios";

export interface IProductRepository{
    // getProductById(id:string):Promise<any>;
    createProduct(productName:string,accessToken:string):Promise<string|null>;
    // updateProduct(id:string,product:any):Promise<any>;
    // deleteProduct(id:string):Promise<any>;
    // getAllProducts():Promise<any[]>;
}
export class ProductRepository implements IProductRepository{
    
    private static instance:ProductRepository;
    private constructor(){}
    static getInstance():ProductRepository{
        if(!this.instance){
            this.instance=new ProductRepository();
        }
        return this.instance;
    }
    async createProduct(productName:string,accessToken:string):Promise<string|null>{
        try{
                const productData={
                    "name":productName,
                    "description":"Netflix Subscription",
                    "type":"SERVICE", // סוג המוצר שאני מציעה- שירות ולא מוצר פיזי או דיגיטלי
                    "category":"DIGITAL_MEDIA_ENTERTAINMENT", //(אפליקציה ניידת/שירות דיגיטלי/שירות ספרים)קטגוריה של המוצר שלי
                };
                const response= await axios.post(`${process.env.PAYPAL_BASEURL}/v1/catalogs/products`,{
                    data:productData,
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                        "Content-Type":"application/json"
                    }
                })
                return response.data.id as string; //החזרת התגובה של Paypal  
        } catch (error) {
            console.error("Error creating product:", error);
            throw new Error((error as Error).message);
        }
    }
}