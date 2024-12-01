import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './models/Product';
import { IFindProductsWithSalesCount } from './types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  /**
   * Find all products with the total sales count
   * @param page - Page number
   * @param limit - Number of products per page
   * @returns Products with the total sales count
   */
  async findAllWithSalesCount(
    page: number,
    limit: number,
  ): Promise<IFindProductsWithSalesCount> {
    const data = await this.productModel.aggregate([
      {
        // skip and limit
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit + 1,
      },
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

    return {
      data: data.slice(0, limit),
      pageNumber: page,
      next: data.length > limit,
      previous: page > 1,
    };
  }
}
