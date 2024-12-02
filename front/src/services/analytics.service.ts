import { useQuery } from "@tanstack/vue-query";
import * as api from "@/api/analytics.api";
import { Ref } from "vue";

export function useGetProductsWithSales(page: Ref<number>, limit: Ref<number>) {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => api.getProductsWithSales(page.value, limit.value),
  });
}

export function useGetSalesByCategory(
  startDate: Ref<string>,
  endDate: Ref<string>
) {
  return useQuery({
    queryKey: ["category_sales", startDate, endDate],
    queryFn: () => api.getSalesByCategory(startDate.value, endDate.value),
  });
}

export function useGetTotalSales(startDate: Ref<string>, endDate: Ref<string>) {
  return useQuery({
    queryKey: ["total_sales", startDate, endDate],
    queryFn: () => api.getTotalSales(startDate.value, endDate.value),
  });
}

export function useGetTrendingProducts(
  numberOfProducts: Ref<number>,
  startDate: Ref<string>,
  endDate: Ref<string>
) {
  return useQuery({
    queryKey: ["trending_products", numberOfProducts, startDate, endDate],
    queryFn: () =>
      api.getTrendingProducts(numberOfProducts.value, startDate.value, endDate.value),
  });
}
