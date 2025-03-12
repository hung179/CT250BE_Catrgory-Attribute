import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { productAttributesService } from "../service/productAttribute.service";
import { createProductAttributeDto } from "../dto/productAttributeDto";
import { ObjectId } from "mongoose";
import { TTSPDto } from "../dto/TTSP.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('products/attributes')
export class productAttributeController {
    
    constructor(private readonly productAttributeService: productAttributesService){}
    // @Get()
    // async getProductAttribute() {
    //     return this.productAttributeService.findAll();
    // }
    
    // @Post()
    // async addProductAttribute(@Body() productAttributeDto: createProductAttributeDto ) {
    //     return this.productAttributeService.create(productAttributeDto);
    // }
    
    // @Get(':id')
    // async getProductAttributeById(@Param('id', ParseIntPipe) id: ObjectId) {
    //     return this.productAttributeService.findById(id);
    // }
    
    // @Put(':id')
    // async updateProductAttributeById(@Body() productAttributeDto: createProductAttributeDto, @Param('id') id: ObjectId) {
    //     return this.productAttributeService.update(productAttributeDto, id);
    // }
    
    // @Delete(':id')
    // async deleteProductAttributeById(@Param('id') id: ObjectId) {
    //     return this.productAttributeService.delete(id);
    // }
    // @Post('/getAttribute')
    // async getProductAttributeByArrayObject(@Body() tTSPDto: TTSPDto[]) {
    //     return this.productAttributeService.getByArrayObject(tTSPDto);
    // }
    // Thêm getAll của một ngành hàng
    @MessagePattern('attribute_get_all')
    async getAllAttribute(@Payload() data: any){
        return this.productAttributeService.findAll();
    }
    @MessagePattern('attribute_get_by_id')
    async getAttributeById(@Payload() id : string){
        return this.productAttributeService.findById(id);
    }
    @MessagePattern('attribute_create')
    async createAttribute(@Payload() productAttributeDto : createProductAttributeDto){
        return this.productAttributeService.create(productAttributeDto);
    }

    @MessagePattern('attribute_update')
    async updateAttribute(@Payload() productAttribute: any){
        return this.productAttributeService.update(productAttribute.attributeDto, productAttribute.id);
    }
    @MessagePattern('attribute_delete')
    async deleteAttribute(@Payload() id : string){
        return this.productAttributeService.delete(id);
    }
    // Lấy thuộc tính từ một mảng gồm id thuộc tính và các giá trị truyền vào
    @MessagePattern('attribute_get_by_array')
    async getByArrayObject(@Payload() tTSPDto : TTSPDto[]){
        return this.productAttributeService.getByArrayObject(tTSPDto);
    }

}