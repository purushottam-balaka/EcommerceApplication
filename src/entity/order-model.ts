import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import 'reflect-metadata'
import { Customer } from './customer-model'

@Entity({schema:'app_ecommerce'})
export class Order{
    @PrimaryGeneratedColumn()
    id:Number

    @Column()
    OrderDate:Date

    @Column()
    TotalAmount:Number

    @ManyToOne(type=>Customer)
    @JoinColumn()
    Customer:Customer

}