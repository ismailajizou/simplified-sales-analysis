import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of products per page',
  })
  @Get()
  async findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.productsService.findAllWithSalesCount(
      parseInt(page, 10),
      parseInt(limit, 10),
    );
  }
}
