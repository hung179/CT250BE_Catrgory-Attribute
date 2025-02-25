import { Body, Controller, Delete, Get, Post, Put, Param, ParseIntPipe } from "@nestjs/common";
import { productCategoryService } from "../service/productCategory.service";
import { createProductCategoryDto } from "../dto/productCategoryDto";
import { ObjectId } from "mongoose";

@Controller('products/categories')
export class productCategoryController {
    
    constructor(private readonly productCategoryService: productCategoryService){}
    @Get()
    async getProductCategory() {
        return this.productCategoryService.findAll();
    }
    
    @Post()
    async addProductCategory(@Body() createProductCategoryDto: createProductCategoryDto ) {
        return this.productCategoryService.create(createProductCategoryDto);
    }
    
    @Get(':id')
    async getProductCategoryById(@Param('id') id: ObjectId) {
        return this.productCategoryService.findById(id);
    }
    
    @Put(':id')
    async updateProductCategoryById(@Body() createProductCategoryDto: createProductCategoryDto, @Param('id') id: ObjectId) {
        return this.productCategoryService.update(createProductCategoryDto, id);
    }
    
    @Delete(':id')
    async deleteProductCategoryById(@Param('id') id: ObjectId) {
        return this.productCategoryService.delete(id);
    }
    @Get('/parentCategory/:id')
    async findParentCategory(@Param('id') id: ObjectId) {
        return this.productCategoryService.findParent(id);
    }
}