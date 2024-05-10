import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCartReferences1715338046460 implements MigrationInterface {
    name = 'UpdatedCartReferences1715338046460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."cart" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "customerId" integer, "productId" integer, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD CONSTRAINT "FK_eac3d1f269ffeb0999fbde0185b" FOREIGN KEY ("customerId") REFERENCES "app_ecommerce"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES "app_ecommerce"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP CONSTRAINT "FK_eac3d1f269ffeb0999fbde0185b"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."cart"`);
    }

}
