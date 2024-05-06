import {PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import { Order } from './order-model'
import { Product } from './product-model'

@Entity({schema:'app_ecommerce'})
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    unitPrice:number

    @Column()
    quantity:number

    @ManyToOne( type => Order)
    @JoinColumn()
    order:Order

    @OneToMany(type =>Product, product=>product.supplier)
    @JoinColumn()
    product:Product   
}



