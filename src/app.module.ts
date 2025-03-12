import { Module } from '@nestjs/common';
import { productCategoryModule } from './productCategory/modules/productCategory.module';
import { MongooseModule } from '@nestjs/mongoose';
import { productAttributeModule } from './productAttribute/module/productAttribute.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    productAttributeModule,
    productCategoryModule,
    RedisModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
  
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_URI'),
        }),
      }),
    ]
  })
export class AppModule {}
