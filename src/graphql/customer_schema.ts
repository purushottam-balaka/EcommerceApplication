import { gql } from "postgraphile";

export const Customer_schema=gql`
extend type Query{
    customerGet:[getCustomerDetails]
}
type getCustomerDetails{
    FirstName:String
    LastName:String
    City:String
    Country:String
    Phone:String
}
input addCustInput{
    FirstName:String
    LastName:String
    City: String
    Country:String
    Phone:String
}
extend type Mutation{
    add_customer(input : addCustInput):add_new_customer
    update_customer(input:updateCustInput):updateCustomer
    delete_customer(input : deleteCustInput):deleteCustomer
}
input deleteCustInput{
    id:String
}
type deleteCustomer{
    msg:String
}

input updateCustInput{
    id:String
    FirstName:String
    LastName:String
    City: String
    Country:String
    Phone:String
}
type updateCustomer{
    FirstName:String
    LastName:String
    City: String
    Country:String
    Phone:String
    id:String
}

type add_new_customer{
    id:String
    FirstName:String
    LastName:String
    City: String
    Country:String
    Phone:String
}
`