// import  {getCustomerDetails,add_new_customer,updateCustomer, deleteCustomer}  from "../services/customer";
import { CustomerService } from "../services/customer-service"
export const customerResolver={
    Query:{
        customerGet: async()=>{
            const user=new CustomerService()
            const data=await user.getCustomerDetails()
            return data
        }
    },
    Mutation:{
        
        add_customer:async(_,args)=>{
            const user=new CustomerService()
            const data= await user.add_new_customer(args.input.FirstName,args.input.LastName,args.input.City,args.input.Country, args.input.Phone)
            return data
        },

        update_customer:async(_,args)=>{
            const user=new CustomerService()
            const data=await user.updateCustomer(args.input.id,args.input.FirstName,args.input.LastName,args.input.City,args.input.Country, args.input.Phone)
            return data
        },

        delete_customer:async(_, args)=>{
            const user=new CustomerService()
            const data= await user.deleteCustomer(args.input.id)
            return data;
        }
    }
}