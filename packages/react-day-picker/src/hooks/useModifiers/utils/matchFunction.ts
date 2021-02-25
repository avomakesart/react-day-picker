import { DayPickerProps, Matcher } from '../../../types';

export function matchFunction(
  day: Date,
  matcher: Matcher,
  displayMonth?: Date,
  props?: DayPickerProps
): boolean {
  if (!(matcher instanceof Function)) return false;
  return matcher(day, displayMonth, props);
}
