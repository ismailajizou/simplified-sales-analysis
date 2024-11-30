import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // document swagger
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Start date: defaults to today',
    format: 'yyyy-MM-dd',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'End date',
    format: 'yyyy-MM-dd',
  })
  @Get('total_sales')
  async totalSales(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.totalSales(startDate, endDate);
  }

  @Get('trending_products')
  async trendingProducts(@Query('numberOfProducts') numberOfProducts = 3) {
    return this.analyticsService.trendingProducts(+numberOfProducts);
  }

  @Get('category_sales')
  async categorySales() {
    return this.analyticsService.categorySales();
  }
}
