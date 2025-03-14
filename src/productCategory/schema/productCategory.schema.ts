import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type productCategoriesSchema = HydratedDocument<productCategories>;

@Schema()
export class productCategories {
  @Prop({ required: true })
  ten_NH: string;

  @Prop({ default: null })
  idCha_NH: string;

  @Prop({ default: null })
  cap_NH: number;

  @Prop({ default: null })
  dsThuocTinh_NH: string[];
}

export const productCategoriesSchema =
  SchemaFactory.createForClass(productCategories);
