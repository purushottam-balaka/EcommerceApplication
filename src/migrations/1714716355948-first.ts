import { MigrationInterface, QueryRunner } from "typeorm";

export class First1714716355948 implements MigrationInterface {
    name = 'First1714716355948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "app_ecommerce"`)
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."supplier" ("id" SERIAL NOT NULL, "CompanyName" character varying NOT NULL, "ContactName" character varying NOT NULL, "City" character varying NOT NULL, "Country" character varying NOT NULL, "Pincode" integer NOT NULL, "Fax" character varying NOT NULL, "productId" integer, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."product" ("id" SERIAL NOT NULL, "ProductNmae" character varying NOT NULL, "UnitPrice" integer NOT NULL, "Package" character varying NOT NULL, "IsDiscontinued" boolean NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."customer" ("id" SERIAL NOT NULL, "FirstName" character varying NOT NULL, "LastName" character varying NOT NULL, "City" character varying NOT NULL, "Country" character varying NOT NULL, "Phone" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."order" ("id" SERIAL NOT NULL, "OrderDate" TIMESTAMP NOT NULL, "TotalAmount" integer NOT NULL, "customerId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."order_item" ("id" SERIAL NOT NULL, "UnitPrice" integer NOT NULL, "Quantity" integer NOT NULL, "orderId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."supplier" ADD CONSTRAINT "FK_dedf1f79ac20765ee600127ee93" FOREIGN KEY ("productId") REFERENCES "app_ecommerce"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "app_ecommerce"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "app_ecommerce"."order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."supplier" DROP CONSTRAINT "FK_dedf1f79ac20765ee600127ee93"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."order_item"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."order"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."customer"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."product"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."supplier"`);
    }

}
