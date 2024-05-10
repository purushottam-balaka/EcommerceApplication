import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCart1715337196623 implements MigrationInterface {
    name = 'UpdatedCart1715337196623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD "customerIdId" integer`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD "productIdId" integer`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD CONSTRAINT "FK_7e37de2e91f587b5dc32c3124f4" FOREIGN KEY ("customerIdId") REFERENCES "app_ecommerce"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD CONSTRAINT "FK_5d4f13569ba576e80eb6f71dddb" FOREIGN KEY ("productIdId") REFERENCES "app_ecommerce"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP CONSTRAINT "FK_5d4f13569ba576e80eb6f71dddb"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP CONSTRAINT "FK_7e37de2e91f587b5dc32c3124f4"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP COLUMN "productIdId"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP COLUMN "customerIdId"`);
    }

}
