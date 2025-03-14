import { Controller } from '@nestjs/common';
import { productAttributesService } from '../service/productAttribute.service';
import { createProductAttributeDto } from '../dto/productAttributeDto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class productAttributeController {
  constructor(
    private readonly productAttributeService: productAttributesService,
  ) {}

  @MessagePattern('attribute_get_all')
  async getAllAttribute() {
    return this.productAttributeService.findAll();
  }
  @MessagePattern('attribute_get_by_id')
  async getAttributeById(@Payload() id: string) {
    return this.productAttributeService.findById(id);
  }
  @MessagePattern('attribute_create')
  async createAttribute(
    @Payload() productAttributeDto: createProductAttributeDto,
  ) {
    return this.productAttributeService.create(productAttributeDto);
  }

  @MessagePattern('attribute_update')
  async updateAttribute(@Payload() productAttribute: any) {
    return this.productAttributeService.update(
      productAttribute.attributeDto,
      productAttribute.id,
    );
  }
  @MessagePattern('attribute_delete')
  async deleteAttribute(@Payload() id: string) {
    return this.productAttributeService.delete(id);
  }
}
