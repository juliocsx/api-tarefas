import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoriaTable1794853901759 implements MigrationInterface {
    name = 'CreateCategoriaTable1794853901759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorias" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar(50) NOT NULL, CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15" UNIQUE ("nome"))`);
        await queryRunner.query(`CREATE TABLE "temporary_tarefas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "titulo" varchar(100) NOT NULL, "feita" boolean NOT NULL DEFAULT (0), "criadaEm" datetime NOT NULL DEFAULT (datetime('now')), "id_categoria" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_tarefas"("id", "titulo", "feita", "criadaEm") SELECT "id", "titulo", "feita", "criadaEm" FROM "tarefas"`);
        await queryRunner.query(`DROP TABLE "tarefas"`);
        await queryRunner.query(`ALTER TABLE "temporary_tarefas" RENAME TO "tarefas"`);
        await queryRunner.query(`CREATE TABLE "temporary_tarefas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "titulo" varchar(100) NOT NULL, "feita" boolean NOT NULL DEFAULT (0), "criadaEm" datetime NOT NULL DEFAULT (datetime('now')), "id_categoria" integer, CONSTRAINT "FK_2d333d69e546e2661e57d8224b3" FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tarefas"("id", "titulo", "feita", "criadaEm", "id_categoria") SELECT "id", "titulo", "feita", "criadaEm", "id_categoria" FROM "tarefas"`);
        await queryRunner.query(`DROP TABLE "tarefas"`);
        await queryRunner.query(`ALTER TABLE "temporary_tarefas" RENAME TO "tarefas"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefas" RENAME TO "temporary_tarefas"`);
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "titulo" varchar(100) NOT NULL, "feita" boolean NOT NULL DEFAULT (0), "criadaEm" datetime NOT NULL DEFAULT (datetime('now')), "id_categoria" integer)`);
        await queryRunner.query(`INSERT INTO "tarefas"("id", "titulo", "feita", "criadaEm", "id_categoria") SELECT "id", "titulo", "feita", "criadaEm", "id_categoria" FROM "temporary_tarefas"`);
        await queryRunner.query(`DROP TABLE "temporary_tarefas"`);
        await queryRunner.query(`ALTER TABLE "tarefas" RENAME TO "temporary_tarefas"`);
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "titulo" varchar(100) NOT NULL, "feita" boolean NOT NULL DEFAULT (0), "criadaEm" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "tarefas"("id", "titulo", "feita", "criadaEm") SELECT "id", "titulo", "feita", "criadaEm" FROM "temporary_tarefas"`);
        await queryRunner.query(`DROP TABLE "temporary_tarefas"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
    }

}
