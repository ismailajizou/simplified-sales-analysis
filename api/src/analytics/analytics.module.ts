import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from 'src/products/models/Product';
import { Sale, SaleSchema } from 'src/sales/models/Sale';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: SaleSchema }]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
