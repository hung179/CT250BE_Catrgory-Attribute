import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { productAttributes, ProductAttributesSchema } from "../schema/productAttributes.schema";
import { createProductAttributeDto } from "../dto/productAttributeDto";
import { Model, ObjectId } from "mongoose";
import {  TTSPDto } from "../dto/TTSP.dto";


@Injectable() 
export class productAttributesService {
    constructor(
        @InjectModel(productAttributes.name)
        private readonly productAttributesModel: Model<ProductAttributesSchema>
    ){}
        async create(productAttribute: createProductAttributeDto): Promise<productAttributes> {
            const newProductAttribute = new this.productAttributesModel(productAttribute);
            return newProductAttribute.save(); 
        }
        async findAll(): Promise<productAttributes[] >{
            const result = this.productAttributesModel.find().exec();
            if(!result){
                throw new Error('Attribute not found');
            }
            return result;
        }
    
        async findById(id: ObjectId) {
            const result = await this.productAttributesModel.findOne({ _id: id }).exec();
            if(!result){
                throw new Error('Attribute not found');
            }
            return result;
        }
    
        async update(productAttribute: createProductAttributeDto, id: ObjectId) {

            const result = await this.productAttributesModel.updateOne({_id: id}, { $set: productAttribute} ).exec();
            if(result.modifiedCount === 0){
                throw new Error('Attribute not found');
            }
            return "Update attribute successfully";
        }
        
        async delete(id: ObjectId) {
            const result = this.productAttributesModel.findOneAndDelete({_id: id}).exec();
            if(!result){
                throw new Error('Attribute not found');
            }
            return "Delete attribute successfully";
        }

        async getByArrayObject(tTSPDto: TTSPDto[]){
            return Promise.all(
                tTSPDto.map(async (ttsp) => {
                    const data = await this.findById(ttsp.thuocTinh_CTSP); 
                    const {tenTT, nganhHangTT, kieuGiaTriTT, batBuocTT } = data;
                    return { ...ttsp, tenTT, nganhHangTT, kieuGiaTriTT, batBuocTT }; 
                })
            );
        }
}