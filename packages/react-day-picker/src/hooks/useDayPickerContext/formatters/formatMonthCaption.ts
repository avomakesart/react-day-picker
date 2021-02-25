import { format, Locale } from 'date-fns';

export function formatMonthCaption(
  month: Date,
  options?: { locale?: Locale }
): string {
  return format(month, 'LLLL', options);
}
