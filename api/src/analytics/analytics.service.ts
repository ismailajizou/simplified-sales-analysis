import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { Model } from 'mongoose';
import { Product } from 'src/products/models/Product';
import { Sale } from 'src/sales/models/Sale';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
  ) {}

  /**
   * Get the total sales for a given date range
   * @param startDate - start date
   * @param endDate - end date
   * @returns total sales
   */
  async totalSales(
    startDate?: string,
    endDate?: string,
  ): Promise<{ total: number }> {
    const res = await this.saleModel.aggregate([
      {
        // filter by date
        $match: {
          date: {
            // if no end date is provided, grab everyting before start date
            $gte: endDate ? endDate : format(new Date(0), 'yyyy-MM-dd'),
            // if no start date is provided, use today
            $lte: startDate ? startDate : format(new Date(), 'yyyy-MM-dd'),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$totalAmount' },
        },
      },
    ]);
    return {
      total: res[0]?.totalAmount || 0,
    };
  }

  /**
   * Return top X selling products by the sales quantity
   * @param numberOfProducts - number of products to return
   * @returns top selling products
   */
  async trendingProducts(numberOfProducts: number) {
    const res = await this.productModel.aggregate([
      {
        $lookup: {
          from: 'sales',
          localField: '_id',
          foreignField: 'product',
          as: 'sales',
        },
      },
      // calculate total sales
      {
        // add the total quantity sold and total sales for each product
        $addFields: {
          totalSales: {
            // = sum(sales.quantity * product.price)
            $sum: {
              $map: {
                input: '$sales',
                as: 'sale',
                in: { $multiply: ['$$sale.quantity', '$price'] },
              },
            },
          },
          quantity: {
            $sum: '$sales.quantity',
          },
        },
      },
      {
        // sort by total sales
        $sort: { quantity: -1 },
      },
      {
        // limit to the top X products
        $limit: numberOfProducts,
      },
      {
        // project only the fields we want
        $project: {
          name: 1,
          // get quantity from sales
          quantity: 1,
          totalSales: 1,
        },
      },
    ]);
    return res;
  }

  categorySales() {}
}
