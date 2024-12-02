<script setup lang="ts">
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { cn } from "@/lib/utils";
import useTimeframeStore from "@/stores/timeframe.store";
import {
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";

import { parseDate } from "@internationalized/date";
import { format } from "date-fns";
import { computed } from "vue";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const {
  state,
  setStart: setStartDate,
  setEnd: setEndDate,
} = useTimeframeStore();

const value = computed(() => ({
  start: parseDate(state.start),
  end: parseDate(state.end),
}));
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else> Pick a date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        :number-of-months="2"
        @update:model-value="({end, start}) => {
            setStartDate(format(start!.toDate(getLocalTimeZone()), 'yyyy-MM-dd'));
            setEndDate(format(end!.toDate(getLocalTimeZone()), 'yyyy-MM-dd'));
        }"
        :max-value="today(getLocalTimeZone())"
        initial-focus
      />
    </PopoverContent>
  </Popover>
</template>
