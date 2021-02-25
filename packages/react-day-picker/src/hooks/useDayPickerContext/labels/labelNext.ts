import { format } from 'date-fns';

export const labelNext = (
  month: Date,
  options?: { locale?: Locale }
): string => {
  return `Go to next month: ${format(month, 'LLLL Y', options)}`;
};
