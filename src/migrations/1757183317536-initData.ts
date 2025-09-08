import { MigrationInterface, QueryRunner } from "typeorm";

export class InitData1757183317536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO category (name, type, parent_id, isActive) VALUES
            ('Ăn uống', 'expense', null, true),
            ('Bảo hiểm', 'expense', null,  true),
            ('Các chi phí khác', 'expense',  null,  true),
            ('Di chuyển', 'expense', null, true),
            ('Bảo dưỡng xe', 'expense', 4, true),
            ('Gia đình', 'expense',  null, true),
            ('Dịch vụ gia đình', 'expense', 5, true),
            ('Sửa & trang trí nhà', 'expense', 5, true)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }


}
