import { makeExtendSchemaPlugin } from "postgraphile";
import { customerResolver } from "../graphql/customer-resolver";
import { Customer_schema } from "../graphql/customer_schema";

export const customer_plugin=makeExtendSchemaPlugin((build):any=>{
    return{
         typeDefs:Customer_schema,
         resolvers:customerResolver
        }
})