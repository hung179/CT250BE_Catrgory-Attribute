import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
export type ProductAttributesSchema = HydratedDocument<productAttributes>;

@Schema()
export class productAttributes {
  @Prop({ required: true })
  ten_TT: string;

  @Prop({ default: 'string' })
  kieuDuLieu_TT: string;
}

export const productAttributesSchema =
  SchemaFactory.createForClass(productAttributes);
