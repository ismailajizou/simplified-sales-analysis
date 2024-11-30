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

  async totalSales(startDate?: string, endDate?: string) {
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

  trendingProducts() {}

  categorySales() {}
}
