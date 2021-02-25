import { addMonths, differenceInMonths, startOfMonth } from 'date-fns';

type Options = {
  toDate?: Date;
  fromDate?: Date;
  numberOfMonths: number;
  reverseMonths?: boolean;
};

export function getDisplayMonths(
  currentMonth: Date,
  { toDate, fromDate, reverseMonths, numberOfMonths }: Options
): Date[] {
  const start = startOfMonth(currentMonth);
  const end = startOfMonth(addMonths(start, numberOfMonths));
  const monthsDiff = differenceInMonths(end, start);

  let months = [];
  for (let i = 0; i < monthsDiff; i++) {
    const nextMonth = addMonths(start, i);
    if (toDate && nextMonth > startOfMonth(toDate)) continue;
    if (fromDate && nextMonth < startOfMonth(fromDate)) continue;
    months.push(nextMonth);
  }

  if (reverseMonths) months = months.reverse();

  return months;
}
