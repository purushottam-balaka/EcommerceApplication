import { postgraphile } from 'postgraphile'
import { customer_plugin } from './plugins/customer-plugin'

export const pstgpl=postgraphile(
    "postgresql://postgres:ASDF12345@a@localhost:5432/eCommerceDb",
    "app_ecommerce",
    {
        "dynamicJson": true,
        "watchPg": true,
        "graphiql": true,
        "enhanceGraphiql": true,
        "appendPlugins":[customer_plugin],
        "graphiqlRoute":"/api",
        "exportGqlSchemaPath":'./src/generated/schema.gql'
        }
        
)