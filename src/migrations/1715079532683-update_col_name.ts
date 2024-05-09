import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColName1715079532683 implements MigrationInterface {
    name = 'UpdateColName1715079532683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order" ALTER COLUMN "totalAmount" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order" ALTER COLUMN "totalAmount" SET NOT NULL`);
    }

}
