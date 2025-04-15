
// import { getAccessTokenPayPal } from "../../../config/paypal_accessToken"
// import UserRepository from "../../../repositories/user.repository";
// import { PlanRepositoryPSql } from "../../../repositories/plan.repository";
// import { SubscriptionRepository } from "../../../repositories/subscription";
// import PayPalService from "../paypal_service";
// import { ISubscription } from "../../../interfaces/ISubscription";
// import { IPayPalSubscriptionResponse } from "../../../interfaces/IPaypalResponses";
// import { IFullPlan } from "../../../interfaces/IPlan";
// import { IUser } from "../../../interfaces/IUser";


// //"אל תשתמש בקוד המקורי של הקבצים האלו – תיצור גרסאות מזויפות 
// // (Mocked Modules) שאנחנו נשלוט עליהן בבדיקה".
// jest.mock("../src/config/paypal_accessToken");
// jest.mock('../../payPal_requests/subscription_requset');

// //התוצאה הרצויה והגדרת המשתנים שנעבוד בהם בבדיקות- ייצור עותק
// describe("PayPalService - createSubscription", () => {
//   let service: PayPalService;
//   let planRepository: jest.Mocked<PlanRepositoryPSql>; //MOCKED = טיפוס של הספריה JEST שמאפשר לנו ליצור אובייקט מזויף (Mocked Object)
//   let subscriptionRepository: jest.Mocked<SubscriptionRepository>;
//   let userRepository: jest.Mocked<UserRepository>;

//   beforeEach(() => {
//     planRepository = {findPlanByName: jest.fn()} as any;  //תיצור פונקציה מדומה שאפשר לבדוק האם קראו לה, עם איזה פרמטרים, ולהחזיר ערכים כרצוננו״.
//     // //הפונקציה לא תעשה כלום, היא רק תדמה את ההתנהגות של הפונקציה המקורית.
//     subscriptionRepository = { createSubscription: jest.fn()} as any;
//     userRepository = { getUserById: jest.fn() } as any;
//     //מופע אמיתי של סרביס עם תלויות מזוייפות- בודק את הלוגיקה ללא תלויות חיצוניות
//     service = new PayPalService(planRepository, subscriptionRepository, userRepository);
//   });

//   it("should create a subscription successfully", async () => {
//     //הגדרת משתנים
//     const fake_plan:IFullPlan = { id: 'plan_123', plan_name: 'basic', price: 10, billing_interval: 'monthly', description: 'basic plan' };
//     const fake_user:IUser = { user_id: 'user_123', name: 'John', email: 'john@test.com' };
//     const fake_paypal_Sub_response : IPayPalSubscriptionResponse = {
//         id: 'sub_123',
//         status: 'ACTIVE',
//         plan_id: fake_plan.id,
//         start_time: new Date().toISOString(),
//         update_time:  new Date().toISOString(),
//         create_time: new Date().toISOString(),
//         subscriber:{
//             name:{
//                 given_name: fake_user.name
//             },
//             email_address:fake_user.email
//         } 
//     };
//     const created_sub_postgreSql_res:ISubscription = {
//         subscription_id: 'sub_123',
//         user_id: 'user_123',
//         plan_id: 'plan_123',
//         status: 'active',
//         start_date: new Date()
//     };
//     //מזייפים התנהגות של פונקציות שהשתמשנו בהן בפונקציה המקורית וקובעים מה עליהם להחזיר
//     (getAccessTokenPayPal as jest.Mock).mockResolvedValue("fake_token"); //בודקת האם פייפאל מחזירה טוקן גישה
//     planRepository.findPlanByName.mockResolvedValue(fake_plan); //בודקת האם הפונקציה מחזירה את התוכנית הנכונה
//     userRepository.getUserById.mockResolvedValue(fake_user); //בודקת האם הפונקציה מחזירה את המשתמש הנכון
//     (createPaypalSubscription as jest.Mock).mockResolvedValue(fake_paypal_Sub_response); //יוצרת מנוי בפייפאל ומחזירה את התגובה המזויפת
//     subscriptionRepository.createSubscription.mockResolvedValue(created_sub_postgreSql_res); //יוצרת את המנוי בבסיס הנתונים ומחזירה את התגובה המזויפת

//     //מפעילים את הפונ' אותה נרצה לבדוק
//     const result = await service.createSubscription("basic", "user_123");

//     expect(getAccessTokenPayPal).toHaveBeenCalled();
//     expect(planRepository.findPlanByName).toHaveBeenCalledWith("basic"); 
//     expect(userRepository.getUserById).toHaveBeenCalledWith("user_123"); 
//     expect(createPaypalSubscription).toHaveBeenCalledWith(fake_plan.id, fake_user, "fake_token");
//     expect(result).toEqual(created_sub_postgreSql_res);
//   });

//   it("should throw error if plan is not found", async () => {
//     (getAccessTokenPayPal as jest.Mock).mockResolvedValue("fake_token");
//     planRepository.findPlanByName.mockResolvedValue(null);

//     await expect(service.createSubscription("basic", "user_123"))
//       .rejects.toThrow("plan or user not found");
//   });
// });
