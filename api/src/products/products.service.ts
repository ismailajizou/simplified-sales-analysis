import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/Product';
import { Model } from 'mongoose';
import { Sale } from 'src/sales/models/Sale';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
  ) {}

  async findAllWithSalesCount() {
    // get products with count of sales
    const products = await this.productModel.find();
    const sales = await this.saleModel.find();

    const productsWithSalesCount = products.map((product) => {
      const salesCount = sales.filter(
        (sale) => sale.product === product._id,
      ).length;
      return { ...product.toObject(), salesCount };
    });
    return productsWithSalesCount;
  }
}
