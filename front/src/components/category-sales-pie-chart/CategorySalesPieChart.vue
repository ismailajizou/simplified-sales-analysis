<template>
  <Card class="w-full h-full">
    <CardHeader>
      <CardTitle>Sales by Category</CardTitle>
    </CardHeader>
    <CardContent>
      <div
        v-if="salesByCategoryLoading"
        class="h-full flex items-center justify-center"
      >
        <Skeleton class="h-56 w-56 rounded-full" />
      </div>
      <!-- handle Error -->
      <div v-else-if="salesByCategoryError">
        <div class="flex items-center justify-center h-full">
          <X class="h-16 w-16 text-red-500" />
          <p class="text-red-500">Failed to load data</p>
        </div>
      </div>
      <DonutChart
        v-else
        :index="'name'"
        type="pie"
        class="w-full h-full"
        :category="'percentage'"
        :value-formatter="(v) => `${v.toFixed(2)}%`"
        :colors="['#FFC107', '#2196F3', '#4CAF50', '#FF5722', '#9C27B0']"
        :data="salesByCategory!.map((item) => ({
              _id: item._id,
              percentage: item.percentage,
              name: item._id,
            }))"
      />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetSalesByCategory } from "@/services/analytics.service";

import useTimeframeStore from "@/stores/timeframe.store";
import { X } from "lucide-vue-next";
import { DonutChart } from "../ui/chart-donut";
import { toRef } from "vue";


const {
  state
} = useTimeframeStore();

const startDate = toRef(state, "start");
const endDate = toRef(state, "end");

const {
  data: salesByCategory,
  isError: salesByCategoryError,
  isLoading: salesByCategoryLoading,
} = useGetSalesByCategory(startDate, endDate);
</script>
