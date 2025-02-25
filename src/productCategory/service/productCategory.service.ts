import { Injectable } from "@nestjs/common";
import { productCategories, productCategoriesSchema } from "../schema/productCategory.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { createProductCategoryDto } from "../dto/productCategoryDto";

@Injectable()
export class productCategoryService {

    constructor(
        @InjectModel(productCategories.name)
        private readonly productCategoriesModel: Model<productCategoriesSchema>,
    ) {}

    async create(productCategory: createProductCategoryDto): Promise<productCategories> {
        const newProductCategory = new this.productCategoriesModel(productCategory);
        return newProductCategory.save(); 
    }
    async findAll() {
        const result = this.productCategoriesModel.find().exec();
        if(!result){
            throw new Error('Product Category not found');
        }
        return result;
    }

    async findById(id: ObjectId) {
        const result = await this.productCategoriesModel.findOne({_id: id}).exec();
        if(!result){
            throw new Error('Product Category not found');
        }
        return result;
    }

    async update(productCategory: createProductCategoryDto, id: ObjectId) {
        const result = await this.productCategoriesModel.updateOne({_id: id}, { $set: productCategory} ).exec();
        if(result.modifiedCount === 0){
            throw new Error('Product Category not found');
        }
        return "Update product category successfully";
    }
    
    async delete(id: ObjectId) {
        const result = this.productCategoriesModel.findOneAndDelete({_id: id}).exec();
        if(!result){
            throw new Error('Product Category not found');
        }
        return "Delete product category successfully";
    }
    async findParent(id: ObjectId) {
        const result = await this.findById(id);
        if(!result){
            throw new Error('Product Category not found');
        }
        const parent = await this.productCategoriesModel.findOne({ _id: result.idChaNH }).exec();
        if (!parent) {
            return null;
        }
        return parent;
    }

}