import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './models/Product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAllWithSalesCount() {
    return this.productModel.aggregate([
      {
        // join the sales collection with the products collection (add salesData field that contains the sales data)
        $lookup: {
          from: 'sales',
          localField: '_id',
          foreignField: 'product',
          as: 'salesData',
        },
      },
      {
        // add the total quantity sold and total sales for each product
        $addFields: {
          totalQuantitySold: { $sum: '$salesData.quantity' },
          totalSales: { $sum: '$salesData.totalAmount' },
        },
      },
      {
        // remove the salesData field
        $project: {
          name: 1,
          category: 1,
          price: 1,
          totalSales: 1,
        },
      },
    ]);
  }
}
