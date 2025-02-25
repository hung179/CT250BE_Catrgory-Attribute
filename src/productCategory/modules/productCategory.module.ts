import { Module } from "@nestjs/common"
import { productCategoryController } from "../controller/productCategory.controller";
import { productCategoryService } from "../service/productCategory.service";
import { MongooseModule } from "@nestjs/mongoose";
import { productCategories, productCategoriesSchema } from "../schema/productCategory.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: productCategories.name, schema: productCategoriesSchema},
        ])
    ],
    controllers: [productCategoryController],
    providers: [productCategoryService]
})

export class productCategoryModule {};