import { Controller, Get } from '@nestjs/common';
import { SaleService } from './sale.service';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  async getSales() {
    return this.saleService.getSales();
  }
}
