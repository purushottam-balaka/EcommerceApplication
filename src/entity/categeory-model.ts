import {PrimaryGeneratedColumn, Entity, Column, OneToMany, JoinColumn} from 'typeorm'
import 'reflect-metadata'
import { Product } from './product-model'

@Entity({schema:'app_ecommerce'})
export class Categeory{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({nullable:true})
    description:string

    @Column({nullable:true})
    imageURL:string

    @OneToMany(()=> Product, product=>product.categeoryId )
    @JoinColumn({name:'productId'})
    productId:Product[]
}