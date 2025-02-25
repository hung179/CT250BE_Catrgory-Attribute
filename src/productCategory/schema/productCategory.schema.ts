import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";
export type productCategoriesSchema = HydratedDocument<productCategories>;

@Schema() 
export class productCategories {

    @Prop({ required: true })
    tenNH: string;
    
    @Prop({default: null})
    idChaNH: ObjectId;

    @Prop({default: null})
    maNH: number;
}

export const productCategoriesSchema = SchemaFactory.createForClass(productCategories);