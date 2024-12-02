<template>
  <Card class="w-full h-full">
    <CardHeader>
      <CardTitle>Total Sales</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="totalSalesLoading">
        <Skeleton class="h-4 w-full rounded-md" />
      </div>
      <div v-else class="text-2xl font-semibold">
        {{ formatCurrency(totalSales.total) }}
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

import { useGetTotalSales } from "@/services/analytics.service";
import useTimeframeStore from "@/stores/timeframe.store";
import { toRef } from "vue";

const { state } = useTimeframeStore();

const startDate = toRef(state, "start");
const endDate = toRef(state, "end");
const {
  data: totalSales,
  isLoading: totalSalesLoading,
  //   isError: totalSalesError,
} = useGetTotalSales(startDate, endDate);
</script>
