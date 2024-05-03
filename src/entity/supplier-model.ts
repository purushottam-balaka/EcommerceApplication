import { PrimaryGeneratedColumn, Entity, Column,ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product-model";

@Entity({schema:'app_ecommerce'})
export class Supplier{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    CompanyName:string

    @Column()
    ContactName:string

    @Column()
    City:string

    @Column()
    Country:string

    @Column()
    Pincode:number

    @Column()
    Fax:string

    @ManyToOne(()=>Product, product=>product.supplier)
    @JoinColumn()
    product:Product
}