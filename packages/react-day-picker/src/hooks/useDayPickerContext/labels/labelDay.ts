import { format } from 'date-fns';

export const labelDay = (day: Date, options?: { locale?: Locale }): string => {
  return format(day, 'PPPP', options);
};
