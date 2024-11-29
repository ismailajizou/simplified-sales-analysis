import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/Product';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SalesModule } from 'src/sales/sales.module';
import { Sale, SaleSchema } from 'src/sales/models/Sale';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
