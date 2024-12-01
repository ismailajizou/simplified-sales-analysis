import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from 'src/sales/models/Sale';
import { Product, ProductSchema } from './models/Product';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    // Add ProductsService to the providers array
    ProductsService,
  ],
})
export class ProductsModule {}
