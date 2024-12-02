import { format, sub } from "date-fns";
import { defineStore } from "pinia";
import { reactive } from "vue";

interface TimeframeState {
  start: string;
  end: string;
}

const useTimeframeStore = defineStore("timeframe", () => {
  const state = reactive<TimeframeState>({
    start: format(sub(new Date(), { days: 30 }), "yyyy-MM-dd"),
    end: format(new Date(), "yyyy-MM-dd"),
  });

  const setStart = (start: string) => {
    state.start = start;
  };

  const setEnd = (end: string) => {
    state.end = end;
  };
  return {
    state,
    setStart,
    setEnd,
  };
});

export default useTimeframeStore;
