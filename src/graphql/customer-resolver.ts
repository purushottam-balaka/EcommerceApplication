// import  {getCustomerDetails,add_new_customer,updateCustomer, deleteCustomer}  from "../services/customer";
import { CustomerService } from "../services/customer-service"
export const customerResolver={
    Query:{
        customerGet: async(_,args)=>{
            const user=new CustomerService()
            const data=await user.getCustomerDetails(args.input.id)
            return data
        },
        getOrderDetails: async(_,args)=>{
            const user=new CustomerService()
            const details= await user.orderDeatils(args.input.primaryNumber)
            return details
        }
    },
    Mutation:{
        
        add_customer:async(_,args)=>{
            const user=new CustomerService()
            const data= await user.add_new_customer(args.input.firstName,args.input.lastName,args.input.city,args.input.country, args.input.phone, args.input.password,args.input.primaryNumber)
            return data
        },
        verifyingUserLogin:async(_,args)=>{
            const user = new CustomerService()
            const data= await user.userLogin(args.input.primaryNumber, args.input.password)
            return data
        },

        update_customer:async(_,args)=>{
            const user=new CustomerService()
            const data=await user.updateCustomer(args.input.id,args.input.firstName,args.input.lastName,args.input.city,args.input.country, args.input.phone)
            return data
        },

        delete_customer:async(_, args)=>{
            const user=new CustomerService()
            const data= await user.deleteCustomer(args.input.id)
            return data;
        },
        createNewOrder:async(_,args)=>{
            const user=new CustomerService()
            const data=await user.createOrder(args.input)
            return data 
        },

        makePayment:async(_,args)=>{
            const user = new CustomerService()
            const data= await user.makeNewPayment(args.input)
            return data
        }
        
    }
}