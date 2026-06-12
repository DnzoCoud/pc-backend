import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserGenerate1781243535402 implements MigrationInterface {
    name = 'UpdateUserGenerate1781243535402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
    }

}
