import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedCart1715334587509 implements MigrationInterface {
    name = 'CreatedCart1715334587509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_ecommerce"."productId" ("cartId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_b15890cf3a3da2991578400a392" PRIMARY KEY ("cartId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af17d4eb9df17f6628383f00c7" ON "app_ecommerce"."productId" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_512f22791b3059770fbc530d3a" ON "app_ecommerce"."productId" ("productId") `);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP COLUMN "producutName"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."productId" ADD CONSTRAINT "FK_af17d4eb9df17f6628383f00c7d" FOREIGN KEY ("cartId") REFERENCES "app_ecommerce"."cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."productId" ADD CONSTRAINT "FK_512f22791b3059770fbc530d3a5" FOREIGN KEY ("productId") REFERENCES "app_ecommerce"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."productId" DROP CONSTRAINT "FK_512f22791b3059770fbc530d3a5"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."productId" DROP CONSTRAINT "FK_af17d4eb9df17f6628383f00c7d"`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD "unitPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_ecommerce"."cart" ADD "producutName" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "app_ecommerce"."IDX_512f22791b3059770fbc530d3a"`);
        await queryRunner.query(`DROP INDEX "app_ecommerce"."IDX_af17d4eb9df17f6628383f00c7"`);
        await queryRunner.query(`DROP TABLE "app_ecommerce"."productId"`);
    }

}
