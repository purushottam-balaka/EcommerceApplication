import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1714996199871 implements MigrationInterface {
    name = 'UpdateTables1714996199871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order_item" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "app_ecommerce"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."order_item" DROP COLUMN "productId"`);
    }

}
