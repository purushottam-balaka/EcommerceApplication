import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCustomer1715154847051 implements MigrationInterface {
    name = 'UpdatedCustomer1715154847051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" DROP CONSTRAINT "UQ_03846b4bae9df80f19c76005a82"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ADD "phone" integer`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ADD CONSTRAINT "UQ_03846b4bae9df80f19c76005a82" UNIQUE ("phone")`);
    }

}
