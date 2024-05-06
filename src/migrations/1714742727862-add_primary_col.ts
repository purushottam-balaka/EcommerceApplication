import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrimaryCol1714742727862 implements MigrationInterface {
    name = 'AddPrimaryCol1714742727862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" ADD "primaryNumber" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."customer" DROP COLUMN "primaryNumber"`);
    }

}
