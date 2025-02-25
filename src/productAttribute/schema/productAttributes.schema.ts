import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";
export type ProductAttributesSchema = HydratedDocument<productAttributes>;

@Schema() 
export class productAttributes {
    @Prop({ required: true })
    tenTT: string;
    
    @Prop({ default:null})
    nganhHangTT: ObjectId;

    @Prop({ default: 'string'})
    kieuGiaTriTT: string;
    
    @Prop({default: false})
    batBuocTT: boolean;
}

export const productAttributesSchema = SchemaFactory.createForClass(productAttributes);