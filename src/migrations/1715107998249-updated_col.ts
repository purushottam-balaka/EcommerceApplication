import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCol1715107998249 implements MigrationInterface {
    name = 'UpdatedCol1715107998249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" DROP CONSTRAINT "UQ_03846b4bae9df80f19c76005a82"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ADD "phone" integer`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ADD CONSTRAINT "UQ_03846b4bae9df80f19c76005a82" UNIQUE ("phone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" DROP CONSTRAINT "UQ_03846b4bae9df80f19c76005a82"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ADD CONSTRAINT "UQ_03846b4bae9df80f19c76005a82" UNIQUE ("phone")`);
    }

}
