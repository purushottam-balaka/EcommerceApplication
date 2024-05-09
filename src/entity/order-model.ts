import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import 'reflect-metadata'
import { Customer } from './customer-model'

@Entity({schema:'app_ecommerce'})
export class Order{
    @PrimaryGeneratedColumn()
    id:Number

    @Column({nullable:true})
    orderDate:Date

    @Column({nullable:true, default:0})
    totalAmount:number
    
    @Column({nullable:true})
    isActive:boolean

    @ManyToOne(type=>Customer)
    @JoinColumn({name:'customerId'})
    customerId:Customer

}