import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColName1715080065051 implements MigrationInterface {
    name = 'UpdateColName1715080065051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order" ALTER COLUMN "orderDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order" ALTER COLUMN "orderDate" SET NOT NULL`);
    }

}
