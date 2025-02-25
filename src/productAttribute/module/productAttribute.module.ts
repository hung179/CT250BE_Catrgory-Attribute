import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { productAttributes, productAttributesSchema } from "../schema/productAttributes.schema";
import { productAttributeController } from "../controller/productAttribute.controller";
import { productAttributesService } from "../service/productAttribute.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: productAttributes.name, schema: productAttributesSchema},
        ])
    ],
    controllers: [productAttributeController],
    providers: [productAttributesService],
})

export class productAttributeModule {}