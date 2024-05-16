import { CustomerService } from "../services/customer-service"
export const customerResolver={
    Query:{
        getCustomers: async(_,args)=>{
            const user=new CustomerService()
            const data=await user.getCustomerDetails(args.input.primaryNumber)
            return data
        },
        getOrderDetails: async(_,args)=>{
            const user=new CustomerService()
            const details= await user.orderDeatils(args.input.primaryNumber)
            return details
        }
    },
    Mutation:{
        
        addCustomer:async(_,args)=>{
            const user=new CustomerService()
            const data= await user.addNewCustomer(args.input.firstName,args.input.lastName,args.input.city,args.input.country, args.input.password,args.input.primaryNumber)
            return data
        },
        loginCustomer:async(_,args)=>{
            const user = new CustomerService()
            const data= await user.userLogin(args.input.primaryNumber, args.input.password)
            return data
        },

        update_customer:async(_,args)=>{
            const user=new CustomerService()
            const data=await user.updateCustomer(args.input.firstName,args.input.lastName,args.input.city,args.input.country, args.input.primaryNumber)
            return data
        },

        delete_customer:async(_, args)=>{
            const user=new CustomerService()
            const data= await user.deleteCustomer(args.input.primaryNumber)
            return data;
        },
        createNewOrder:async(_,args)=>{
            const user=new CustomerService()
            const data=await user.createOrder(args.input)
            return data 
        },

        makePayment:async(_,args)=>{
            const user = new CustomerService()
            const data= await user.makeNewPayment(args.input )
            return data
        }, 
        singleItemOrderFromCart:async(_, args)=>{
            const user=new CustomerService()
            const data= await user.singleItemOrder(args.input)
            const createOrder=await user.createOrder(data)
            return createOrder
        },
        allItemsOrderFromCart:async(_,args)=>{
            const user=new CustomerService()
            const data= await user.allItemsOrder(args.input)
            const createOrder= await user.createOrder(data)
            return createOrder
        }
        
    }
}