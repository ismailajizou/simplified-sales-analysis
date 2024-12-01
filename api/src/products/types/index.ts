export interface IFindProductsWithSalesCount {
  data: {
    name: string;
    category: string;
    price: number;
    totalSales: number;
  }[];
  pageNumber: number;
  next: boolean;
  previous: boolean;
}
