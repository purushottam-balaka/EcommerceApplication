import { Customer } from "../entity/customer-model";
import { AppDataSource } from "../data-source";
import {infologger,errorLogger} from "../../logger";
import { hashedPassword, decryptPassword } from "./hashed-password";
import crypto from 'crypto'

const encryptionKey = 'ASDF1234';

const CustRepo=AppDataSource.getRepository(Customer)
export class CustomerService{
        public getCustomerDetails=async(id)=>{
                        try{    
                                if(id){
                                        const user=await CustRepo.findOneBy({id:id})
                                        if (user)
                                                return [user]
                                }
                                else{
                                        const user= await CustRepo.find()
                                        return user
                                }
                        }catch(err){
                                errorLogger.error(err)
                                 }
                }

public add_new_customer=async(FirstName,LastName,City,Country, Phone,Password,PrimaryNumber)=>{
        try{    
                const hashedPass=await hashedPassword(Password,encryptionKey)
                // console.log('hashed',hashedPass)
                let user=new Customer()
                user.password=hashedPass
                user.firstName=FirstName
                user.lastName=LastName
                user.city=City
                user.country=Country
                user.phone=Phone
                user.primaryNumber=PrimaryNumber
                await CustRepo.save(user)
                infologger.info('Executed registring service')
                user.password=Password
                return user
        }catch(err){
                errorLogger.error(err)
        }
}

public userLogin=async(primaryNumber, passowrd)=>{
        try{    
                infologger.info('Login block executed')
                const user=await CustRepo.findOneBy({primaryNumber:primaryNumber})
                if(user){
                        const hashed=user.password
                        const decPassword=await decryptPassword(hashed, encryptionKey)
                        if (passowrd==String(decPassword))
                                return {msg:'User logged in successfully'}
                        else{
                                return {msg:'Entered passowrd is wrong'}
                        }
                     
                }
                else{
                        return {msg:'User does not existed'}
                }
        }catch(err){
                errorLogger.error(err)
        }
}

public updateCustomer=async(id,FirstName,LastName,City,Country, Phone)=>{
        try{
                const user=await CustRepo.findOneBy({id:id})
                if(user){
                        user.firstName=FirstName
                        user.lastName=LastName
                        user.city=City
                        user.country=Country
                        user.phone=Phone
                        const res=CustRepo.save(user)
                        return res
                }
                return {msg:"User not found"}
        }catch(err){
                errorLogger.error(err)
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
                errorLogger.error(err)
        }
}


}