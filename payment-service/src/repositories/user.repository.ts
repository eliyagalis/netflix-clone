import { inject, injectable } from "inversify";
import { CreateUserDTO } from "../DTO'S/user.repo.dto";
import { IUser } from "../interfaces/IUser";
import { Subscription } from "../models/subscription";
import { User } from "../models/user";
import { Tokens } from "../utils/tokens";
import { IUserAdapter } from "../interfaces/IUserAdapter";

export interface IUserRepository{
    createUser(data:CreateUserDTO):Promise<IUser>,
    getUserById(userId:string):Promise<IUser|null>,
    getAllUsers():Promise<User[]|null>,
    deleteUser(userId:string):Promise<string>
}
@injectable()
export default class UserRepository implements IUserRepository{
    constructor(@inject(Tokens.IUserAdapter) private userAdapter:IUserAdapter){}
    async createUser(data:CreateUserDTO):Promise<IUser>{
        if(!data.user_id||!data.email){
            console.log("one of the parameters user id/name/email is missing to create a userName");
            throw new Error("one of the parameters user id/name/email is missing");
        }
        console.log( "the user Id in repo:", data.user_id);
        const user = this.userAdapter.convert({
            ...data,
            _id: data.user_id
        });
        try {
            const newUser=new User({
                user_id:user.user_id!,
                email:data.email,
                subscriptions:data.subscriptions? data.subscriptions:null
            })
            await newUser.save();
            return newUser as IUser
        } catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }
    async getUserById(userId:string):Promise<IUser|null>{
        if(!userId){
            throw new Error("user id is undefined");
        }
        const userConverted = this.userAdapter.convert({
            _id: userId,
            email:""
        });
        try {
            const user=await User.findOne({
                where:{
                    user_id:userConverted.user_id
                },
                include:[
                    {model:Subscription}
                ]
            });
            return user;
        } catch (error) {
            return null;
        }
    }
    async getAllUsers():Promise<User[]|null>{
        try {
            const allUsers= await User.findAll();
            return allUsers.length>0 ? allUsers:null
        } 
        catch (error) {
            console.error("Error fetching users: ", error);
            throw new Error("Could not fetch users.");
        }   
    }
    async deleteUser(userId:string):Promise<string>{
        if(!userId){
            throw new Error("user id is undefined");
        }
        const user = this.userAdapter.convert({
            _id: userId,email:""
        });
        try {
            await User.destroy({
                where:{user_id:user.user_id}
            })
            return "user deleted completely";
        } catch (error) {
            throw new Error("could not deleted user ");
        }
    }
}