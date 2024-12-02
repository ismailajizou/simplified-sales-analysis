export interface ITotalSales {
  total: number;
}

export interface ITrendingProducts
  extends Array<{
    name: 1;
    quantity: 1;
    totalSales: 1;
  }> {}

export interface ICategorySales
  extends Array<{
    _id: string;
    count: number;
    percentage: number;
  }> {}
export interface IFindProductsWithSalesCount {
  data: {
    _id: number;
    name: string;
    category: string;
    price: number;
    totalSales: number;
  }[];
  pageNumber: number;
  next: boolean;
  previous: boolean;
  totalPages: number;
  totalResults: number;
}
