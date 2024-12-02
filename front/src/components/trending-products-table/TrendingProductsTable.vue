<template>
  <Card class="w-full h-full">
    <CardHeader>
      <CardTitle>Top 3 Selling Products</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity Sold</TableHead>
            <TableHead>Total Sales</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="topProductsLoading">
            <TableRow v-for="i in 3" :key="i">
              <TableCell v-for="j in 3" :key="j">
                <Skeleton class="h-4 w-full rounded-md" />
              </TableCell>
            </TableRow>
          </template>
          <!-- handle Error -->
          <template v-else-if="topProductsError">
            <div class="flex items-center justify-center h-full">
              <X class="h-16 w-16 text-red-500" />
              <p class="text-red-500">Failed to load data</p>
            </div>
          </template>

          <template v-else>
            <TableRow v-for="product in topProducts" :key="product.name">
              <TableCell>{{ product.name }}</TableCell>
              <TableCell>{{ product.quantity }}</TableCell>
              <TableCell>{{ formatCurrency(product.totalSales) }}</TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { useGetTrendingProducts } from "@/services/analytics.service";
import useTimeframeStore from "@/stores/timeframe.store";
import { X } from "lucide-vue-next";
import { computed, toRef } from "vue";

interface Props {
  numberOfTopProducts: number;
}

const props = defineProps<Props>();

const { state } = useTimeframeStore();

const startDate = toRef(state, "start");
const endDate = toRef(state, "end");

const numberOfTopProducts = toRef(props, "numberOfTopProducts");

const {
  data: topProducts,
  isError: topProductsError,
  isLoading: topProductsLoading,
} = useGetTrendingProducts(numberOfTopProducts, startDate, endDate);
</script>
