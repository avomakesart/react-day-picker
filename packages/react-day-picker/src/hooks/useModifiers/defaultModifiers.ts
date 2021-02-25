// /*

// The default modifiers matchers assigned to every day. These values are passed to
// the `defaultModifiers` prop in DayPicker.tsx.

// */

// import { isSameDay, isSameMonth } from 'date-fns';

// import { DayPickerProps, ModifierMatchers } from '../../types';

// /** Determines if a day is outside the displayed month.  */
// function isOutside(day: Date, displayMonth?: Date): boolean {
//   if (!displayMonth) return false;
//   return !isSameMonth(day, displayMonth);
// }

// /** Determines if a day, when displayed in a month, is interactive.  */

// /** Determines if a day is "today". */
// function isToday(day: Date, _?: Date, props?: DayPickerProps): boolean {
//   if (!props) return false;
//   return isSameDay(day, props.today || new Date());
// }

// export const defaultModifiers: ModifierMatchers = {
//   outside: isOutside,
//   today: isToday
// };
