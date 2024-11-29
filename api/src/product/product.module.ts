import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SaleModule } from 'src/sale/sale.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [SaleModule],
})
export class ProductModule {}
