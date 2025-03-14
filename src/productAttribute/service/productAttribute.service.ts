import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  productAttributes,
  ProductAttributesSchema,
} from '../schema/productAttributes.schema';
import { createProductAttributeDto } from '../dto/productAttributeDto';
import { Model, Types } from 'mongoose';

@Injectable()
export class productAttributesService {
  constructor(
    @InjectModel(productAttributes.name)
    private readonly productAttributesModel: Model<ProductAttributesSchema>,
  ) {}
  async create(productAttribute: createProductAttributeDto) {
    try {
      const newProductAttribute = new this.productAttributesModel(
        productAttribute,
      );
      await newProductAttribute.save();
      return { success: true, data: newProductAttribute };
    } catch (error) {
      return { success: false, error: error };
    }
  }
  async findAll() {
    try {
      const result = await this.productAttributesModel.find().exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async findById(id: string) {
    try {
      const result = await this.productAttributesModel
        .findOne({ _id: new Types.ObjectId(id) })
        .exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async update(productAttribute: createProductAttributeDto, id: string) {
    try {
      const result = await this.productAttributesModel
        .updateOne({ _id: new Types.ObjectId(id) }, { $set: productAttribute })
        .exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async delete(id: string) {
    try {
      const result = await this.productAttributesModel
        .findOneAndDelete({ _id: new Types.ObjectId(id) })
        .exec();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error };
    }
  }
}
