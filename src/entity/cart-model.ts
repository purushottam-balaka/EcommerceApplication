import {PrimaryGeneratedColumn, Entity, Column, JoinColumn, ManyToOne } from 'typeorm'
import { Customer } from './customer-model'
import { Product } from './product-model'

@Entity({schema:'app_ecommerce'})
export class Cart{
    @PrimaryGeneratedColumn()
    id:Number

    @Column()
    quantity:Number

    @ManyToOne(()=>Customer)
    @JoinColumn({name:'customerId'})
    customerId:Customer

    @ManyToOne(()=>Product)
    @JoinColumn({name:'productId'})
    productId:Product

   
}