import { Injectable } from '@nestjs/common';
import SaleRepository from './repository/sale.repository';

@Injectable()
export class SaleService {
  async getSales() {
    return SaleRepository.findAll();
  }
}
