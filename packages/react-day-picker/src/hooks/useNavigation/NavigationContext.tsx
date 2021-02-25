import * as React from 'react';

import { isSameMonth } from 'date-fns';

import { useDayPickerContext } from '../useDayPickerContext';
import { getDisplayMonths } from '../useDayPickerContext/utils/getDisplayMonths';

export type NavigationContextValue = {
  month: Date;
  displayMonths: Date[];
  setMonth: (month: Date) => void;
};

export const NavigationContext = React.createContext<
  NavigationContextValue | undefined
>(undefined);

export const NavigationProvider = ({
  children
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const context = useDayPickerContext();
  const [month, setMonthInternal] = React.useState<Date>(
    context.month || context.defaultMonth || context.today
  );

  const setMonth = (date: Date) => {
    if (context.disableNavigation) return;
    setMonthInternal(date);
  };

  React.useEffect(() => {
    if (!context.month) return;
    if (isSameMonth(context.month, month)) return;
    setMonth(context.month);
  }, [context.month]);

  const displayMonths = getDisplayMonths(month, context);
  return (
    <NavigationContext.Provider value={{ month, displayMonths, setMonth }}>
      {children}
    </NavigationContext.Provider>
  );
};
