import { PrimaryGeneratedColumn, Entity, Column,ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product-model";

@Entity({schema:'app_ecommerce'})
export class Supplier{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    companyName:string

    @Column()
    contactName:string

    @Column()
    city:string

    @Column()
    country:string

    @Column()
    pincode:number

    @Column()
    fax:string

    @ManyToOne(()=>Product, product=>product.supplier)
    @JoinColumn()
    product:Product
}