import React from 'react';

import { DayPickerContext, DayPickerReactContext } from './DayPickerContext';

export function useDayPickerContext(): DayPickerContext {
  const context = React.useContext(DayPickerReactContext);
  return context as DayPickerContext;
}
