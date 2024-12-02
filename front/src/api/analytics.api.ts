import http from "@/lib/http";
import {
  ICategorySales,
  IFindProductsWithSalesCount,
  ITrendingProducts,
} from "@/types/analytics.types";

export const getProductsWithSales = async (page: number, limit: number) => {
  return (
    await http.get<IFindProductsWithSalesCount>(
      `/products?page=${page}&limit=${limit}`
    )
  ).data;
};

export const getSalesByCategory = async (
  startDate: string,
  endDate: string
) => {
  return (
    await http.get<ICategorySales>(
      `/analytics/category_sales?startDate=${startDate}&endDate=${endDate}`
    )
  ).data;
};

export const getTrendingProducts = async (
  numberOfProducts: number,
  startDate: string,
  endDate: string
) => {
  return (
    await http.get<ITrendingProducts>(
      `/analytics/trending_products?numberOfProducts=${numberOfProducts}&startDate=${startDate}&endDate=${endDate}`
    )
  ).data;
};

export const getTotalSales = async (startDate: string, endDate: string) => {
  return (
    await http.get(
      `/analytics/total_sales?startDate=${startDate}&endDate=${endDate}`
    )
  ).data;
};
