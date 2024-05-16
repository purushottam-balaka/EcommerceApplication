import { gql } from "postgraphile";
export const Customer_schema=gql`
extend type Query{
    getCustomers(input : getCustomersInput!):[Customer] 
    getOrderDetails(input : getOrderInput!):getOrderOutput
}
input getCustomersInput{
    primaryNumber:Int
}
type getOrderOutput{
    orders:[orderDetails]
    msg:String
}
type orderDetails{
    id:Int
    orderDate:Date
    totalAmount:Int
    isActive:Boolean
    status:String
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
    orderDate:Date
    totalAmount:Int
    id:Int
}
type createOrderOutput{
    isSuccess:Boolean
    message:String
    name:String
    data:[product]
    errData:[product]
    errMsg:String
    customerId:Int
    ordInfo:order
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
    data:[product]
    errData:[product]
    errMsg:String
    customerId:Int
    ordInfo:order
}
type allItemsOrderOutput{
    isSuccess:Boolean
    message:String
    name:String
    data:[product]
    errData:[product]
    errMsg:String
    customerId:Int
    ordInfo:order
}

extend type Mutation{
    addCustomer(input : addCustInput!):Customer
    loginCustomer(input : customerLoginInput!):userLoginOutput
    update_customer(input : updateCustInput!):updateCustomerOutput
    delete_customer(input : deleteCustInput!):deleteCustomerOutput
    createNewOrder(input : createOrderInput!):createOrderOutput
    makePayment(input : paymentInput!):paymentOutput
    singleItemOrderFromCart(input:singleItemOrderInput) : singleItemOrderOutput
    allItemsOrderFromCart(input:allItemsOrderInput) : allItemsOrderOutput
}
input allItemsOrderInput{
    customerId:Int
}
input singleItemOrderInput{
    cartItemId:Int
}
input paymentInput{
    paymentId:Int
    token:String
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
input customerLoginInput{
    primaryNumber:Int!
    password:String!
}
type userLoginOutput{
    token:String
    msg:String
}
input deleteCustInput{
    primaryNumber:Int
}
type deleteCustomerOutput{
    msg:String
}
input updateCustInput{
    firstName:String
    lastName:String
    city: String
    country:String
    primaryNumber:Int
}
type updateCustomerOutput{
    firstName:String
    lastName:String
    city: String
    country:String
    primaryNumber:Int
    msg:String
}


`