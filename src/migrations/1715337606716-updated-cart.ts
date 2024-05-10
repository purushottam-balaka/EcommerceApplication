import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCart1715337606716 implements MigrationInterface {
    name = 'UpdatedCart1715337606716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD "name" character varying NOT NULL`);
    }

}
