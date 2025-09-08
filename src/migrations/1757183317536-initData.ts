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
            ('Dịch vụ gia đình', 'expense', 6, true),
            ('Sửa & trang trí nhà', 'expense', 6, true),
            ('Vật nuôi', 'expense', 6, true),
            ('Giải trí', 'expense', null, true),
            ('Dịch vụ trực tuyến', 'expense', 10, true),
            ('Vui - chơi', 'expense', 10, true),
            ('Hoá đơn & Tiện ích', 'expense', null, true),
            ('Hoá đơn gas', 'expense', 13, true),
            ('Hoá đơn internet', 'expense', 13, true),
            ('Hoá đơn nước', 'expense', 13, true),
            ('Hoá đơn tiện ích khác', 'expense', 13, true),
            ('Hoá đơn TV', 'expense', 13, true),
            ('Hoá đơn điện', 'expense', 13, true),
            ('Hoá đơn điện thoại', 'expense', 13, true),
            ('Thuê nhà', 'expense', 13, true),
            ('Mua sắm', 'expense', null, true),
            ('Làm đẹp', 'expense', 22, true),
            ('Đồ dùng cá nhân', 'expense', 22, true),
            ('Đồ gia dụng', 'expense', 22, true),
            ('Quà tặng & Quyên góp', 'expense', null, true),
            ('Sức khoẻ', 'expense', null, true),
            ('Khám sức khoẻ', 'expense', 27, true),
            ('Thể dục thể thao', 'expense', 27, true),
            ('Tiền chuyển đi', 'expense', null, true),
            ('Trả lãi', 'expense', null, true),
            ('Đầu tư', 'expense', null, true)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }


}
