import { Customer } from "../entity/customer-model";
import { AppDataSource } from "../data-source";
import logger from "../../logger";
const CustRepo=AppDataSource.getRepository(Customer)
export class CustomerService{
        public getCustomerDetails=async()=>{
                        try{
                        const user=await CustRepo.find()
                        return user
                        }catch(err){
                                logger.warn(err)
                                 }
                }

public add_new_customer=async(FirstName,LastName,City,Country, Phone)=>{
        try{
        const user=new Customer()
        user.FirstName=FirstName
        user.LastName=LastName
        user.City=City
        user.Country=Country
        user.Phone=Phone
        const res = await CustRepo.save(user)
        console.log(res)
        return res
        }catch(err){
                logger.warn(err)
        }
}

public updateCustomer=async(id,FirstName,LastName,City,Country, Phone)=>{
        try{
                const user=await CustRepo.findOneBy({id:id})
                if(user){
                        user.FirstName=FirstName
                        user.LastName=LastName
                        user.City=City
                        user.Country=Country
                        user.Phone=Phone
                        const res=CustRepo.save(user)
                        return res
                }
                return {msg:"User not found"}
        }catch(err){
                logger.error(err)
        }
}

public deleteCustomer=async(id)=>{
        try{
                const user= await CustRepo.findOneBy({id:id})
                if(user){
                        await CustRepo.remove(user)
                        return {msg:"User deleted successfully"}
                }
                return {msg:"User not found"}
        }catch(err){
                logger.error(err)
        }
}
}