import { Customer } from "../entity/customer-model";
import { AppDataSource } from "../data-source";
import {infologger,errorLogger} from "../../logger";
import { hashedPassword, decryptPassword } from "./hashed-password";
import { Order } from "../entity/order-model";
import { Product } from "../entity/product-model";
import { OrderItem } from "../entity/orderItem-model";
import { Payment } from "../entity/payment-model";
import { FindOptionsUtils } from "typeorm";
import { prototype } from "events";



const encryptionKey = 'ASDF1234';
const orderRepo=AppDataSource.getRepository(Order)
const custRepo= AppDataSource.getRepository(Customer)
const prodRepo=AppDataSource.getRepository(Product)
const orderItemRepo=AppDataSource.getRepository(OrderItem)
const paymentRepo=AppDataSource.getRepository(Payment)
export class CustomerService{
        public getCustomerDetails=async(id)=>{
                        try{    
                                if(id){
                                        const user=await custRepo.findOneBy({id:id})
                                        if (user){
                                                const plainPass=await decryptPassword(user.password,encryptionKey)
                                                user.password=plainPass
                                                return [user]
                                        }
                                }
                                else{
                                        const user= await custRepo.find()
                                        user.forEach(async(ele)=>{
                                                const plainPass=await decryptPassword(ele.password,encryptionKey)
                                                ele.password=plainPass
                                        })
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
                user.primaryNumber=PrimaryNumber
                await custRepo.save(user)
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
                const user=await custRepo.findOneBy({primaryNumber:primaryNumber})
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
                const user=await custRepo.findOneBy({id:id})
                if(user){
                        user.firstName=FirstName
                        user.lastName=LastName
                        user.city=City
                        user.country=Country
                        const res=custRepo.save(user)
                        return res
                }
                return {msg:"User not found"}
        }catch(err){
                errorLogger.error(err)
        }
}

public deleteCustomer=async(id)=>{
        try{
                const user= await custRepo.findOneBy({id:id})
                if(user){
                        await custRepo.remove(user)
                        return {msg:"User deleted successfully"}
                }
                return {msg:"User not found"}
        }catch(err){
                errorLogger.error(err)
        }
}

public orderDeatils=async(primaryNumber)=>{
        try{    
                const user=await custRepo.findOneBy({primaryNumber:primaryNumber})
                if(!user)
                        return {msg:'No user found'}
                const orders= await orderRepo.findBy({customerId:user.id as any})
                if (!orders){ 
                        return {msg:'No orders with given primary number'}
                }
                return orders
        }catch(err){
                errorLogger.error(err)
        }
}

public createOrder=async(args)=>{
        try{    
                // console.log('args', args)
                const itemsFound=[]
                const itemsNotFound=[]
                // var totalAmount=0
                const customer = await custRepo.findOneBy({primaryNumber:args.customer.primaryNumber})
                if (customer){
                        // console.log('customer',customer)
                        const lastOrder=await orderRepo.findOne({ relations:['customerId'],where:{customerId:customer.id},order:{id:'DESC'}}as any)
                        // console.log('last Order',lastOrder)
                        for (let ele in args.product)
                                if(args.product.hasOwnProperty(ele)){
                                        var value=args.product[ele]
                                const item=await prodRepo.findOneBy({productName:value.productName as any})
                                if(item)
                                        itemsFound.push(value)
                                else
                                        itemsNotFound.push(value)
                        }
                        if(itemsNotFound.length==args.product.length){
                                        return {isSuccess:false,errMsg:'Sorry,Items not avilable,Order failed', errData:itemsNotFound}
                        }
                        if(itemsFound.length>0){
                                if(lastOrder.isActive==false){
                                        var orderElem= { } as Order
                                        orderElem.customerId=customer.id as any
                                        orderElem.orderDate=new Date()
                                        orderElem.isActive=true
                                        var savedOrder=await orderRepo.save(orderElem)       
                                }
                                if(!savedOrder)
                                savedOrder=lastOrder
                                var totalAmount=await (await orderRepo.findOne({relations:['customerId'],where:{id:savedOrder.id}}as any)).totalAmount
                                for(var item of itemsFound){                                                                     
                               const product = await prodRepo.findOneBy({productName:item.productName})
                               const  orderItemElem= { } as OrderItem
                               orderItemElem.orderId=savedOrder.id as any
                               orderItemElem.productId=product.id as any
                               orderItemElem.unitPrice=product.unitPrice
                               orderItemElem.quantity=item.quantity
                               await orderItemRepo.save(orderItemElem)
                               totalAmount=totalAmount+(product.unitPrice*item.quantity)
                                }
                                console.log('toatl amount',totalAmount)
                                savedOrder.totalAmount = totalAmount 
                                // console.log('orderElem',orderElem.totalAmount)
                                const updateOrder=await orderRepo.save(savedOrder)
                        }
                        if(itemsFound.length==args.product.length)
                                return { isSuccess:true, message:'Order created successfully',name:args.customer.firstName,data:savedOrder   }
                        else
                        return { isSuccess:true, message:'Partial Order created successfully,Someitems are not avilable',name:args.customer.firstName,data:savedOrder,errData:itemsNotFound   }        
                }else
                        return { isSuccess:false,errMsg:'Sorry,User not found',name:args.customer.firstName  }
        }catch(err){
                console.log(err)
        
        }
}

public makeNewPayment=async(args)=>{
        try{    
                const payment=await paymentRepo.findOne({relations:['orderId'], where:{id:args.id}}as any)
                console.log('payment',payment)
                const orderItem=await orderRepo.findOneBy({id:payment.orderId.id})
                if(!payment)   
                        return {msg:'Payment is not found'}
                payment.isPaymentActive=false
                await paymentRepo.save(payment)
                const orderAmount=orderItem.totalAmount
                const orderId=orderItem.id
                orderItem.isActive=false
                await orderRepo.save(orderItem)
                return {msg:'Payment completed successfully',paymentAmount:orderAmount,orderId:orderId}
        }catch(err){
                console.log(err)
        }
}


}