import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTableUpdated1715173128529 implements MigrationInterface {
    name = 'NewTableUpdated1715173128529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."payment" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."payment" ADD CONSTRAINT "UQ_d09d285fe1645cd2f0db811e293" UNIQUE ("orderId")`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."payment" ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "app_ecommerce"."order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."payment" DROP CONSTRAINT "UQ_d09d285fe1645cd2f0db811e293"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."payment" DROP COLUMN "orderId"`);
    }

}
