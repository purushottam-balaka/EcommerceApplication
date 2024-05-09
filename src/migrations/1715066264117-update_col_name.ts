import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColName1715066264117 implements MigrationInterface {
    name = 'UpdateColName1715066264117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."product" RENAME COLUMN "productNmae" TO "productName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."product" RENAME COLUMN "productName" TO "productNmae"`);
    }

}
