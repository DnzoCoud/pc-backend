import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAudit1781282342686 implements MigrationInterface {
    name = 'AddAudit1781282342686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audit_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "action" character varying(100) NOT NULL, "resource" character varying(100) NOT NULL, "metadata" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "audit_logs"`);
    }

}
