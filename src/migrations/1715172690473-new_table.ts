import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTable1715172690473 implements MigrationInterface {
    name = 'NewTable1715172690473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."payment" ("id" SERIAL NOT NULL, "paymentType" character varying NOT NULL, "isPaymentActive" boolean NOT NULL, "paymentAmount" integer NOT NULL, "paymentDate" TIMESTAMP NOT NULL, "customerId" integer, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."product" ADD "availableQuantitiy" integer`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order" ADD "isActive" boolean`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."payment" ADD CONSTRAINT "FK_967ae37468fd0c08ea0fec41720" FOREIGN KEY ("customerId") REFERENCES "app_ecommerce"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."payment" DROP CONSTRAINT "FK_967ae37468fd0c08ea0fec41720"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."product" DROP COLUMN "availableQuantitiy"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."payment"`);
    }

}
