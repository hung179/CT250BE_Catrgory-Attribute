import { Injectable } from '@nestjs/common';
import {
  productCategories,
  productCategoriesSchema,
} from '../schema/productCategory.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { createProductCategoryDto } from '../dto/productCategoryDto';

@Injectable()
export class productCategoryService {
  constructor(
    @InjectModel(productCategories.name)
    private readonly productCategoriesModel: Model<productCategoriesSchema>,
  ) {}

  async create(
    productCategory: createProductCategoryDto,
  ): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      const newProductCategory = new this.productCategoriesModel(
        productCategory,
      );
      await newProductCategory.save();
      return { success: true, data: newProductCategory };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }
  async findAll(): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      const categories = await this.productCategoriesModel.find().exec();
      return { success: true, data: categories };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async findById(
    id: string,
  ): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      const result = await this.productCategoriesModel
        .findById({ _id: new Types.ObjectId(id) })
        .exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async update(
    productCategory: createProductCategoryDto,
    id: string,
  ): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      console.log(productCategory);
      const result = await this.productCategoriesModel
        .findByIdAndUpdate(
          { _id: id },
          { $set: productCategory },
          { new: true },
        )
        .exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async delete(
    id: string,
  ): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      const result = await this.productCategoriesModel
        .findByIdAndDelete({ _id: new Types.ObjectId(id) })
        .exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }
}
