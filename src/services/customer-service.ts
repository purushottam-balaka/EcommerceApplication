import { Customer } from "../entity/customer-model";
import { AppDataSource } from "../data-source";
import {infologger,errorLogger} from "../../logger";
import { hashedPassword, decryptPassword } from "./hashed-password";
import { Order } from "../entity/order-model";
import { Product } from "../entity/product-model";
import { OrderItem } from "../entity/orderItem-model";
import { Payment } from "../entity/payment-model";
// import { And, FindOptionsUtils } from "typeorm";
import { Cart } from "../entity/cart-model";
import { response } from "express";



const encryptionKey = 'ASDF1234';
const orderRepo=AppDataSource.getRepository(Order)
const custRepo= AppDataSource.getRepository(Customer)
const prodRepo=AppDataSource.getRepository(Product)
const orderItemRepo=AppDataSource.getRepository(OrderItem)
const paymentRepo=AppDataSource.getRepository(Payment)
const cartRepo= AppDataSource.getRepository(Cart)

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
                // infologger.info('Login block executed')
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
                // errorLogger.error(err)
                console.log(err)
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
                const itemsFound=[]
                const itemsNotFound=[]
                const customer = await custRepo.findOneBy({primaryNumber:args.customer.primaryNumber})
                if (customer){
                        const orderTableItems=await orderRepo.find({relations:['customerId'],order:{id:'ASC'}} as any)
                        for (var  data of orderTableItems.reverse()){                     
                                if (data.customerId.id==customer.id as any ){
                                        var lastOrder=data
                                        break
                                }
                        }
                        for(let ele of args.product) {    
                                        var orderItem=ele
                                        
                                        const productItem=await prodRepo.findOneBy({productName:orderItem.productName as any})
                                                if(productItem){
                                                        if((productItem.availableQuantitiy-orderItem.quantity ) >= 0  && productItem.isDiscontinued==false){
                                                                itemsFound.push(orderItem)
                                                        }else{
                                                                itemsNotFound.push(orderItem)     
                                                        }
                                                }
                                                else{
                                                itemsNotFound.push(orderItem)
                                                }
                        }
                        if(itemsNotFound.length==args.product.length  ){
                                        return {isSuccess:false,errMsg:'Sorry,Items not avilable,Order failed', errData:itemsNotFound}
                        }
                        if(itemsFound.length>0){
                                if(!lastOrder || lastOrder.isActive==false){
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
                                product.availableQuantitiy=product.availableQuantitiy-item.quantity
                                await prodRepo.save(product)
                                orderItemElem.quantity=item.quantity
                                await orderItemRepo.save(orderItemElem)
                                totalAmount=totalAmount+(product.unitPrice*item.quantity)
                                if(item.cartItemId){
                                await cartRepo.delete({id:item.cartItemId})
                                }
                                }
                                savedOrder.totalAmount = totalAmount 
                                var resp=await orderRepo.save(savedOrder)
                        }
                        if(itemsFound.length==args.product.length)
                                return { isSuccess:true, message:'Order created successfully',name:customer.firstName,data:itemsFound,customerId:customer.id, ordInfo:resp }
                        else
                        return { isSuccess:true, message:'Partial Order created successfully,Someitems are not avilable',name:customer.firstName,data:itemsFound,errData:itemsNotFound, customerId:customer.id, ordInfo:resp }        
                }else
                        return { isSuccess:false,errMsg:'Sorry,User not found'  }
        
        }catch(err){
                console.log(err)
        
        }
}

public makeNewPayment=async(args)=>{
        try{    
                const payment=await paymentRepo.findOne({relations:['orderId'], where:{id:args.id}}as any)
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

public singleItemOrder=async(args)=>{
        try{    
                // console.log('args',args)
                const product=[]
                const cartItem=await cartRepo.find({relations:['customerId', 'productId'],where:{id:args.cartItemId} }as any)        
                for (var ele of cartItem){
                        const productInput={
                                cartItemId:ele.id,
                                productName:ele.productId.productName,
                                package:ele.productId.package,
                                isDiscontinued:ele.productId.isDiscontinued,
                                quantity:ele.quantity
                        }
                        product.push(productInput)
                        var customer=ele.customerId
                }
                //remove the placed Orer item from cart
                return {customer,product}
        }catch(err){
                console.log(err)
        }
}
public allItemsOrder=async(args)=>{
        try{    
                const product=[]
                const cartItems=await cartRepo.find({relations:['customerId','productId']} )
                for(var i of cartItems){
                        if (i.customerId.id==args.customerId){
                                const productInput={
                                        cartItemId:i.id,
                                        productName:i.productId.productName,
                                        package:i.productId.package,
                                        isDiscontinued:i.productId.isDiscontinued,
                                        quantity:i.quantity
                                }
                                product.push(productInput)
                                var customer=i.customerId
                        }
                }
                return {customer,product}
        }catch(err){
                console.log(err)
        }
}

}

