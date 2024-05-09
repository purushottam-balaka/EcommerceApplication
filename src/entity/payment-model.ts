import {PrimaryGeneratedColumn, Column, Entity,JoinColumn,ManyToOne,OneToOne} from 'typeorm'
import { Customer } from './customer-model'
import { Order } from './order-model'

@Entity({schema:'app_ecommerce'})
export class Payment{
    @PrimaryGeneratedColumn()
    id:Number

    @Column()
    paymentType:String

    @Column()
    isPaymentActive:Boolean

    @Column()
    paymentAmount:Number

    @Column()
    paymentDate:Date

    @OneToOne(type=>Order)
    @JoinColumn({name:'orderId'})
    orderId:Order


    @ManyToOne(type =>Customer)
    @JoinColumn({name:'customerId'})
    customerId:Customer
}