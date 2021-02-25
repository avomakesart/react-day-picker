import { format } from 'date-fns';

export const labelWeekday = (
  day: Date,
  options?: { locale?: Locale }
): string => {
  return format(day, 'ccc', options);
};
