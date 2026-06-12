import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlacklistTokens1781280986478 implements MigrationInterface {
    name = 'AddBlacklistTokens1781280986478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token_blacklist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jti" character varying(100) NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3e37528d03f0bd5335874afa48d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_TOKEN_BLACKLIST_JTI" ON "token_blacklist"  ("jti") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_TOKEN_BLACKLIST_JTI"`);
        await queryRunner.query(`DROP TABLE "token_blacklist"`);
    }

}
