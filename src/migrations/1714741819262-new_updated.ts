import { MigrationInterface, QueryRunner } from "typeorm";

export class NewUpdated1714741819262 implements MigrationInterface {
    name = 'NewUpdated1714741819262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "app_ecommerce"`)
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."customer" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying, "city" character varying, "password" character varying NOT NULL, "country" character varying, "phone" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."product" ("id" SERIAL NOT NULL, "productNmae" character varying NOT NULL, "unitPrice" integer NOT NULL, "package" character varying NOT NULL, "isDiscontinued" boolean NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."supplier" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "contactName" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "pincode" integer NOT NULL, "fax" character varying NOT NULL, "productId" integer, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."order" ("id" SERIAL NOT NULL, "orderDate" TIMESTAMP NOT NULL, "totalAmount" integer NOT NULL, "customerId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."order_item" ("id" SERIAL NOT NULL, "unitPrice" integer NOT NULL, "quantity" integer NOT NULL, "orderId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "app_ecommerce"."supplier"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."product"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."customer"`);
    }

}
