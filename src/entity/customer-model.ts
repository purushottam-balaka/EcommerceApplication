import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm'

@Entity({schema:'app_ecommerce'})
export class Customer{
    @PrimaryGeneratedColumn()
    id:Number

    @Column()
    FirstName:String

    @Column()
    LastName:String

    @Column()
    City:String

    @Column()
    Country:String

    @Column()
    Phone:String

}