
import UserRepository from "../../../repositories/user.repository";
import { PlanRepositoryPSql } from "../../../repositories/plan.repository";
import { ISubscriptionRepository } from "../../../repositories/subscription";
import PayPalService from "../paypal_service";
import { ISubscription } from "../../../interfaces/ISubscription";
import { IPayPalPlanResponse, IPayPalSubscriptionResponse } from "../../../interfaces/IPaypalResponses";
import { IFullPlan } from "../../../interfaces/IPlan";
import { IUser } from "../../../interfaces/IUser";
import IPlanRepository from "../../../interfaces/IPlanRepository";
import { createProduct } from "../../../services/payPal_requests/product_request";
import { createPaypalPlan } from "../../../services/payPal_requests/plan_request"; 
import { CreatePaymentPlanDTO } from "../../../DTO'S/paypal.service.dto";
import { cancelPaypalSubscription, getSubscriptionById, updatePaypalSubscription } from "../../payPal_requests/subscription_request";
import { updatePaypalSubscriptionDTO } from "../../..//DTO'S/subscription.dto";
//להרצת הטסט:
//npx jest src/services/paypal_payment_service/__tests__/PayPalService.test.ts

//"אל תשתמש בקוד המקורי של הקבצים האלו – תיצור גרסאות מזויפות 
// (Mocked Modules) שאנחנו נשלוט עליהן בבדיקה".

jest.mock('../../payPal_requests/plan_request');
jest.mock('../../payPal_requests/product_request');
jest.mock('../../payPal_requests/subscription_request');
jest.mock("../../../config/paypal_accessToken.ts",() => ({
    getAccessTokenPayPal: jest.fn()
  }));
import { getAccessTokenPayPal } from "../../../config/paypal_accessToken";
import { PostgreSqlConnection } from "../../../config/postgreSql"
import { Plan } from "../../../models/plan";
import { Subscription } from "../../../models/subscription";
import { User } from "../../../models/user";
import sequelize from "sequelize";

let mockSubRepo:Partial<ISubscriptionRepository> = {
    createSubscription: jest.fn(),
    getSubscriptionWithDetails: jest.fn(),
    cancelPostgreSqlSubscription: jest.fn(),
    getAllSubscriptions: jest.fn(),
    updateSubscription: jest.fn()};
let mockPlanRepo:Partial<PlanRepositoryPSql> = {findPlanByName: jest.fn(),findPlanById: jest.fn(),createPlan:jest.fn()};
let mockUserRepo:Partial<UserRepository> = {getUserById: jest.fn(),deleteUser: jest.fn(),createUser: jest.fn()};

//התוצאה הרצויה והגדרת המשתנים שנעבוד בהם בבדיקות- ייצור עותק
describe("PayPalService -", () => {
  let service: PayPalService;

  beforeAll(async() => {
    await PostgreSqlConnection.getInstance();
  },15000);
  beforeEach(async() => {
    jest.clearAllMocks(); //מנקה את כל הפונקציות המזויפות (Mocked Functions) שנוצרו בבדיקות הקודמות
        //מופע אמיתי של סרביס עם תלויות מזוייפות- בודק את הלוגיקה ללא תלויות חיצוניות
    service = new PayPalService(
        mockPlanRepo as jest.Mocked<IPlanRepository>,// //הפונקציה לא תעשה כלום, היא רק תדמה את ההתנהגות של הפונקציה המקורית.
        mockSubRepo as jest.Mocked<ISubscriptionRepository>,
        mockUserRepo as jest.Mocked<UserRepository>
    );
    (getAccessTokenPayPal as jest.Mock).mockResolvedValue("A21AAL1BP1Ugubr4y3iIS7-g5SRvPBikorikZXxQ1ziH5fbKLOyRr2ltBRUszVnNoz2QVFjg_N8dTbxlupWL7inXji0YssdqQ");
    // PayPalService.setProductId(null); //מנקה את המוצר שנוצר בפייפאל
    await Plan.destroy({ where: {}, truncate: true, cascade: true });
    await Subscription.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });
});
    afterAll(async () => {
        await PostgreSqlConnection.closeConnection(); 
        console.log("DB connection closed successfully");
        await PostgreSqlConnection.deleteDb();
        console.log("DB deleted successfully");
    });

//   describe("createProduct-",()=>{
//     it("should create and return PayPal product id successfully",async()=>{
//                 //מזייפים התנהגות של פונקציות שהשתמשנו בהן בפונקציה המקורית וקובעים מה עליהם להחזיר
//         (getAccessTokenPayPal as jest.Mock).mockResolvedValue("A21AAL1BP1Ugubr4y3iIS7-g5SRvPBikorikZXxQ1ziH5fbKLOyRr2ltBRUszVnNoz2QVFjg_N8dTbxlupWL7inXji0YssdqQ"); 
//         (createProduct as jest.Mock).mockResolvedValue("product_id_123"); 

//         const productId = await service.createProduct();

//         expect(getAccessTokenPayPal).toHaveBeenCalled(); //בודקת אם הפונקציה קראה לפונקציה של פייפאל
//         expect(createProduct).toHaveBeenCalledWith("Netflix general Subscription", "fake_token"); //בודקת אם הפונקציה קראה לפונקציה של פייפאל
//         expect(productId).toBe("product_id_123"); //בודקת אם המוצר נוצר בהצלחה
//     });

//     it("should return the product id if it already exists",()=>{
//         PayPalService.setProductId("product_id_123");
//         const productId = service.createProduct(); 
        
//         expect(productId).toBe("product_id_123"); //בודקת אם המוצר נוצר בהצלחה
//         expect(getAccessTokenPayPal).not.toHaveBeenCalled(); //בודקת אם הפונקציה לא קראה לפונקציה של פייפאל
//     });

//     it("should throw an error if access token is missing", async () => {
//         (getAccessTokenPayPal as jest.Mock).mockResolvedValue(null);
//         await expect(service.createProduct()).rejects.toThrow("Failed to get access token from PayPal");
//     });

//     it("should throw an error if product creation fails", async () => {
//         (getAccessTokenPayPal as jest.Mock).mockResolvedValue("fake_token");
//         (createProduct as jest.Mock).mockRejectedValue(new Error("Product creation failed"));

//         await expect(service.createProduct()).rejects.toThrow("Product creation failed");
//     });

//  });
    describe("savePlanOndB-",()=>{
        it("should save a basic plan successfully ",async()=>{
            const planId=process.env.PAYPAL_BASIC_PLAN;
            const planName="basic";
            const fakeNewPlan:IFullPlan={
                id:planId!,
                plan_name:planName,
                price:32.90,
                billing_interval:"monthly",
                description:"basic plan"
            };
            (mockPlanRepo.findPlanById as jest.Mock).mockResolvedValue(null);
            (mockPlanRepo.createPlan as jest.Mock).mockResolvedValue(fakeNewPlan);
            const res=await service.savePlanOnDb(planId!,planName);
            expect(mockPlanRepo.findPlanById).toHaveBeenCalledWith(planId);
            expect(mockPlanRepo.createPlan).toHaveBeenCalledWith(fakeNewPlan);
            expect(res).resolves.toBe(fakeNewPlan);
        })
        it("should throw an error if basic plan is already exists in database", async () => {
            const planId=process.env.PAYPAL_BASIC_PLAN;
            const planName="basic";
            const fakePlan:Partial<Plan>={
                plan_id:planId!,
                name:planName,
                price:32.90,
                billing_interval:"monthly",
                description:"basic plan"
            };
            (mockPlanRepo.findPlanById as jest.Mock).mockResolvedValue(fakePlan);
            expect(mockPlanRepo.findPlanById).toHaveBeenCalledWith(planId);
            await expect(service.savePlanOnDb).rejects.toThrow("plan is already exist on db");
        })
        it('should throw errors from repository', async () => {
            const planId = process.env.PAYPAL_BASIC_PLAN;
            const planName = 'basic';
            const errorMessage = 'Database connection error';
            
            (mockPlanRepo.findPlanById as jest.Mock).mockRejectedValue(new Error(errorMessage));
            await expect(service.savePlanOnDb(planId!, planName)).rejects.toThrow(errorMessage);
            expect(mockPlanRepo.findPlanById).toHaveBeenCalledWith(planId);
            expect(mockPlanRepo.createPlan).not.toHaveBeenCalled();
        });
    });

    describe("approveSubscription-",()=>{
        const accessToken="fake_token";
        const planId=process.env.PAYPAL_BASIC_PLAN;
        const fakeUser:IUser={
            user_id:"user123",
            email:"user@gmail.com",
            name:"test user"
        }
        const fakeSubscription:IPayPalSubscriptionResponse = {
            id: 'sub_123',
            status: 'ACTIVE',
            plan_id: planId!,
            start_time: new Date().toISOString(),
            update_time: new Date().toISOString(),
            create_time: new Date().toISOString(),
            subscriber:{
                name:{
                    given_name: fakeUser.name
                },
                email_address:fakeUser.email
            } 
        };
        it("should approve subscription successfully",async()=>{
            const subscriptionId="sub123";
            
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            (getSubscriptionById as jest.Mock).mockResolvedValue(fakeSubscription);
            
            const res=await service.approveSubscription(subscriptionId);
            
            expect(getAccessTokenPayPal).toHaveBeenCalled();
            expect(getSubscriptionById).toHaveBeenCalledWith(subscriptionId,accessToken);
            expect(res).resolves.toBe(fakeSubscription);
        });
        it('should throw an error when subscription is not active', async () => {
            const subscriptionId = 'sub-456';
            const mockPayPalSubscription = {...fakeSubscription,status:"PENDING"};
            
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            (getSubscriptionById as jest.Mock).mockResolvedValue(mockPayPalSubscription);

            await expect(service.approveSubscription(subscriptionId)).rejects.toThrow('subscription not found or not active');
            
            expect(getAccessTokenPayPal).toHaveBeenCalledTimes(1);
            expect(getSubscriptionById).toHaveBeenCalledWith(subscriptionId, accessToken);
        });
        it('should throw an error when subscription is not found', async () => {
            const subscriptionId = 'non-exist-sub';
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            (getSubscriptionById as jest.Mock).mockResolvedValue(null);
            await expect(service.approveSubscription(subscriptionId))
            .rejects
            .toThrow('subscription not found or not active');
            
            expect(getAccessTokenPayPal).toHaveBeenCalledTimes(1);
            expect(getSubscriptionById).toHaveBeenCalledWith(subscriptionId, accessToken);
        });
        it('should throw an error when access token cannot be achieved',async()=>{
            const subscriptionId = 'sub-789';
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(null);

            await expect(service.approveSubscription(subscriptionId)).rejects.toThrow();

            expect(getAccessTokenPayPal).toHaveBeenCalledTimes(1);
            expect(getSubscriptionById).not.toHaveBeenCalled();
          });
        })


    // describe("createPlan-",()=>{
    //     PayPalService.setProductId("product_id_123");
    //         const fakeData:CreatePaymentPlanDTO = { 
    //             plan_name: 'basic',
    //             price: 10,
    //             billing_interval: 'monthly',
    //             description: 'basic plan' 
    //         };
    //         const mockPaypalPlanResponse:Partial<IPayPalPlanResponse> = { 
    //             id: 'plan_123',
    //             product_id: 'product_id_123',
    //             name: 'basic',
    //             status: 'ACTIVE',
    //             description: 'basic plan',
    //             billing_cycles: [
    //             {
    //                 frequency: {
    //                     interval_unit: 'MONTH',
    //                     interval_count: 1,
    //                 },
    //                 pricing_scheme: {
    //                     fixed_price: {
    //                         value: '10.00',
    //                         currency_code: 'USD',
    //                     },
    //                 },
    //                 sequence: 1,
    //                 total_cycles: 0,
    //             }]
    //         };
    //         const fakePlan:IFullPlan = {
    //             id: 'plan_123',
    //             plan_name: 'basic',
    //             price: 10, 
    //             billing_interval: 'monthly', 
    //             description: 'basic plan' 
    //         };
    //     it("should create plan and return plan id successfully",async()=>{
    //         const accessToken = "fake_token"; 
    //         PayPalService.setProductId("product_id_123"); 

    //         (getAccessTokenPayPal as jest.Mock).mockResolvedValue("fake_token");
    //         (createPaypalPlan as jest.Mock).mockResolvedValue(mockPaypalPlanResponse as IPayPalPlanResponse);
    //         (mockPlanRepo.findPlanByName as jest.Mock).mockResolvedValue(null); 
    //         (mockPlanRepo.createPlan as jest.Mock).mockResolvedValue(fakePlan);
            
    //         const res = await service.createPlan(fakeData); 
            
    //         expect(getAccessTokenPayPal).toHaveBeenCalled(); //בודקת אם הפונקציה קראה לפונקציה של פייפאל
    //         expect(mockPlanRepo.findPlanByName).toHaveBeenCalledWith(fakeData.plan_name);
    //         expect(createPaypalPlan).toHaveBeenCalledWith(fakeData, "product_id_123", "fake_token"); 
    //         expect(mockPlanRepo.createPlan).toHaveBeenCalledWith(fakePlan,mockPaypalPlanResponse.id);
    //         expect(res).toEqual(fakePlan); //בודקת אם התוכנית נוצרה בהצלחה
    //     })
    //     it("should throw an error if access token is missing", async () => {
    //         (getAccessTokenPayPal as jest.Mock).mockResolvedValue(null);
    //         await expect(service.createPlan(fakeData)).rejects.toThrow("Failed to get access token from PayPal");
    //     });
    //     it('should throw error when plan name is not provided', async () => {
    //         const invalidData: CreatePaymentPlanDTO = { ...fakeData, plan_name: '' };
    //         await expect(service.createPlan(invalidData)).rejects.toThrow("plan name is required");
    //     })
    //     it("should throw error if plan already exists", async () => {
    //         (getAccessTokenPayPal as jest.Mock).mockResolvedValue("fake_token");
    //         (mockPlanRepo.findPlanByName as jest.Mock).mockResolvedValue(fakePlan); 

    //         await expect(service.createPlan(fakeData)).rejects.toThrow("Error creating Paypal plan: plan is already exist");
    //     });
    //     it("should create a product if product id is null", async () => {
    //         PayPalService.setProductId(null);
    //         (getAccessTokenPayPal as jest.Mock).mockResolvedValue("fake_token");
    //         (mockPlanRepo.findPlanByName as jest.Mock).mockResolvedValue(null);
    //         (createPaypalPlan as jest.Mock).mockResolvedValue(mockPaypalPlanResponse as IPayPalPlanResponse);
    //         (mockPlanRepo.createPlan as jest.Mock).mockResolvedValue(fakePlan);
            
    //         //יכולה לבדוק התנהגות של פונקציה אחרת באובייקט ולשלוט על מה תחזיר
    //         const createProductSpy= jest.spyOn(service, 'createProduct').mockResolvedValue("product_id_123");
    //         createProductSpy.mockResolvedValue("product_id_123"); 
            
    //         await service.createPlan(fakeData);
    //         expect(createProductSpy).toHaveBeenCalled();
    //     })
    // })
    // describe("createSubscriptionInit-",()=>{
    //     const fake_plan:IFullPlan = { 
    //         id: 'plan_123',
    //         plan_name: 'basic',
    //         price: 10,
    //         billing_interval: 'monthly',
    //         description: 'basic plan' 
    //     };
    //     it("should return plan id successfully if plan exist",async()=>{
    //         (mockPlanRepo.findPlanByName as jest.Mock).mockResolvedValue(fake_plan);
    //         const res = await service.createSubscriptionInit("basic");
    //         expect(mockPlanRepo.findPlanByName).toHaveBeenCalledWith("basic");
    //         expect(res).toEqual(fake_plan.id); 
    //     });
    //     it("should throw error if plan not exist",async()=>{
    //         (mockPlanRepo.findPlanByName as jest.Mock).mockResolvedValue(null);
    //         await expect(service.createSubscriptionInit("basic")).rejects.toThrow("plan not found");
    //     })
    //     it("should throw error if plan name is not provided", async () => {
    //         await expect(service.createSubscriptionInit("")).rejects.toThrow("plan name is required");
    //     })
    // })
    describe("approveSubscription-",()=>{
        const planId=process.env.PAYPAL_BASIC_PLAN;
        const accessToken="fake_token";
        const subcriptionId="sub_123";
        const fakeSub:IPayPalSubscriptionResponse = {
            id: subcriptionId,
            status: 'ACTIVE',
            plan_id: planId!,
            start_time: new Date().toISOString(),
            create_time: new Date().toISOString(),
            update_time: new Date().toISOString(),
            subscriber: {
                name: { given_name: 'Test User' },
                email_address: 'test@example.com'
            }
        };
        it('should return subscription when subscription is active', async () => {
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            (getSubscriptionById as jest.Mock).mockResolvedValue(fakeSub);
    
            const res= await service.approveSubscription(subcriptionId);
            expect(getAccessTokenPayPal).toHaveBeenCalled(); 
            expect(getSubscriptionById).toHaveBeenCalledWith(subcriptionId,accessToken);
            expect(res).toEqual(fakeSub);    
        })
        it('should throw error if subscription is not active', async () => {
            const fakeSubInactive:IPayPalSubscriptionResponse = { ...fakeSub, status: 'CANCELLED' };
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            (getSubscriptionById as jest.Mock).mockResolvedValue(fakeSubInactive);
    
            await expect(service.approveSubscription(subcriptionId)).rejects.toThrow("subscription not found or not active");
        })
        it('should throw error when subscription is not found', async () => {
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            (getSubscriptionById as jest.Mock).mockResolvedValue(null);
      
            await expect(service.approveSubscription(subcriptionId)).rejects.toThrow('subscription not found or not active');
        });
    });
    describe("createUser-",()=>{
        const fakeUserId="user_123";
        const fakeUserName="test user name";
        const fakeUserEmail="user@gmail.com";
        const fakeUser:IUser = {
            user_id:fakeUserId,
            name:fakeUserName,
            email:fakeUserEmail
        };
        it("should create and return user successfully",async()=>{
            (mockUserRepo.getUserById as jest.Mock).mockResolvedValue(null);
            (mockUserRepo.createUser as jest.Mock).mockResolvedValue(fakeUser);
            
            const res = await service.createUser(fakeUserId,fakeUserName,fakeUserEmail);
            
            expect(mockUserRepo.getUserById).toHaveBeenCalledWith(fakeUserId); 
            expect(mockUserRepo.createUser).toHaveBeenCalledWith({"email": fakeUserEmail, "name": fakeUserName, "user_id": fakeUserId});
            expect(res).toEqual(fakeUser); 
        });
        it("should throw error if user already exists",async()=>{
            (mockUserRepo.getUserById as jest.Mock).mockResolvedValue(fakeUser);
            await expect(service.createUser(fakeUserId,fakeUserName,fakeUserEmail)).rejects.toThrow("user already exist");
        });
        it("should throw error if user id is not provided",async()=>{
            await expect(service.createUser("",fakeUserName,fakeUserEmail)).rejects.toThrow("user id or user name or user email is required on creating user!");
        });
    });
    describe("saveSubscription-",()=>{
        const planName="basic";
        const planId=process.env.PAYPAL_BASIC_PLAN;
        const fakeUserId="user_123";
        const fakePlan:IFullPlan = {
            id: planId!,
            plan_name: planName,
            price: 32.90,
            billing_interval: 'monthly',
            description: 'basic plan' 
        }
        const accessToken="fake_token";
        const fakeUser:IUser = {
            user_id: fakeUserId,
            name: 'test userName',
            email:"user@gmail.com",
        }
        const fakeSubscription:IPayPalSubscriptionResponse = {
            id: 'sub_123',
            status: 'ACTIVE',
            plan_id: fakePlan.id,
            start_time: new Date().toISOString(),
            update_time: new Date().toISOString(),
            create_time: new Date().toISOString(),
            subscriber:{
                name:{
                    given_name: fakeUser.name
                },
                email_address:fakeUser.email
            } 
        };
        const fakeSavedSubscription:ISubscription = {
            subscription_id: fakeSubscription.id,
            user_id: fakeUserId,
            plan_id: fakePlan.id,
            status: 'active',
            start_date: new Date()
        };
        it("should save subscription successfully",async()=>{
            (mockPlanRepo.findPlanByName as jest.Mock).mockResolvedValue(fakePlan);
            (mockSubRepo.createSubscription as jest.Mock).mockResolvedValue(fakeSavedSubscription);

            const res = await service.saveSubscription(planName,fakeUser,fakeSubscription); 
            
            expect(mockPlanRepo.findPlanByName).toHaveBeenCalledWith(planName); 
            expect(mockSubRepo.createSubscription).toHaveBeenCalledWith(fakeSavedSubscription); 
            expect(res).toEqual(fakeSavedSubscription); 
        });
        it("should throw error if plan not found",async()=>{
            (mockPlanRepo.findPlanByName as jest.Mock).mockResolvedValue(null);
            await expect(service.saveSubscription(planName,fakeUser,fakeSubscription)).rejects.toThrow();
        });
        it('should propagate errors from repository', async () => {
    
            (mockPlanRepo.findPlanByName as jest.Mock).mockResolvedValue(fakePlan);
            (mockSubRepo.createSubscription as jest.Mock).mockRejectedValue(new Error());
            await expect(service.saveSubscription(planName, fakeUser, fakeSubscription)).rejects.toThrow();
            expect(mockPlanRepo.findPlanByName).toHaveBeenCalledWith(planName);
            expect(mockSubRepo.createSubscription).toHaveBeenCalled();
        });
      
    })  
    describe("getSubscription-",()=>{
        const fakeSubscriptionId="sub_123";
        const fakeUserId="user_123";
        const fakeSubscription:ISubscription = {
            subscription_id: fakeSubscriptionId,
            user_id: 'user_123',
            plan_id: 'plan_123',
            status: 'active',
            start_date: new Date()
        };
        const fakeUser:IUser = {
            user_id: 'user_123',
            name: 'test userName',
            email:'user@gmail.com'
        }
        it("should return subscription by id successfully",async()=>{
            (mockSubRepo.getSubscriptionWithDetails as jest.Mock).mockResolvedValue(fakeSubscription);
            
            const res = await service.getSubscription(fakeSubscriptionId); 
            
            expect(mockSubRepo.getSubscriptionWithDetails).toHaveBeenCalledWith(fakeSubscriptionId); 
            expect(res).toEqual(fakeSubscription); 
        });
        it("should throw error when neither subscription id nor user id is provided", async () => {
            await expect(service.getSubscription("")).rejects.toThrow("subscription Id or user ID is required");
        });
        it("should return null if subscription not found",async()=>{
            (mockSubRepo.getSubscriptionWithDetails as jest.Mock).mockResolvedValue(null);
            const res=await service.getSubscription(fakeSubscriptionId);
            expect(res).toBeNull();
        });
        it("should return subscription by user id successfully",async()=>{
            (mockUserRepo.getUserById as jest.Mock).mockResolvedValue(fakeUser);
            (mockSubRepo.getSubscriptionWithDetails as jest.Mock).mockResolvedValue(fakeSubscription);
            const res = await service.getSubscription("",fakeUserId); 
            
            expect(mockUserRepo.getUserById).toHaveBeenCalledWith(fakeUserId); 
            expect(mockSubRepo.getSubscriptionWithDetails).toHaveBeenCalledWith(fakeUserId); 
            expect(res).toEqual(fakeSubscription); 
        });
        it("should throw error if user not found",async()=>{
            (mockUserRepo.getUserById as jest.Mock).mockResolvedValue(null);
            await expect(service.getSubscription("",fakeUserId)).rejects.toThrow("user not found");
        });
    })
    describe("cancelSubscription-",()=>{
        const accessToken="fake_token"
        const fakeUserId="user_123";
        const fakeSubscriptionId="sub_123";
        const fakeSubscription:ISubscription = {
            subscription_id: fakeSubscriptionId,
            user_id: fakeUserId,
            plan_id: 'plan_123',
            status: 'active',
            start_date: new Date()
        };
        it("should cancel subscription successfully",async()=>{
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            jest.spyOn(service, 'getSubscription').mockResolvedValue(fakeSubscription); 
            (cancelPaypalSubscription as jest.Mock).mockResolvedValue(true);
            (mockSubRepo.cancelPostgreSqlSubscription as jest.Mock).mockResolvedValue(true); 
            
            const res= await service.cancelSubscription(fakeUserId);
            expect(getAccessTokenPayPal).toHaveBeenCalled();
            expect(service.getSubscription).toHaveBeenCalledWith(fakeUserId); 
            expect(cancelPaypalSubscription).toHaveBeenCalledWith(fakeSubscription.subscription_id,accessToken);
            expect(mockSubRepo.cancelPostgreSqlSubscription).toHaveBeenCalledWith(fakeSubscription.subscription_id);
            expect(res).toBe(true);
        });
        it("should throw error if access token is missing",async()=>{
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(null);
            await expect(service.cancelSubscription(fakeUserId)).rejects.toThrow("access token not found");
        });
        it('should not delete from PostgreSQL when haveSubTwice is true', async () => {
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            jest.spyOn(service, 'getSubscription').mockResolvedValue(fakeSubscription); 
            (cancelPaypalSubscription as jest.Mock).mockResolvedValue(true);
        
            const result = await service.cancelSubscription(fakeUserId, true);

            expect(getAccessTokenPayPal).toHaveBeenCalledTimes(1);
            expect(service.getSubscription).toHaveBeenCalledWith(fakeUserId);
            expect(cancelPaypalSubscription).toHaveBeenCalledWith(fakeSubscriptionId, accessToken);
            expect(mockSubRepo.cancelPostgreSqlSubscription).not.toHaveBeenCalled();
            expect(result).toBe(true);
          });
        it("should throw error if subscription not found",async()=>{
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            jest.spyOn(service, 'getSubscription').mockResolvedValue(null); 
            await expect(service.cancelSubscription(fakeUserId,false)).rejects.toThrow("this subscription is'nt active or not exist");
        });
        it("should throw error if user id is not provided",async()=>{
            await expect(service.cancelSubscription("")).rejects.toThrow("user id is required!");
        });
    });
    describe("getUserById-",async()=>{
        const fakeUserId="user123";
        const fakeUser:IUser={
            user_id:fakeUserId,
            name:"user Test",
            email:"userTest@gmail.com"
        }
        it("should get user successfully",async()=>{
            (mockUserRepo.getUserById as jest.Mock).mockResolvedValue(fakeUser);
            const res=await service.getUserById(fakeUserId);
            expect(mockUserRepo.getUserById).toHaveBeenCalledWith(fakeUserId);
            expect(res).resolves.toBe(fakeUser);
        })
        it("Should throw error if user id is not provided:",async()=>{
            const res=await service.getUserById("");
            expect(res).rejects.toThrow("user id is required!");
        })
        it("Should return null if user is not found:",async()=>{
            const res=await service.getUserById(fakeUserId);
            expect(res).resolves.toBeNull()
        })
    })
    describe("deleteUser-",()=>{
        const fakeUserId="user123";
        it("should delete user from db successfully",async()=>{
            (mockUserRepo.deleteUser as jest.Mock).mockResolvedValue(true); // רק שורה 1 נמחקה
            const result = await service.deleteUserFromDb(fakeUserId);
            expect(mockUserRepo.deleteUser).toHaveBeenCalledWith(fakeUserId);
            expect(result).toBe('user deleted completely');
        })
        it('should have errors from repository', async () => {
            const errorMessage = 'could not deleted user';
            (mockUserRepo.deleteUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(service.deleteUserFromDb(fakeUserId)).rejects.toThrow(errorMessage); 
            expect(mockUserRepo.deleteUser).toHaveBeenCalledWith(fakeUserId);
        });
    })
    describe("getAllSubscriptions-",()=>{
        it("should return all subscriptions successfully",async()=>{
            const fakeSubscription:ISubscription = {
                subscription_id: 'sub_123',
                user_id: 'user_123',
                plan_id: 'plan_123',
                status: 'active',
                start_date: new Date()
            };
            const fakeSubscriptions:ISubscription[] = [fakeSubscription];
            (mockSubRepo.getAllSubscriptions as jest.Mock).mockResolvedValue(fakeSubscriptions);
            
            const res = await service.getAllSubscriptions(); 
            
            expect(mockSubRepo.getAllSubscriptions).toHaveBeenCalled(); 
            expect(res).toEqual(fakeSubscriptions); 
        });
        it("should return null if subscriptions not found",async()=>{
            (mockSubRepo.getAllSubscriptions as jest.Mock).mockResolvedValue(null);
            const res=await service.getAllSubscriptions();
            expect(res).toBeNull();
        });
    });
    describe("updateSubscription-",()=>{
        const fakeUserId="user_123";
        const fakeUpdateData:updatePaypalSubscriptionDTO={
            userId:fakeUserId,
            propertyToUpdate:"status",
            updateValue:"active"
        };
        const fakeSubscription:ISubscription = {
            subscription_id: 'sub_123',
            user_id: fakeUserId,
            plan_id: 'plan_123',
            status: 'cancelled',
            start_date: new Date()
        };
        const fakeUpdatedSubscription:ISubscription = {
            ...fakeSubscription,
            status:"cancelled"
        };
        it("should update subscription successfully",async()=>{
            const accessToken="fake_token";
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            jest.spyOn(service,'getSubscription').mockResolvedValue(fakeSubscription);
            (updatePaypalSubscription as jest.Mock).mockResolvedValue(true);
            (mockSubRepo.updateSubscription as jest.Mock).mockResolvedValue(fakeUpdatedSubscription as ISubscription);
            
            const res = await service.updateSubscription(fakeUpdateData); 
            
            expect(getAccessTokenPayPal).toHaveBeenCalled();
            expect(service.getSubscription).toHaveBeenCalledWith("",fakeUserId);
            expect(updatePaypalSubscription).toHaveBeenCalledWith(fakeSubscription.subscription_id,accessToken,fakeUpdateData.propertyToUpdate,fakeUpdateData.updateValue);
            expect(mockSubRepo.getSubscriptionWithDetails).toHaveBeenCalledWith(fakeUserId); 
            expect(mockSubRepo.updateSubscription).toHaveBeenCalledWith(fakeSubscription.subscription_id,fakeUpdateData.propertyToUpdate,fakeUpdateData.updateValue); 
            expect(res).toEqual(fakeUpdatedSubscription); 
        });
        it("should throw error if access token is missing",async()=>{
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(null);
            await expect(service.updateSubscription(fakeUpdateData)).rejects.toThrow("access token not found");
        });
        it("should throw error if subscription not found",async()=>{
            const accessToken="fake_token";
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            jest.spyOn(service,'getSubscription').mockResolvedValue(null);
            await expect(service.updateSubscription(fakeUpdateData)).rejects.toThrow("this subscription isn't exist");
        });
        it("should throw error if user id is not provided",async()=>{
            const dataWithoutUserId:updatePaypalSubscriptionDTO={...fakeUpdateData,userId:""};
            await expect(service.updateSubscription(dataWithoutUserId)).rejects.toThrow("user id is required!");
        });
        it("should throw error if property to update is not provided",async()=>{
            const dataWithoutProperty:updatePaypalSubscriptionDTO={...fakeUpdateData,propertyToUpdate:""};
            await expect(service.updateSubscription(dataWithoutProperty)).rejects.toThrow("property to update or update value are required!");
        });
        it('should throw error when the value is already the same', async () => {
            const accessToken="fake_token";
            const fakeUpdateSameData:updatePaypalSubscriptionDTO={
                ...fakeUpdateData,
                updateValue: "active"
            };
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            jest.spyOn(service,'getSubscription').mockResolvedValue(fakeSubscription);
            await expect(service.updateSubscription(fakeUpdateSameData)).rejects.toThrow("the value is already exist in the subscription");
        });
        it('should throw error when PayPal update fails', async () => {
            const accessToken="fake_token";
            (getAccessTokenPayPal as jest.Mock).mockResolvedValue(accessToken);
            jest.spyOn(service,'getSubscription').mockResolvedValue(fakeSubscription);
            (updatePaypalSubscription as jest.Mock).mockRejectedValue(new Error("PayPal update failed"));
            await expect(service.updateSubscription(fakeUpdateData)).rejects.toThrow( "PayPal update failed");
        });        
    });
});

     
