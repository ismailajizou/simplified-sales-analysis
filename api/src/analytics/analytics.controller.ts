import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiQuery } from '@nestjs/swagger';
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

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

  @ApiQuery({
    name: 'numberOfProducts',
    required: false,
    description: 'Number of products to return',
  })
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
  @Get('trending_products')
  async trendingProducts(
    @Query('numberOfProducts') numberOfProducts = 3,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.trendingProducts(
      numberOfProducts,
      startDate,
      endDate,
    );
  }

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
  @Get('category_sales')
  async categorySales(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.categorySales(startDate, endDate);
  }
}
