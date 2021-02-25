import { format } from 'date-fns';

export const labelPrev = (
  month: Date,
  options?: { locale?: Locale }
): string => {
  return `Go to previous month: ${format(month, 'LLLL Y', options)}`;
};
