import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm'

@Entity({schema:'app_ecommerce'})
export class Customer{
    @PrimaryGeneratedColumn()
    id:Number

    @Column()
    firstName:String

    @Column({nullable:true})
    lastName:String

    @Column({nullable:true})
    city:String

    @Column()
    password:string

    @Column({nullable:true})
    country:String

    @Column({unique:true})
    primaryNumber:Number

}