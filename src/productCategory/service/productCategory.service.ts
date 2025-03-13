import { Injectable } from '@nestjs/common';
import {
  productCategories,
  productCategoriesSchema,
} from '../schema/productCategory.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { createProductCategoryDto } from '../dto/productCategoryDto';

@Injectable()
export class productCategoryService {
  constructor(
    @InjectModel(productCategories.name)
    private readonly productCategoriesModel: Model<productCategoriesSchema>,
  ) {}

  async create(productCategory: createProductCategoryDto) {
    try {
      const newProductCategory = new this.productCategoriesModel(
        productCategory,
      );
      newProductCategory.save();
      return { success: true, data: newProductCategory };
    } catch (error) {
      return { success: false, error: error };
    }
  }
  async findAll() {
    try {
      const categories = await this.productCategoriesModel.find().exec();

      // Chuyển danh sách thành object để truy xuất nhanh
      const categoryMap = categories.reduce((acc, category) => {
        acc[category._id.toString()] = { ...category.toObject(), children: [] };
        return acc;
      }, {});

      // Tạo danh sách với cấu trúc cây
      const result = categories
        .map((category) => {
          if (category.nganhHangCha_NH) {
            // Thêm vào children của danh mục cha
            categoryMap[category.nganhHangCha_NH]?.children.push(
              categoryMap[category._id.toString()],
            );
            return null; // Bỏ category con khỏi danh sách chính
          }
          return categoryMap[category._id.toString()]; // Chỉ giữ category cha
        })
        .filter(Boolean); // Loại bỏ giá trị `null`
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async findById(id: string) {
    try {
      const result = await this.productCategoriesModel
        .findById({ _id: new Types.ObjectId(id) })
        .exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async update(productCategory: createProductCategoryDto, id: string) {
    try {
      const result = await this.productCategoriesModel
        .findByIdAndUpdate(
          { _id: new Types.ObjectId(id) },
          { $set: productCategory },
        )
        .exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async delete(id: string) {
    try {
      const result = this.productCategoriesModel
        .findByIdAndDelete({ _id: new Types.ObjectId(id) })
        .exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }
}
