import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";
export type productCategoriesSchema = HydratedDocument<productCategories>;

@Schema() 
export class productCategories {

    @Prop({ required: true })
    ten_NH: string;
    
    @Prop({default: null})
    nganhHangCha_NH: string;

    @Prop({default: null})
    ma_NH: number;

    @Prop({default: null})
    dsThuocTinh_NH: string[];
    // Lưu một collection mã đã xóa, service tạo một hàm lấy mã lớn nhất hiện tại, khi tạo mới lấy mã lớn nhất hiện tại
    // Nếu có mã trong collection xóa => lấy ra
    // Nếu không có thì lấy mã lớn nhất hiện tại +1
    // Nếu mã xóa là lớn hoặc bằng hiện tại cả mã đang tồn tại và trong collection xóa, ko lưu mã vừa xóa vào collection xóa
    // Kiểm tra trong collection xóa, nếu mã bên ngoài tồn tại nhỏ hơn mã trong collection xóa thì xóa hết những mã lớn hơn mã hiện tại trong collection xóa 
}

export const productCategoriesSchema = SchemaFactory.createForClass(productCategories);