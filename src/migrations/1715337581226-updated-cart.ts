import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCart1715337581226 implements MigrationInterface {
    name = 'UpdatedCart1715337581226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."cart" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "name" character varying NOT NULL, "customerIdId" integer, "productIdId" integer, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD CONSTRAINT "FK_7e37de2e91f587b5dc32c3124f4" FOREIGN KEY ("customerIdId") REFERENCES "app_ecommerce"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD CONSTRAINT "FK_5d4f13569ba576e80eb6f71dddb" FOREIGN KEY ("productIdId") REFERENCES "app_ecommerce"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP CONSTRAINT "FK_5d4f13569ba576e80eb6f71dddb"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP CONSTRAINT "FK_7e37de2e91f587b5dc32c3124f4"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."cart"`);
    }

}
