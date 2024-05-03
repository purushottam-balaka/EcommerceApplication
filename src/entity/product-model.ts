import { PrimaryGeneratedColumn, Column, Entity, OneToMany,JoinColumn} from "typeorm";
import { Supplier } from "./supplier-model";

@Entity({schema:'app_ecommerce'})
export class  Product{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    ProductNmae:string

    @Column()
    UnitPrice:number

    @Column()
    Package:string

    @Column()
    IsDiscontinued:boolean

    @OneToMany(()=>Supplier, supplier=>supplier.product)
    @JoinColumn()
    supplier:Supplier[]
}