import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerModified1714742857317 implements MigrationInterface {
    name = 'CustomerModified1714742857317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ALTER COLUMN "primaryNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ADD CONSTRAINT "UQ_22d40773911bcae9cd573d72696" UNIQUE ("primaryNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" DROP CONSTRAINT "UQ_22d40773911bcae9cd573d72696"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ALTER COLUMN "primaryNumber" DROP NOT NULL`);
    }

}
