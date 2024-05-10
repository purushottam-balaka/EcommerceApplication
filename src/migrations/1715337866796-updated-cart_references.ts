import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCartReferences1715337866796 implements MigrationInterface {
    name = 'UpdatedCartReferences1715337866796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD "name" character varying NOT NULL`);
    }

}
