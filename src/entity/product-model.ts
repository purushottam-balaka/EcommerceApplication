import { PrimaryGeneratedColumn, Column, Entity, OneToMany,JoinColumn} from "typeorm";
import { Supplier } from "./supplier-model";

@Entity({schema:'app_ecommerce'})
export class  Product{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    productName:string

    @Column()
    unitPrice:number

    @Column()
    package:string

    @Column()
    isDiscontinued:boolean

    @Column({nullable:true})
    availableQuantitiy:number

    @OneToMany(()=>Supplier, supplier=>supplier.productId)
    @JoinColumn({name:'supplierId'})
    supplierId:Supplier[]
}