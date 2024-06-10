import { format } from "date-fns";

export function resetTime(date: Date) {
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);
}

export function getFormattedDate(date: Date) {
  return format(date, "dd.MM.yyyy");
}

export function getFormattedTime(date: Date) {
  return format(date, "kk:mm:ss");
}
