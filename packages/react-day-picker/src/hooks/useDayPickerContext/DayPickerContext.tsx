import * as React from 'react';

import english from 'date-fns/locale/en-US';

import { Day, Dropdown, Head, Row, WeekNumber } from '../../components';
import {
  Components,
  DayPickerProps,
  Formatters,
  Labels,
  ModifierClassNames,
  Styles
} from '../../types';
// import { defaultModifiers } from '../useModifiers/defaultModifiers';
import { defaultClassNames } from './defaultClassNames';
import * as formatters from './formatters';
import * as labels from './labels';
import { getWeekdays } from './utils/getWeekdays';
import { parseFromToProps } from './utils/parseFromToProps';

type RequiredPropName =
  | 'classNames'
  | 'modifierPrefix'
  | 'numberOfMonths'
  | 'captionLayout'
  | 'modifiers'
  | 'mode'
  | 'today'
  | 'locale';

type RequiredProp = Required<Pick<DayPickerProps, RequiredPropName>>;

export const DayPickerReactContext = React.createContext<
  DayPickerContext | undefined
>(undefined);

export type DayPickerContext = DayPickerProps &
  RequiredProp & {
    numberOfMonths: number;
    formatters: Required<Formatters>;
    labels: Required<Labels>;
    components: Required<Components>;
    modifierClassNames: Required<ModifierClassNames>;
    styles: Styles;
    weekdays: Date[];
  };

export const DayPickerProvider = ({
  initialProps,
  children
}: {
  initialProps: DayPickerProps;
  children: React.ReactNode;
}): JSX.Element => {
  const { fromDate, toDate } = parseFromToProps(initialProps);
  const locale = initialProps.locale || english;
  const numberOfMonths = initialProps.numberOfMonths ?? 1;
  const today = initialProps.today ?? new Date();
  const month = initialProps.month;
  const weekdays = getWeekdays(locale);

  let mode = initialProps.mode ?? 'single';
  if (initialProps.selected) mode = 'uncontrolled';

  let captionLayout = initialProps.captionLayout ?? 'buttons';
  if (!fromDate && !toDate) {
    captionLayout = 'buttons';
  }

  const modifiers = initialProps.modifiers || {};
  if (initialProps.selected) {
    modifiers.selected = initialProps.selected;
  }
  if (initialProps.hidden) {
    modifiers.hidden = initialProps.hidden;
  }
  modifiers.disabled = [];
  if (initialProps.disabled) {
    if (Array.isArray(initialProps.disabled)) {
      modifiers.disabled = [...initialProps.disabled];
    } else {
      modifiers.disabled = [initialProps.disabled];
    }
  }
  if (fromDate) modifiers.disabled.push({ before: fromDate });
  if (toDate) modifiers.disabled.push({ after: toDate });

  const context: DayPickerContext = {
    ...initialProps,
    modifierPrefix: 'rdp-day_',
    numberOfMonths,
    fromDate,
    toDate,
    captionLayout,
    mode,
    month,
    today,
    locale,
    weekdays,
    modifierClassNames: initialProps.modifierClassNames ?? {},
    styles: initialProps.styles ?? {},
    modifiers,
    classNames: {
      ...defaultClassNames,
      ...initialProps.classNames
    },
    formatters: {
      ...formatters,
      ...initialProps.formatters
    },
    labels: {
      ...labels,
      ...initialProps.labels
    },
    components: {
      Day: Day,
      Dropdown: Dropdown,
      Head: Head,
      Row: Row,
      WeekNumber: WeekNumber,
      ...initialProps.components
    }
  };

  return (
    <DayPickerReactContext.Provider value={context}>
      {children}
    </DayPickerReactContext.Provider>
  );
};
