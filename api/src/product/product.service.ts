import { Injectable } from '@nestjs/common';
import SaleRepository from 'src/sale/repository/sale.repository';
import ProductRepository from './repositories/product.repository';
import Product from './models/Product';

export interface ProductWithSales extends Product {
  salesCount: number;
}

@Injectable()
export class ProductService {
  // constructor(private readonly saleService: SaleService) {}
  async getProducts(): Promise<ProductWithSales[]> {
    // get sales grouped by product
    const sales = await SaleRepository.findAllGroupedByProductId();

    // get all products

    const products = await ProductRepository.findAll();

    // extract products with count of sales
    const productsWithSales = products.map((product) => {
      const productSales = sales[product.getId()];
      return {
        ...product,
        salesCount: productSales ? productSales.length : 0,
      };
    }) as ProductWithSales[];

    return productsWithSales;
  }
}
