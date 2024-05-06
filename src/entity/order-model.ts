import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import 'reflect-metadata'
import { Customer } from './customer-model'

@Entity({schema:'app_ecommerce'})
export class Order{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    orderDate:Date

    @Column()
    totalAmount:number

    @ManyToOne(type=>Customer)
    @JoinColumn()
    customer:Customer

}