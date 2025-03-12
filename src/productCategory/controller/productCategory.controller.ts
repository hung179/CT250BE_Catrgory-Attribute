import { Body, Controller, Delete, Get, Post, Put, Param, ParseIntPipe } from "@nestjs/common";
import { productCategoryService } from "../service/productCategory.service";
import { createProductCategoryDto } from "../dto/productCategoryDto";
import { ObjectId } from "mongoose";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('products/categories')
export class productCategoryController {
    
    constructor(private readonly productCategoryService: productCategoryService){}
    @MessagePattern('get_product_categories')
    async getProductCategory(@Payload() data: any) {
        return this.productCategoryService.findAll();
    }
    
    @MessagePattern('add_product_category')
    async addProductCategory(@Payload() productCategory: createProductCategoryDto) {
        return this.productCategoryService.create(productCategory);
    }
    
    @MessagePattern('get_product_category_by_id')
    async getProductCategoryById(@Payload() id: string) {
        return this.productCategoryService.findById(id);
    }
    
    @MessagePattern('update_product_category')
    async updateProductCategory(@Payload() data: any) {
        return this.productCategoryService.update(data.category, data.id);
    }
    
    @MessagePattern('delete_product_category')
    async deleteProductCategory(@Payload() id: string) {
        return this.productCategoryService.delete(id);
    }
}