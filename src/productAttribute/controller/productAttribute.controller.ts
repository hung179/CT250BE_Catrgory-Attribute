import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { productAttributesService } from "../service/productAttribute.service";
import { createProductAttributeDto } from "../dto/productAttributeDto";
import { ObjectId } from "mongoose";
import { TTSPDto } from "../dto/TTSP.dto";

@Controller('products/attributes')
export class productAttributeController {
    
    constructor(private readonly productAttributeService: productAttributesService){}
    @Get()
    async getProductAttribute() {
        return this.productAttributeService.findAll();
    }
    
    @Post()
    async addProductAttribute(@Body() productAttributeDto: createProductAttributeDto ) {
        return this.productAttributeService.create(productAttributeDto);
    }
    
    @Get(':id')
    async getProductAttributeById(@Param('id', ParseIntPipe) id: ObjectId) {
        return this.productAttributeService.findById(id);
    }
    
    @Put(':id')
    async updateProductAttributeById(@Body() productAttributeDto: createProductAttributeDto, @Param('id') id: ObjectId) {
        return this.productAttributeService.update(productAttributeDto, id);
    }
    
    @Delete(':id')
    async deleteProductAttributeById(@Param('id') id: ObjectId) {
        return this.productAttributeService.delete(id);
    }
    @Post('/getAttribute')
    async getProductAttributeByArrayObject(@Body() tTSPDto: TTSPDto[]) {
        return this.productAttributeService.getByArrayObject(tTSPDto);
    }
}