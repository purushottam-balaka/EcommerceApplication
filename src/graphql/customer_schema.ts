import { gql } from "postgraphile";
export const Customer_schema=gql`
extend type Query{
    customerGet(input : customerInput!):[Customer!] 
    getOrderDetails(input : getOrderInput!):[Order]
}
input customerInput{
    id:Int
}
type getCustomerDetails{
    firstName:String
    lastName:String
    city:String
    country:String
}
input addCustInput{
    firstName:String!
    lastName:String!
    city: String!
    country:String!
    password:String!
    primaryNumber:Int!
}
type product{
    productName:String
    package:String
    isDiscontinued:Boolean
    quantity:Int
}
type order{
    customerId:Int
    orderDate:Date
    totalAmount:Int
    id:Int
}
type createOrder{
    isSuccess:Boolean
    message:String
    name:String
    data:order
    errData:[product]
    errMsg:String

}
type paymentOutput{
    msg:String
    paymentAmount:Int
    orderId:Int
}
type singleItemOrderOutput{
    isSuccess:Boolean
    message:String
    name:String
    data:order
    errData:[product]
    errMsg:String
}
extend type Mutation{
    add_customer(input : addCustInput!):Customer
    verifyingUserLogin(input : userLoginInput!):userLogin
    update_customer(input : updateCustInput!):updateCustomer
    delete_customer(input : deleteCustInput!):deleteCustomer
    createNewOrder(input : createOrderInput!):createOrder
    makePayment(input : paymentInput!):paymentOutput
    singleItemOrderFromCart(input:singleItemOrderInput) : singleItemOrderOutput
}
input singleItemOrderInput{
    id:Int
}
input paymentInput{
    id:Int
}
input createOrderInput{
    customer:customerDataInput
    product:[productInput]
}
input productInput{
    productName:String
    package:String
    isDiscontinued:Boolean
    quantity:Int
}
input customerDataInput{
    firstName:String
    lastName:String
    city:String
    country:String
    primaryNumber:Int
}

input customerData{
    primaryNumber:Int!
}
input productData{
    item1:String!
    item2:String!
}
input getOrderInput{
    primaryNumber:Int!
}
input userLoginInput{
    primaryNumber:Int!
    password:String!
}
type userLogin{
    msg:String!
}
input deleteCustInput{
    id:Int
}
type deleteCustomer{
    msg:String
}
input updateCustInput{
    id:Int
    firstName:String
    lastName:String
    city: String
    country:String
    phone:Int
}
type updateCustomer{
    firstName:String
    lastName:String
    city: String
    country:String
    phone:Int
    id:Int
}



`