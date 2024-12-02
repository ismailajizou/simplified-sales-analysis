<template>
  <div class="container mx-auto p-6">
    <div class="mb-6 flex justify-between">
      <h1 class="text-2xl font-bold">E-Commerce Analytics Dashboard</h1>

      <!-- Time Period Filters -->
      <div class="flex gap-2">
        <template v-if="selectedPeriod === 'custom'">
          <DateRangePicker />
        </template>
        <Select v-model="selectedPeriod">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="(label, value) in timeframes"
              :key="value"
              :value="value"
            >
              {{ label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <main class="grid grid-cols-2 grid-rows-5 gap-6">
      <TotalSalesCard />

      <div class="row-span-2">
        <TrendingProductsTable :number-of-top-products="numberOfTopProducts" />
      </div>
      <div class="row-span-4">
        <AllProductsTable />
      </div>
      <div class="row-span-3">
        <CategorySalesPieChart />
      </div>
    </main>
  </div>

  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { format, sub } from "date-fns";
import { ref, watch } from "vue";
import AllProductsTable from "./components/all-products-table/AllProductsTable.vue";
import CategorySalesPieChart from "./components/category-sales-pie-chart/CategorySalesPieChart.vue";
import TotalSalesCard from "./components/total-sales-card/TotalSalesCard.vue";
import TrendingProductsTable from "./components/trending-products-table/TrendingProductsTable.vue";
import DateRangePicker from "./components/ui/date-range-picker/DateRangePicker.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import useTimeframeStore from "./stores/timeframe.store";

const timeframes = {
  "7days": "Last 7 Days",
  "30days": "Last 30 Days",
  "12months": "Last 12 Months",
  custom: "Custom Range",
};

type Timeframe = keyof typeof timeframes;
// Reactive State
const selectedPeriod = ref<Timeframe>("30days");
const formatDate = (date: string) => format(date, "yyyy-MM-dd");

const { state: range, setStart, setEnd } = useTimeframeStore();


const numberOfTopProducts = ref(3);
watch(selectedPeriod, (value) => {
  if (value === "7days") {
    setStart(formatDate(sub(new Date(), { days: 7 }).toString()));
  } else if (value === "30days") {
    setStart(formatDate(sub(new Date(), { days: 30 }).toString()));
  } else if (value === "12months") {
    setStart(formatDate(sub(new Date(), { months: 12 }).toString()));
  }
  setEnd(formatDate(new Date().toISOString()));
});

watch(range, (value) => {
  console.log(value);
});
</script>
