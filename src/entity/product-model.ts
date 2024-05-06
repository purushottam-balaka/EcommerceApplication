import { PrimaryGeneratedColumn, Column, Entity, OneToMany,JoinColumn} from "typeorm";
import { Supplier } from "./supplier-model";

@Entity({schema:'app_ecommerce'})
export class  Product{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    productNmae:string

    @Column()
    unitPrice:number

    @Column()
    package:string

    @Column()
    isDiscontinued:boolean

    @OneToMany(()=>Supplier, supplier=>supplier.product)
    @JoinColumn()
    supplier:Supplier[]
}