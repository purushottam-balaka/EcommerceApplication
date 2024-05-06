import { gql } from "postgraphile";

export const Customer_schema=gql`
extend type Query{
    customerGet(input : customerInput!):[Customer!] 
}
input customerInput{
    id:Int
}
type getCustomerDetails{
    firstName:String
    lastName:String
    city:String
    country:String
    phone:Int
}
input addCustInput{
    firstName:String!
    lastName:String!
    city: String!
    country:String!
    phone:Int!
    password:String!
    primaryNumber:Int!
}
extend type Mutation{
    add_customer(input : addCustInput!):Customer
    verifyingUserLogin(input : userLoginInput!):userLogin
    update_customer(input:updateCustInput!):updateCustomer
    delete_customer(input : deleteCustInput!):deleteCustomer
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