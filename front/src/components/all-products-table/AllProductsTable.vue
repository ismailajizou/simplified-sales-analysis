<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>All Products</CardTitle>
    </CardHeader>
    <CardContent>
      <Table class="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total Sales</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="allProductsLoading">
            <TableRow v-for="i in 10" :key="i">
              <TableCell v-for="j in 5" :key="j">
                <Skeleton class="h-4 w-full rounded-md" />
              </TableCell>
            </TableRow>
          </template>
          <!-- handle Error -->
          <template v-else-if="allProductsError">
            <div class="flex items-center justify-center h-full">
              <X class="h-16 w-16 text-red-500" />
              <p class="text-red-500">Failed to load data</p>
            </div>
          </template>
          <template v-else>
            <TableRow v-for="product in allProducts!.data" :key="product._id">
              <TableCell>{{ product.name }}</TableCell>
              <TableCell>{{ product.category }}</TableCell>
              <TableCell>{{ formatCurrency(product.price) }}</TableCell>
              <TableCell>{{ formatCurrency(product.totalSales) }}</TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
      <template v-if="allProducts">
        <Pagination
          v-model:page="page"
          :total="allProducts.totalResults"
          :sibling-count="2"
          show-edges
          :default-page="1"
        >
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  class="w-10 h-10 p-0"
                  :variant="item.value === page ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
          </PaginationList>
        </Pagination>
      </template>
    </CardContent>
  </Card>
</template>
<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { useGetProductsWithSales } from "@/services/analytics.service";
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { X } from "lucide-vue-next";
import { Button } from "../ui/button";
const page = ref(1);
const limit = ref(10);

const {
  data: allProducts,
  isError: allProductsError,
  isLoading: allProductsLoading,
} = useGetProductsWithSales(page, limit);
</script>
