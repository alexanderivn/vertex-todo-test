import { computed } from "vue";
import moment from "moment/moment";

export function formatDate(date: string | number | Date) {
  return moment(date).format('DD-MMM-YYYY');
}

export const currentDate = computed(() => moment().format('YYYY-MM-DD'));