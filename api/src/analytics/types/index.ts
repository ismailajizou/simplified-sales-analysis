export interface ITotalSalesReturn {
  total: number;
}

export interface ITrendingProductsReturn
  extends Array<{
    name: 1;
    quantity: 1;
    totalSales: 1;
  }> {}

export interface ICategorySalesReturn
  extends Array<{
    _id: string;
    count: number;
    percentage: number;
  }> {}
